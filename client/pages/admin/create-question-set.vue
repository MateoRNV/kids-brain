<template>
  <div class="create-question-set">
    <v-btn
      :disabled="total >= 100"
      class="cloneQuestionSet primary--text"
      @click="openCloneQuestion"
    >
      Clone question set&nbsp; <v-icon add-circle>mdi-content-copy</v-icon>
    </v-btn>
    <v-form
      ref="form1"
      v-if="screen == 1"
      class="d-flex form1 flex-column align-center"
    >
      <div class="form1-row">
        <v-text-field
          v-model="title"
          placeholder="1. set title"
          :class="['text-input', !form1Valid && !title && 'error-border']"
        ></v-text-field>
      </div>
      <div class="form1-row">
        <div
          :class="[
            'multi-select',
            !form1Valid && !selectedSubject.id && 'error-border',
          ]"
        >
          <label
            class="label"
            v-if="!selectedSubject || !selectedSubject.id"
            for="multi-select"
            >2.Select the Category of your Question Set:
          </label>
          <label
            class="label"
            v-if="selectedSubject && selectedSubject.id"
            for="multi-select"
            >{{ selectedSubject.name }}</label
          >
          <ul class="select">
            <li
              v-for="(subject, idx) in subjects"
              :style="
                selectedSubject.id == subject.id
                  ? 'background:rgb(109 157 254 / 21%)'
                  : null
              "
              @click="() => handleMultiSelect('subject', subject)"
              :key="idx"
              :value="subject.id"
            >
              {{ subject.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="form1-row">
        <v-select
          v-model="selectedLevel"
          :items="levelOptions"
          flat
          :class="[!form1Valid && !selectedLevel && 'error-class']"
          full-width
          placeholder="3. Level:"
          return-object
        ></v-select>
      </div>
      <div class="form1-row">
        <v-select
          v-model="selectedTags"
          :items="tags"
          flat
          :class="[
            !form1Valid && selectedTags.length < 1 && 'error-class',
            'tag-selector',
          ]"
          full-width
          placeholder="4. tags: "
          multiple
        ></v-select>
        <span class="add-more" @click="() => (this.showTagCreator = 'true')">
          <v-icon class="white--text">mdi-plus</v-icon>
        </span>
      </div>
      <div class="form1-row">
        <v-text-field
          disabled
          label="5. max points for the set: 100"
          :class="['text-input disabled']"
        ></v-text-field>
      </div>
      <div class="btns">
        <v-btn @click="() => goToPrev(2)">
          <v-icon>mdi-chevron-left-circle-outline</v-icon>
          &nbsp;cancel
        </v-btn>
        <v-btn @click="upsertQuestionSet" class="primary">
          {{ this.edit ? "save" : "create set" }}&nbsp;
          <v-icon>mdi-chevron-right-circle-outline</v-icon>
        </v-btn>
      </div>
    </v-form>
    <v-form
      ref="form2"
      v-if="screen == 2"
      class="d-flex flex-column align-center screen-2"
    >
      <div class="header-label d-flex align-center">
        <div :class="['labels disabled']">
          <span>set title:</span>&nbsp;<span>{{ title }}</span>
        </div>
        <div class="d-flex align-center">
          <div :class="['labels d-flex align-center']">
            <span class="primary edit-set edit-icon" @click="() => goToPrev(1)">
              <img src="~/assets/images/edit-icon.svg" alt="" />
            </span>
            <span>&nbsp;&nbsp;Edit&nbsp;</span>
          </div>
          <div :class="['labels disabled']">
            <span
              >Level:
              {{
                selectedLevel && selectedLevel.text ? selectedLevel.text : null
              }}</span
            >
          </div>
          &nbsp;&nbsp;
          <div :class="['labels primary']">
            <span>Category: {{ selectedSubject.name }}</span>
          </div>
        </div>
      </div>
      <div class="question-container d-flex flex-column">
        <v-card
          flat
          :class="[idx >= 1 && 'mt-2', 'question-card']"
          tile
          v-for="(question, idx) in selectedQuestions"
          :key="question.id"
        >
          <div v-if="question.type_id == 2" :class="['text-input ans-section']">
            <div class="question-title d-flex align-center">
              <label class="ans-label" for="multi-select"
                >{{ idx + 1 }}&nbsp;{{ question.title }}</label
              >
              <small class="ans-label question-type" for="multi-select">{{
                questionTypes[question.type_id].type
              }}</small>
              <div class="actionable d-flex justify-space-between">
                <span
                  class="primary edit-icon"
                  @click="() => editQuestion(question)"
                >
                  <img src="~/assets/images/edit-icon.svg" alt="" />
                </span>
                <v-icon
                  @click="() => handleDelete(question)"
                  class="delete-icon"
                  >mdi-trash-can-outline</v-icon
                >
              </div>
            </div>
            <ul
              v-if="question.specification.ansType == 'Text Answer'"
              class="text-type-ans-set"
            >
              <li
                v-for="(ansKey, idx) in Object.keys(
                  question.specification.answerSet
                )"
                :key="idx"
              >
                <input
                  class="text-ans-input"
                  disabled
                  v-model="question.specification.answerSet[ansKey]"
                />
              </li>
            </ul>
            <ul
              v-if="question.specification.ansType == 'Image Answer'"
              class="image-type-ans-set"
            >
              <li
                v-for="ansKey in Object.keys(question.specification.answerSet)"
                :key="ansKey"
              >
                <div class="img-box">
                  <img :src="question.specification.answerSet[ansKey].url" />
                </div>
              </li>
            </ul>
            <span class="points">Total Points:&nbsp;{{ question.points }}</span>
          </div>
          <div v-if="question.type_id == 3" :class="['text-input ans-section']">
            <div class="question-title d-flex align-center">
              <label class="ans-label" for="multi-select"
                >{{ idx + 1 }}&nbsp;{{ question.title }}</label
              >
              <small class="ans-label question-type" for="multi-select">{{
                questionTypes[question.type_id].type
              }}</small>
              <div class="actionable d-flex justify-space-between">
                <span
                  class="primary edit-icon"
                  @click="() => editQuestion(question)"
                >
                  <img src="~/assets/images/edit-icon.svg" alt="" />
                </span>
                <v-icon
                  @click="() => handleDelete(question)"
                  class="delete-icon"
                  >mdi-trash-can-outline</v-icon
                >
              </div>
            </div>
            <ul class="text-type-ans-set">
              <li
                v-for="(quesKey, idx) in Object.keys(
                  question.specification.questionKeys
                )"
                :key="idx"
              >
                <input
                  class="text-ans-input"
                  disabled
                  v-model="question.specification.questionKeys[quesKey]"
                />
              </li>
            </ul>

            <span class="points">Total Points:&nbsp;{{ question.points }}</span>
          </div>
          <div v-if="question.type_id == 4" :class="['text-input ans-section']">
            <div class="question-title d-flex align-center">
              <label class="ans-label" for="multi-select"
                >{{ idx + 1 }}&nbsp;{{ question.title }}</label
              >
              <small class="ans-label question-type" for="multi-select">{{
                questionTypes[question.type_id].type
              }}</small>
              <div class="actionable d-flex justify-space-between">
                <span
                  class="primary edit-icon"
                  @click="() => editQuestion(question)"
                >
                  <img src="~/assets/images/edit-icon.svg" alt="" />
                </span>
                <v-icon
                  @click="() => handleDelete(question)"
                  class="delete-icon"
                  >mdi-trash-can-outline</v-icon
                >
              </div>
            </div>
            <ul class="text-type-ans-set">
              <li
                v-for="(quesKey, idx) in Object.keys(
                  question.specification.questionKeys
                )"
                :key="idx"
              >
                <input
                  class="text-ans-input"
                  disabled
                  v-model="question.specification.questionKeys[quesKey]"
                />
              </li>
            </ul>

            <span class="points">Total Points:&nbsp;{{ question.points }}</span>
          </div>
          <div v-if="question.type_id == 7" :class="['text-input ans-section']">
            <div class="question-title d-flex align-center">
              <label class="ans-label" for="multi-select"
                >{{ idx + 1 }}&nbsp;{{ question.title }}</label
              >
              <small class="ans-label question-type" for="multi-select">{{
                questionTypes[question.type_id].type
              }}</small>
              <div class="actionable d-flex justify-space-between">
                <span
                  class="primary edit-icon"
                  @click="() => editQuestion(question)"
                >
                  <img src="~/assets/images/edit-icon.svg" alt="" />
                </span>
                <v-icon
                  @click="() => handleDelete(question)"
                  class="delete-icon"
                  >mdi-trash-can-outline</v-icon
                >
              </div>
            </div>
            <ul class="text-type-ans-set">
              <li
                v-for="(quesKey, idx) in question.specification
                  .fillInTheBlankList"
                :key="idx"
                class="d-flex border"
              >
                <div v-for="(ans, i) in quesKey.data" :key="i" >
                  <span v-if="ans.type == 'word' && ans.value !== ' .'" disabled class="">
                    {{ ans.value }}
                  </span>
                  <v-spacer></v-spacer>
                  <input
                    disabled
                    v-if="ans.type == 'blank'"
                    class="mx-10"
                    type="text"
                    v-model="ans.ans"
                  />
                </div>
              </li>
            </ul>

            <span class="points">Total Points:&nbsp;{{ question.points }}</span>
          </div>
        </v-card>
        <span
          class="zeero-state"
          v-if="!selectedQuestions || selectedQuestions.length < 1"
        >
          You have created an empty set. Its time for you to add questions into
          this set.<br />
          To add questions click on
          <a href="javascript:void(0)" @click="getQuestionsPopup"
            >Add from question set bank</a
          >
        </span>
      </div>
      <div class="form-footer d-flex">
        <div class="counts d-flex flex-column">
          <span>Total Questions: {{ selectedQuestions.length || "00" }}</span>
          <span
            >Total Points:
            {{
              selectedQuestions || selectedQuestions.length > 0
                ? selectedQuestions
                    .map((x) => x.points)
                    .reduce((a, b) => a + b, 0)
                : "00"
            }}</span
          >
        </div>
        <div class="btns">
          <v-btn color="primary" @click="upsertQuestionSet"> submit </v-btn>
          <v-btn
            :disabled="total >= 100"
            @click="createNewQuestion"
            class="muted"
          >
            <v-icon>mdi-plus-thick</v-icon>
            &nbsp;Add new question
          </v-btn>
        </div>
      </div>
      <div class="tags-listing d-flex">
        <span>Tags &nbsp;&nbsp;</span>
        <span class="tag-chips" v-for="(tag, idx) in selectedTags" :key="idx">{{
          tag
        }}</span>
      </div>
    </v-form>
    <v-snackbar
      :color="snackbarSuccess ? 'successDark' : ''"
      v-model="snackbar"
      :timeout="snackbarTimeout"
    >
      <span>
        <v-icon v-if="snackbarSuccess">mdi-check-circle</v-icon>
        {{ snackbarText }}
      </span>
    </v-snackbar>
    <v-dialog v-model="dialog" width="90%" max-width="90%">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Select Questions
        </v-card-title>
        <v-card-text>
          <QuestionSetList
            :exclude="[Number(this.id)]"
            :singleChoice="true"
            :onSelectCallback="onSelectQuestionSet"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <ConfirmDialog
      headerText="please confirm"
      confirmationText="Are you sure want to delete"
      :onCancel="
        () => {
          this.showConfirmBox = 'false';
          this.itemToDelete = null;
        }
      "
      :onConfirm="this.handleDelete"
      :showDialog="showConfirmBox"
    />

    <CreateTag
      :onCancel="
        () => {
          this.showTagCreator = 'false';
          this.itemToDelete = null;
        }
      "
      :onConfirm="handleCreateTag"
      :showDialog="showTagCreator"
    />
  </div>
