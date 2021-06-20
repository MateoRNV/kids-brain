<template>
  <div class="create-question">
    <v-form
      ref="form1"
      v-if="screen == 1"
      class="d-flex flex-column align-center"
    >
      <v-text-field
        v-model="title"
        label="2.type your Question Title"
        :class="['text-input', !form1Valid && !title && 'error-border']"
      ></v-text-field>
      <v-select
        v-model="questionType"
        :items="['Text Question', 'Image Question']"
        label="3.select your question format"
        :class="['text-input', !form1Valid && !questionType && 'error-border']"
        :item-text="(item) => item.type"
        :item-value="(item) => item.id"
      ></v-select>
      <div
        :class="['text-input', 'pb-2', !isValidFillIntBlank && 'error-border']"
      >
        <div>
          <label class="d-flex justify-space-between"
            >4.PUT YOUR FILL IN THE BLANKS QUESTION HERE
            <div
              class="blank-add-remove-btn align-center d-flex ml-auto mr-4"
              @mousedown="addBlank()"
            >
              <span class="mr-1"> ADD BLANK </span>
              <span class="">
                <v-icon class="blue--text">mdi-plus-circle</v-icon>
              </span>
            </div>
            <div
              class="blank-add-remove-btn align-center d-flex"
              @mousedown="removeBlank"
            >
              <span class="mr-1"> REMOVE BLANK </span>
              <span class="">
                <v-icon class="blue--text">mdi-close-circle</v-icon>
              </span>
            </div>
          </label>
        </div>
        <div>
          <div
            class="que-container d-flex"
            v-for="(que, index) in fillInTheBlankList"
            :key="index"
          >
            <span>{{ index + 1 }}. </span>
            <div
              v-for="(wordData, wordIndex) in que.data"
              :key="'word' + wordIndex"
            >
              <!-- v-if="que.type == 'word' && que.value !== ' .'" -->
              <input
                v-if="wordData.type == 'word' && wordData.value != ' '"
                v-model="wordData.value"
                contenteditable="true"
                class="fill-in-the-blank-question"
              />
              <div
                contenteditable="false"
                v-if="wordData.type == 'blank'"
                class="empty-blank-line"
                type="text"
              />
            </div>
            <div>
              <span
                v-if="index == fillInTheBlankList.length - 1"
                @click="addQuestion(index)"
              >
                <v-icon class="blue--text">mdi-plus-circle</v-icon>
              </span>
              <span class="" @click="removeQuestion(index)" v-else>
                <v-icon class="blue--text">mdi-close-circle</v-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="questionType == 'Image Question'"
        :class="[
          'text-input',
          'file-upload',
          !form1Valid && !this.questionImage && 'error-border',
        ]"
      >
        5.UPLOAD YOUR QUESTION IMAGE*
        <ImageDropBox
          key="questionImage"
          showIcon="true"
          label="Upload image here"
          :deleteEnable="true"
          :callback="(file) => (this.questionImage = file)"
        />
        <v-text-field
          label="ADD EXPLANATION TEXT"
          class="mt-4"
          regular
          dense
        ></v-text-field>
      </div>
    </v-form>
    <v-form ref="form2" v-else>
      <div :class="['label', !isValidFillIntBlank && 'error-border']">
        <div class="d-flex mb-5">
          {{ "5. ADD ANSWERS TO YOUR QUESTION" }}
        </div>
        <div
          class="que-container d-flex"
          v-for="(que, index) in fillInTheBlankList"
          :key="index"
        >
          <span>{{ index + 1 }}. </span>
          <div class="flex-grow-1 d-flex">
            <div
              v-for="(wordData, wordIndex) in que.data"
              :key="'word' + wordIndex"
            >
              <span v-if="wordData.type == 'word'">
                {{ wordData.value }}
              </span>
              <input
                v-if="wordData.type == 'blank'"
                class="empty-blank-line"
                type="text"
                v-model="wordData.ans"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        :class="['label', !form2Valid && !ansExplanationText && 'error-border']"
      >
        6. ADD EXPLANATION TEXT*
        <v-text-field class="mt-3" v-model="ansExplanationText"></v-text-field>
        ADD EXPLANATION IMAGE
        <ImageDropBox
          key="explanationImage"
          showIcon="true"
          label="Upload image here"
          :deleteEnable="true"
          :callback="(file) => (this.ansExplanationImage = file)"
        />
      </div>
      <div :class="['label', !form2Valid && !points && 'error-border']">
        7. ADD POINTS TO THE QUESTION*
      </div>
      <v-text-field class="mt-3 pl-2" v-model="points"></v-text-field>
    </v-form>
    <div class="btns">
      <v-btn v-if="screen !== 2" @click="goToPrev">
        <v-icon>mdi-chevron-left-circle-outline</v-icon>
        &nbsp;PREVIOUS
      </v-btn>
      <v-btn v-if="screen == 2" @click="() => goToNext('Draft')">
        <v-icon>mdi-chevron-left-circle-outline</v-icon>
        &nbsp;Cancel
      </v-btn>
      <v-btn @click="() => goToNext('Scheduled')" class="primary">
        {{ screen == 2 ? "SAVE" : "NEXT" }}&nbsp;
        <v-icon>mdi-chevron-right-circle-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "createFillInTheBlankQuestion",
  props: ["onSubmit", "setData", "questionData", "subjects"],
  async mounted() {
    if (this.setData && this.questionData && this.questionData.id) {
      this.id = this.questionData.id;
      this.setTitle = this.questionData.title;
      this.setId = this.setData.setId;
      this.title = this.questionData.title;
      this.selectedSubject = this.subjects.find(
        (x) => x.id == this.questionData.subject_id
      );
      this.selectedTag = this.questionData.tags.split(", ");
      this.selectedLevel = {
        value: this.questionData.level,
        text: this.questionData.level,
      };
      this.points = this.questionData.points;
      this.discription = this.questionData.specification.discription;
      this.questionType = this.questionData.specification.questionType;
      this.fillInTheBlankList =
        this.questionData.specification.fillInTheBlankList;
      this.ansExplanationText =
        this.questionData.specification.ansExplanationText;
      this.ansExplanationImage =
        this.questionData.specification.ansExplanationImage;
      this.is_active = this.questionData.is_active;
      this.subscriber_only = this.questionData.subscriber_only;
    } else {
      this.$router.replace("/admin/create-question-set");
    }
  },
  data() {
    return {
      form1Valid: true,
      form2Valid: true,
      isValidFillIntBlank: true,
      screen: 1,
      title: null,
      explanationText: null,
      ansExplanationImage: null,
      questionType: null,
      questionImage: null,
      dragging: false,
      setId: null,
      setTitle: null,
      fillInTheBlankList: [{}],
    };
  },
  methods: {
    addQuestion(index) {
      this.fillInTheBlankList.push({id: index+1, data: [{ type: "word", value: "Example" }]});
     },
    removeQuestion(index) {
      this.fillInTheBlankList.splice(index, 1);
    },
    addBlank(event) {
      var caretPos = 0,
        sel,
        range;
      //this.fillInTheBlankList.push({id: index+1, data: [{ type: "blank", ans: " " }]}); 
      if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          if (
            range.commonAncestorContainer.parentNode.className.indexOf(
              "fill-in-the-blank-question"
            ) > -1
          ) {
            range.insertNode(document.createTextNode(" ."));
            var tempEl = document.createElement("span");
            tempEl.className = "empty-blank-line";
            range.insertNode(tempEl);
          }
        }
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (
          range.commonAncestorContainer.parentNode.className.indexOf(
            "fill-in-the-blank-question"
          ) > -1
        ) {
          var tempEl = document.createElement("span");
          range.insertNode(document.createTextNode(" ."));
          tempEl.className = "empty-blank-line";
          range.insertNode(tempEl);
        }
      }
    },
    removeBlank(event) {
      var sel, range;
      if (window.getSelection) {
        sel = window.getSelection();

        if (sel.rangeCount) {
          range = sel.getRangeAt(0);
          var allEle =
            range.commonAncestorContainer.parentNode.querySelectorAll(
              ".empty-blank-line"
            );
          allEle.forEach(function (el) {
            el.remove();
          });
        }
      } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        var allEle =
          range.commonAncestorContainer.parentNode.querySelectorAll(
            ".empty-blank-line"
          );
        allEle.forEach(function (el) {
          el.remove();
        });
      }
    },
    validate(form) {
      let values = [];
      switch (form) {
        case "form1":
          this.form1Valid = false;
          values = ["title", "questionType"];
          if (this.questionType == "Image Question") {
            values = ["questionImage"];
          }
          this.isValidFillIntBlank = true;
          if (this.fillInTheBlankList.length == 0) {
            this.isValidFillIntBlank = false;
          }
          this.fillInTheBlankList.forEach((que) => {
            if (!que.data.find((node) => node.type == "blank")) {
              this.isValidFillIntBlank = false;
            }
          });
          break;
        case "form2":
          this.form1Valid = false;
          values = ["explanationText", "points"];
          this.isValidFillIntBlank = true;
          if (this.fillInTheBlankList.length == 0) {
          //  this.isValidFillIntBlank = false;
          }
          this.fillInTheBlankList.forEach((que) => {
            if (que.data.find((node) => node.type == "blank" && !node.ans)) {
            //  this.isValidFillIntBlank = false;
            }
          });
          break;
        default:
          break;
      }
      return !this.checkDirty(values);
    },
    checkDirty(list) {
      return list.find((x) => {
        if (typeof this[x] == "object") {
          return !this[x] || Object.keys(this[x]).length < 1;
        } else {
          return !this[x];
        }
      });
    },
    fillInTheBlankListToJson() {
      var eleList = document.querySelectorAll(".fill-in-the-blank-question");
      var queList = [];
      eleList.forEach(function (el, index) {
        var innerStringList = [];
        el.childNodes.forEach(function (node) {
          if (node.nodeName == "SPAN") {
            innerStringList.push({ type: "blank" });
          } else if (node.textContent) {
            innerStringList.push({ type: "word", value: node.textContent });
          }
        });
        queList.push({
          id: index,
          data: innerStringList,
        });
      });
      this.fillInTheBlankList = JSON.parse(JSON.stringify(queList));
      this.jsonToFillInTheBlankList();
    },
    jsonToFillInTheBlankList() {
      this.fillInTheBlankList.forEach(function (queData) {
        if (queData.data) {
          queData.htmlContent = queData.data
            .map(function (node) {
              if (node.type == "blank") {
                return '<span class="empty-blank-line"></span>';
              } else if (node.type == "word") {
                return node.value;
              }
              return "";
            })
            .join("");
        }
      });
    },
    async goToNext(type = null) {
      if (this.screen == 1) {
        //this.fillInTheBlankListToJson();
      }
      this[`form${this.screen}Valid`] = this.validate(`form${this.screen}`);
      if (!this[`form${this.screen}Valid`]) {
      //  return;
      }
      if (this.isValidFillIntBlank == false) {
        return;
      }
      if (this.screen == 2) {
        if (this.ansExplanationImage) {
          this.ansExplanationImage = await this.uploadToServer(
            this.ansExplanationImage
          );
        }
        return this.submit(type);
      }
      if (
        this.screen == 1 &&
        this.questionType == "Image Question" &&
        this.questionImage
      ) {
        this.questionImage = await this.uploadToServer(this.questionImage);
      }

      this.screen += 1;
    },
    goToPrev() {
      if (this.screen == 1) {
        return;
      }
      this.screen -= 1;
    },
    async submit(type) {
      let data = {
        title: this.title,
        subject_id: this.selectedSubject.id,
        tags: Object.keys(this.selectedTag).join(", "),
        level: this.selectedLevel.value,
        status: type,
        type_id: 7, //7 to Fill in the blank Question
        points: this.points,
        set_id: this.setId,
        is_active: this.is_active,
        subscriber_only: this.subscriber_only,
        specification: JSON.stringify({
          discription: this.discription,
          questionType: this.questionType,
          fillInTheBlankList: this.fillInTheBlankList,
          ansExplanationText: this.explanationText,
          ansExplanationImage: this.ansExplanationImage,
        }),
      };
      let rsp = await this.$api.questions.update(this.id, data);
      if (rsp && rsp.id) {
        this.onSubmit(rsp);
      }
    },
    async uploadToServer(file) {
      const formData = new FormData();
      formData.append("attachment", file, "MyFileName");
      const upload = await this.$api.uploads.create(formData);
      const { url, id, filename } = upload;
      return { url, id, filename };
    },
  },
  created() {
    this.jsonToFillInTheBlankList();
  },
};
</script>

<style lang="scss">
.w-auto {
  width: auto;
}
.label {
  background: #ffffff;
  border: 1px solid #9f9f9f;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  color: #9f9f9f;
  width: 100%;
}

.fill-in-the-blank-question {
  flex-grow: 1;
}
.que-container {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #9f9f9f;
}
input.empty-blank-line {
  width: 100px;
  display: inline-block;
  border: none;
  border-bottom: dashed rgb(58, 58, 58) 1px;
  &:focus {
    outline: none;
    border: none;
    border-bottom: dashed rgb(58, 58, 58) 1px;
  }
}
.empty-blank-line::after {
  content: " ";
  width: 100px;
  border: none;
  display: inline-block;
  border-bottom: dashed rgb(58, 58, 58) 1px;
  margin: 0 10px;
}
.blank-add-remove-btn {
  font-size: 12px;
  letter-spacing: 0;
  cursor: pointer;
}
.create-question {
  letter-spacing: 2.4px;
  max-width: 80%;
  margin: auto;
  .text-input,
  .multi-select {
    background: #ffffff;
    border: 1px solid #9f9f9f;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    line-height: 50px;
    padding: 0 15px;
    margin: 5px auto;
    &::placeholder {
      text-transform: uppercase;
      color: #616161;
      opacity: 0.7;
    }
    .v-input__control {
      margin-top: 15px;
      margin-bottom: -15px;
    }
    .v-input__slot {
      &:before {
        display: none;
      }
    }
  }
  .text-input {
    label {
      text-transform: uppercase;
      color: #616161;
      opacity: 0.7;
    }
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .error-border {
    border: 1px solid red;
  }
}
</style>