</template>
<style lang="scss">
.create-question-set {
  max-height: 1914px;
  max-width: 1138px;
  border-radius: 8px;
  letter-spacing: 2.4px;
  width: 80%;
  margin: auto;
  .question-card {
    background: #ffffff;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
  }
  .cloneQuestionSet {
    position: absolute;
    right: 10%;
    top: 55px;
    background: #ffffff;
    border: 1px solid #4483ed;
    box-sizing: border-box;
    box-shadow: 0px 12px 8px rgb(68 131 237 / 12%);
    border-radius: 100px;
    color: #4483ed;
    padding: 20px 15px;
  }
  .muted {
    opacity: 0.7;
  }
  .border {
    border: 1px solid rgb(196, 196, 196);
  }
  .label,
  .v-text-field__slot {
    font-size: 24px;
    text-transform: uppercase;
    color: #404040;
    opacity: 0.7;
  }
  .form1 {
    .form1-row {
      width: 100%;
      position: relative;
      .v-input {
        .v-input__control {
          .v-input__slot {
            &:before,
            &:after {
              content: none;
            }
          }
        }
      }
      .tag-selector.v-select--is-menu-active + .add-more {
        display: block !important;
      }
      .add-more {
        display: none;
        background: #1976d2;
        border-radius: 50%;
        color: #fff;
        padding: 7px;
        position: absolute;
        right: 5px;
        z-index: 9;
        cursor: pointer;
      }
      input {
        &::placeholder {
          text-transform: uppercase;
          font-size: 24px;
          text-transform: uppercase;
          color: #404040;
          opacity: 0.7;
        }
      }
      .v-select__slot {
        width: 100%;
        background: #ffffff;
        border: 1px solid #9f9f9f;
        box-sizing: border-box;
        padding: 0px 10px;
      }
      .error-class {
        .v-select__slot,
        input {
          border-color: red;
          border-bottom-color: red;
        }
      }
    }
  }
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
    &.disabled {
      background: #f1f1f1;
    }
  }
  .text-input {
    label {
      text-transform: uppercase;
      color: #888888;
    }
  }
  .multi-select {
    background: #ffffff;
    border: 1px solid #dfe0eb;
    box-sizing: border-box;
    border-radius: 4px;
    height: 220px;
    width: 100%;
    padding: 15px;
    margin: 10px auto;
    .select {
      color: #1f1f1f;
      opacity: 0.7;
      list-style: lower-latin;
      padding: 10px;
      padding-left: 30px;
      line-height: 35px;
      > li {
        width: max-content;
        padding: 0px 10px;
        border-radius: 5px;
        cursor: pointer;
      }
      height: 140px;
      overflow: auto;
    }
    &.choose-ans {
      height: 350px;
      .select {
        padding-left: 0px;
        padding-top: 0px;
        list-style: none;
        height: 300px;
        > li {
          padding: 0px;
          margin: 10px 0px;
        }
        .checkbox {
          margin-top: -12px;
          padding: 0px;
        }
        .label {
          > span {
            text-transform: lowercase;
          }
        }
      }
    }
  }
  .grid-2 {
    width: 100%;
    .col {
      padding: 0px;
    }
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 10px;
    align-self: flex-end;
  }
  .screen-2 {
    .header-label {
      justify-content: space-between;
      width: 100%;
      margin-bottom: 15px;
      .labels {
        padding: 10px;
        border-radius: 8px;
      }
      .disabled {
        background: #ececec;
        > span:first-of-type {
          text-transform: capitalize;
          opacity: 0.8;
        }
      }
      .primary {
        color: #fff;
        font-weight: 500;
      }
    }
    .question-container {
      position: relative;
      background: #ffffff;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      border-radius: 4px;
      min-height: 600px;
      width: 100%;
      height: 600px;
      overflow: auto;
      padding: 10px;
      .zeero-state {
        align-self: center;
        text-align: center;
        margin: auto;
        > a {
          text-decoration: none;
        }
      }
    }
    .form-footer {
      margin-top: 15px;
      justify-content: space-between;
      width: 100%;
      .counts {
        line-height: 30px;
      }
    }
    .question-list {
      background: #fff;
      padding: 20px;
    }
    .ans-section {
      border: none;
      .delete-icon {
        cursor: pointer;
        background: #e0dede;
        border-radius: 50%;
        width: 40px;
      }
      .question-title {
        justify-content: space-between;
        .question-type {
          font-size: 8px;
          border: 1px solid #1976d2;
          padding: 5px;
          line-height: 20px;
          border-radius: 20px;
          color: #1976d2;
          font-weight: 600;
        }
        .actionable {
          width: 90px;
        }
      }
      .ans-label {
        font-weight: 300;
        text-transform: uppercase;
        color: #888888;
      }
      > ul {
        display: GRID;
        list-style: Upper-latin;
        grid-template-columns: 1fr 1fr;
        min-height: 50px;
        position: relative;
      }
      .addNewAns {
        position: absolute;
        cursor: pointer;
        top: 0px;
        right: 0px;
        > .v-icon {
          color: #4483ed;
        }
      }
      .text-type-ans-set {
        > li {
          > input {
            height: 50px;
            border: 1px solid #e5e5e5;
            padding: 10px;
            margin: 5px 0px;
          }
        }
      }
      .image-type-ans-set {
        > li {
          margin: 10px 0px;
        }
        .img-box {
          display: flex;
          align-self: center;
          align-items: baseline;
          max-height: 70px;
          overflow: hidden;
          > img {
            width: 70px;
          }
        }
      }
      .points {
        background: #f0f0f0;
        border: 1px solid #a3a3a3;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        line-height: 20px;
      }
    }
  }
  .error-border {
    border: 1px solid red;
  }
  .edit-icon {
    cursor: pointer;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.edit-set {
      width: 25px;
      height: 25px;
      > img {
        width: 12px;
        height: 12px;
      }
    }
  }
  .tags-listing {
    align-self: flex-start;
    align-items: center;
    margin-top: 30px;
    .tag-chips {
      background: #ffffff;
      border: 1px solid #4483ed;
      box-sizing: border-box;
      box-shadow: 0px 12px 8px rgb(68 131 237 / 12%);
      border-radius: 100px;
      color: #4483ed;
      padding: 10px;
      font-size: 12px;
      margin-right: 5px;
      &:last-of-type {
        margin-right: none;
      }
    }
  }
}
</style>
<script>
import ImageDropBox from "../../components/ImageDropBox";
import QuestionSetList from "../../components/questionSetList";
import SelectQuestionType from "../../components/selectQuestionType";
import ConfirmDialog from "../../components/confirmDialog";
import CreateTag from "../../components/createTag";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  layout: "admin",
  components: {
    ImageDropBox,
    QuestionSetList,
    SelectQuestionType,
    ConfirmDialog,
    CreateTag,
  },
  filteredQuestions: [],
  allQuestions: [],
  subjects: [],
  file: null,
  typeOptions: [],
  uploadedFile: null,
  async mounted() {
    let subjects = await this.$api.subjects.getAll();
    let questionTypes = await this.$api.questionTypes.getAll();
    this.subjects = subjects.data;
    questionTypes.data.forEach((x) => {
      this.questionTypes[x.id] = x;
    });
    if (this.$route.query.id || this.$route.query.clone) {
      let id = this.$route.query.id || this.$route.query.clone;
      if (this.$route.query.id) {
        this.id = id;
      }
      this.updateSetDetails(id);
      this.clone = this.$route.query.clone ? true : false;
      this.edit = this.$route.query.clone ? true : false;
    }
    if (
      this.$route.query.isEditSuccess &&
      !isNaN(this.$route.query.isEditSuccess)
    ) {
      if (
        this.$route.query.isCloned != "undefined" &&
        this.$route.query.isCloned &&
        this.$route.query.isCloned == "true"
      ) {
        this.removeClonedQuestionData({
          set_id: this.id,
          clonedId: this.$route.query.isEditSuccess,
          isCloned: true,
        });
      } else {
        this.removeClonedQuestionData({
          set_id: this.id,
          clonedId: this.$route.query.isEditSuccess,
          isCloned: false,
        });
      }
    }
  },
  data() {
    return {
      questionTypes: [],
      total: 0,
      showTagCreator: false,
      showAddMore: false,
      showConfirmBox: "false",
      id: null,
      clone: false,
      edit: false,
      form1Valid: true,
      form2Valid: true,
      form3Valid: true,
      selectedAns: null,
      points: 0,
      ansType: null,
      screen: 1,
      title: null,
      discription: null,
      questionType: null,
      typeOptions: this.typeOptions,
      file: this.file,
      dragging: false,
      subjects: this.subjects,
      selectedSubject: {},
      levelOptions: [
        {
          text: "Level 1",
          value: 1,
        },
        {
          text: "Level 2",
          value: 2,
        },
        {
          text: "Level 3",
          value: 3,
        },
        {
          text: "Level 4",
          value: 4,
        },
        {
          text: "Level 5",
          value: 5,
        },
        {
          text: "Level 6",
          value: 6,
        },
        {
          text: "Level 7",
          value: 7,
        },
        {
          text: "Level 8",
          value: 8,
        },
        {
          text: "Level 9",
          value: 9,
        },
      ],
      tags: [
        {
          text: "Assessment",
          value: "Assessment",
        },
        {
          text: "Question of the day",
          value: "Question of the day",
        },
        {
          text: "Simple Question",
          value: "Simple Question",
        },
        {
          text: "Level 4",
          value: "Level 4",
        },
      ],
      selectedLevel: null,
      questionImage: null,
      questionImageText: null,
      ansKeys: {
        1: { label: "One", key: "A" },
        2: { label: "Tow", key: "B" },
        3: { label: "Three", key: "C" },
        4: { label: "Four", key: "D" },
        5: { label: "Five", key: "E" },
        6: { label: "Six", key: "F" },
        7: { label: "Seven", key: "G" },
        8: { label: "Eight", key: "H" },
        9: { label: "Nine", key: "I" },
        10: { label: "Ten", key: "J" },
      },
      ansValues: {},
      ansSet: [],
      isUploading: false,
      ansExplanationImage: null,
      ansImageExplainationText: null,
      dialog: false,
      selectedQuestions: this.questionSetData?.[this.id]?.Questions || [],
      selectedQuestionType: null,
      selectedTags: [],
      snackbar: false,
      snackbarText: "Username/Password incorrect.",
      snackbarTimeout: 2000,
      snackbarSuccess: false,
    };
  },
  methods: {
    validate(form) {
      let values = [];
      switch (form) {
        case "form1":
          this.form1Valid = false;
          values = [
            "title",
            "selectedSubject",
            "selectedTags",
            "selectedLevel",
          ];
          break;
        case "form2":
          this.form2Valid = false;
          values = [
            "ansType",
            "ansSet",
            "ansValues",
            "ansImageExplainationText",
            "selectedTag",
            "selectedLevel",
          ];
          break;
        case "form3":
          this.form3Valid = false;
          values = ["points", "selectedAns"];
          break;
        default:
          break;
      }
      return !this.checkDirty(values);
    },
    checkDirty(list) {
      return list.find((x) => {
        if (typeof this[x] == "object" && Array.isArray(this[x])) {
          return !this[x] || this[x].length < 1;
        } else if (typeof this[x] == "object") {
          return !this[x] || Object.keys(this[x]).length < 1;
        } else {
          return !this[x];
        }
      });
    },
    async upsertQuestionSet(e) {
      this.form1Valid = this.validate(`form1`);
      if (!this.form1Valid) {
        return;
      }
      let setData = {
        set_name: this.title,
        subject_id: this.selectedSubject.id,
        tags: this.selectedTags.join(", "),
        level: this.selectedLevel.value,
        status: this.questionSetData.status || "Draft",
      };
      let rsp = null;
      if (this.id) {
        setData.status = this.questionSetData[this.id].status || "Scheduled";
        setData.id = this.id;
        rsp = await this.$api.questionSets.update(this.id, setData);
        let allPromises = [];

        this.questionSetData[this.id]?.Questions?.forEach((each) => {
          let question = JSON.parse(JSON.stringify(each));
          question.set_id = this.id;
          question.specification = JSON.stringify(question.specification);
          if (!question.id || question.set_id != this.id) {
            delete question.clonedId;
            allPromises.push(this.$api.questions.create(question));
          }
        });
        await Promise.all(allPromises);
        this.snackbarText = "Question Set edited Succesfully";
        this.snackbar = true;
        this.snackbarSuccess = true;
      } else {
        rsp = await this.$api.questionSets.create(setData);
      }
      if (rsp && rsp.id) {
        this.addQuestionSetData({ ...rsp, screen: 2 });
      }
      if (this.id || this.screen == 2) {
        this.$router.replace(`/admin/questionSets`);
      } else {
        this.id = rsp.id;
        this.screen += 1;
      }
    },
    handleMultiSelect(name, value) {
      switch (name) {
        case "subject":
          this.selectedSubject = value;
          break;
        case "tags":
          if (!this.selectedTag[value.value]) {
            this.selectedTag = { ...this.selectedTag, [value.value]: true };
          } else {
            this.selectedTag = { ...this.selectedTag, [value.value]: false };
          }
          break;
        case "level":
          this.selectedLevel = value;
          break;
        default:
          break;
      }
    },
    goToPrev(screen) {
      this.edit = true;
      if (screen == 2 && !this.clone) {
        this.$router.replace(`/admin/questionSets`);
      }
      if (screen) {
        this.screen = screen;
        return;
      }
      if (this.screen == 1) {
        return;
      }
      this.screen -= 1;
    },
    getQuestionsPopup() {
      this.dialog = true;
    },
    onSelectQuestionSet(data) {
      this.clone = true;
      this.updateSetDetails(data.id, true);
      this.dialog = false;
    },
    handleDelete(question = null) {
      if (!this.itemToDelete && question && this.showConfirmBox === "false") {
        this.itemToDelete = question;
        this.showConfirmBox = "true";
        return;
      }
      if (this.itemToDelete) {
        if (this.itemToDelete.id) {
          this.$api.questions.delete(this.itemToDelete.id);
          this.selectedQuestions = this.selectedQuestions.filter(
            (x) => x.id != this.itemToDelete.id
          );
        } else {
          this.selectedQuestions = this.selectedQuestions.filter(
            (x) => x != this.itemToDelete
          );
        }
        this.total -= this.itemToDelete.points;
        this.replaceList({
          Questions: this.selectedQuestions,
          set_id: this.id,
        });
      }

      this.showConfirmBox = "false";
      this.itemToDelete = null;
    },
    onSelectQuestionType(e) {
      this.selectedQuestionType = e;
    },
    ...mapMutations({
      addQuestionSetData: "questionSet/addQuestionSetData",
      addQuestionData: "questionSet/addQuestionData",
      addClonedQuestionData: "questionSet/addClonedQuestionData",
      replaceList: "questionSet/replaceList",
      removeClonedQuestionData: "questionSet/removeClonedQuestionData",
    }),
    ...mapActions({
      manageSetData: "questionSet/manageSetData",
    }),
    createNewQuestion() {
      if (!this.id) {
        this.snackbarText = "Something went wrong please refresh!";
        this.snackbar = true;
        return;
      }
      this.$router.replace(`/admin/create-question?setId=${this.id}`);
    },
    editQuestion(question) {
      this.$router.push({
        path: `/admin/edit-question?setId=${this.id}&questionId=${
          question.id || question.clonedId
        }&isClone=${!!question.clonedId}`,
      });
    },
    openCloneQuestion() {
      this.dialog = true;
    },
    async updateSetDetails(id, isCloned) {
      let questionSet = await this.$api.questionSets.get(id);
      if (questionSet && questionSet.id) {
        if (!this.clone) {
          this.id = id;
          this.title = questionSet.set_name;
        } else if (isCloned && !this.id) {
          delete questionSet.id;
          const rsp = await this.$api.questionSets.create(questionSet);
          this.id = rsp.id;
        }
        this.selectedSubject = this.subjects.find(
          (x) => x.id == questionSet.subject_id
        );
        this.selectedTags = questionSet.tags.split(", ");
        this.selectedLevel = {
          value: questionSet.level,
          text: questionSet.level,
        };
        this.screen = 2;
        let questions = await this.$api.questions.find({
          set_id: questionSet.id,
        });
        this.addQuestionSetData({ ...questionSet, screen: 2, id: this.id });
        this.selectedQuestions =
          this.questionSetData?.[this.id]?.Questions || [];
        let added = {};
        this.selectedQuestions.forEach((each) => {
          added[each.id] = each;
        });
        questions.data.forEach((x) => {
          x.specification = JSON.parse(x.specification);
          x.set_id = this.id;
          if (this.total + Number(x.points) <= 100) {
            if (isCloned && !added[x.id]) {
              x.clonedId = x.id;
              delete x.id;
              this.addClonedQuestionData(x);
            } else if (!added[x.id]) {
              this.addQuestionData(x);
            }
            this.total = this.total + Number(x.points);
          } else {
            this.snackbarText = "Cant add more question! Set capacity is full";
            this.snackbar = true;
          }
        });
        this.selectedQuestions =
          this.questionSetData?.[this.id]?.Questions || [];
      }
    },
    handleCreateTag(data) {
      this.tags = [
        ...this.tags,
        {
          text: data,
          value: data,
        },
      ];
      this.selectedTags.push(data);
      this.showTagCreator = "false";
    },
  },
  computed: {
    extension() {
      return this.file ? this.file.name.split(".").pop() : "";
    },
    ...mapGetters({
      questionSetData: "questionSet/getQuestionSetData",
    }),
  },
};
</script>
