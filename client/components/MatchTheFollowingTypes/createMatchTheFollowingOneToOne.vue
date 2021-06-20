<template>
  <div class="create-question-MTFOTO">
    <v-form ref="form1" v-if="screen == 1" class="d-flex flex-column align-center">
         <v-text-field v-model="title" label="2.type your Question Title" :class="['text-input', (!form1Valid && !title && 'error-border')]" ></v-text-field>
         <v-select
          v-model="questionType"
          :items="['Text Question', 'Image Question']"
          label="3.select your question format"
          :class="['text-input', (!form1Valid && !questionType && 'error-border')]" 
          :item-text="item => item.type"
          :item-value="item => item.id"
        ></v-select>
        <v-text-field :class="['text-input', (!form1Valid && !discription && 'error-border')]"  v-model="discription" placeholder="4.type your question here"/>
         <div :class="['text-input ans-section ques-section', (!form1Valid && (Object.keys(ansSet).length < 1 || Object.keys(quesValues).filter(x => quesValues[x]).length < Object.keys(ansSet).length) && 'error-border')]" >
          <label class="ans-label" for="multi-select">5. Add left column values for the question*</label>
          <ul class="text-type-ans-set">
            <li v-for="(ansKey,idx) in ansSet" :key="idx">
              <input class="text-ans-input" v-model="quesValues[ansKey.key]"  :placeholder="ansKey.label"/>
              <v-icon @click="() => removeOption(idx,true)" >mdi-close-circle</v-icon>
            </li>
            <span v-if="ansSet.length < 26" class="addNewAns" @click="() => addOption(true)">Add <v-icon>mdi-plus-circle</v-icon></span>
          </ul>
        </div>
        <div :class="['text-input', 'file-upload', (!form1Valid && !this.questionImage && 'error-border')]" v-if="questionType == 'Image Question'" >
          <label for="">upload your queston image</label>
            <ImageDropBox key="questionImage" :showIcon="true" label="Upload image here" :deleteEnable="true" :callback="(file) => this.questionImage = file" />
            <v-text-field
              v-model="questionImageText"
              label="Add explanation text"
              class="text"
          ></v-text-field>
        </div>
    </v-form>
    <v-form ref="form2" v-if="screen == 2" class="d-flex flex-column align-center screen-2">
         <v-select
          v-model="ansType"
          :items="['Text Answer', 'Image Answer']"
          label="6.	select your answer format*"
          :class="['text-input', (!form2Valid && !ansType && 'error-border')]"
          @change="openSelectImagePopup"
        ></v-select>
        <div :class="['text-input ans-section', (!form2Valid && (Object.keys(ansSet).length < 1 || Object.keys(ansValues).length < Object.keys(ansSet).length) && 'error-border')]" >
          <label class="ans-label" for="multi-select">7. Add answers to your question*</label>
          <ul v-if="ansType == 'Text Answer'" class="text-type-ans-set">
            <li v-for="(ansKey,idx) in ansSet" :key="idx">
              <input class="text-ans-input" v-model="ansValues[ansKey.key]"  :placeholder="ansKey.label"/>
              <v-icon @click="() => removeOption(idx)" >mdi-close-circle</v-icon>
            </li>
            <span v-if="ansSet.length < 10" class="addNewAns" @click="addOption">Add Answer <v-icon>mdi-plus-circle</v-icon></span>
          </ul>
          <ul v-if="ansType == 'Image Answer'" class="image-type-ans-set">
            <li v-for="(ansKey,idx) in ansSet" :key="idx">
              <div class="img-box">
                <ImageDropBox label="Click to add image" :uploadedImage="ansValues[ansKey.key] && ansValues[ansKey.key].url ? ansValues[ansKey.key]:null" :deleteEnable="false" :callback="(file) => ansValues[ansKey.key] = file "/>
                <v-icon @click="() => removeOption(idx)" >mdi-close-circle</v-icon>
              </div>
            </li>
            <span v-if="ansSet.length < 10" class="addNewAns" @click="addOption">Add Answer <v-icon>mdi-cloud-upload</v-icon></span>
          </ul>
          
        </div>
        <input :class="['text-input',(!form2Valid && !ansImageExplainationText && 'error-border')]" v-model="ansImageExplainationText" placeholder="8. Add explanation text*  "/>
        <div class="text-input file-upload" >
          <label for="">add explanation image</label>
            <ImageDropBox key="explanationImage"  :showIcon="true" label="Upload image here" :deleteEnable="true" :callback="(file) => this.ansExplanationImage = file"/>
        </div>
    </v-form>
    <v-form ref="form3" v-if="screen == 3" class="d-flex flex-column align-center screen-2">
      <input :class="['text-input',(!form3Valid && points < 1 && 'error-border')]" v-model="points" placeholder="9.	Add points to this question*"/>
        <v-select
          :items="['Text Answer', 'Image Answer']"
          label="10.	select your answer format*"
          :value="ansType"
          class="text-input"
          @change="openSelectImagePopup"
        ></v-select>
       <div v-if="chooseAns" :class="['multi-select choose-ans', (!form3Valid && !selectedAns && 'error-border')]">
            <label for="multi-select">11. Map the correct answers against each column.* </label>
              <ul class="select">
                  <li v-for="(ques,idx) in Object.keys(quesValues)" :key="idx">
                    <div class="grid-2 align-center">
                      <div class="label">
                        <span>{{ques}}</span>&nbsp;{{quesValues[ques]}}
                      </div>
                      <div class="value">
                         <v-select
                          :items="Object.values(ansValues)"
                          class="text-input"
                          v-model="mapping[ques]"
                          max-width="200px"
                        ></v-select>
                      </div>
                    </div>
                  </li>
              </ul>
        </div>
        <div v-if="selectAnsImage"  :class="['multi-select choose-ans', (!form3Valid && (Object.keys(mapping).length < Object.keys(quesValues).length) && 'error-border')]">
              <ul class="select">
                  <li v-for="(ques,idx) in Object.keys(quesValues)" :key="idx">
                      <div class="grid-3">
                        <div class="label">
                          <span>{{ques}}</span>&nbsp;{{quesValues[ques]}}
                        </div>
                        <div v-if="mapping[ques] && mapping[ques].url" class="d-flex justify-space-between align-center img-box"  style="width:100px;">
                          <img :src="mapping[ques].url"  style="width:100%;" />
                          <v-icon @click="() => removeOption(ques,true)" >mdi-close-circle</v-icon>
                        </div>
                      </div>
                  </li>
              </ul>
              <v-dialog max-width="1300" v-model="dialog">
                  <template v-slot:activator="{ on, attrs }">
                    <span  v-bind="attrs" v-on="on" class="cloud-upload" ><v-icon class="primary--text">mdi-cloud-upload</v-icon>&nbsp;Add Answer</span>
                  </template> 
                  <v-card class="pa-10 pt-6 choose-img">
                    <v-card-title class="headline"> choose from the available images </v-card-title>
                    <v-card-text>
                        <ul class="image-type-ans-set d-flex mt-10 justify-space-between">
                          <li v-for="(ans,idx) in Object.keys(ansValues)" :key="idx">
                            <div @click="() => selectAns(ansValues[ans])" class="img-box">
                              <img :src="ansValues[ans].url" />
                            </div>
                          </li>
                        </ul>
                    </v-card-text>
                  </v-card>
              </v-dialog>
        </div>
    </v-form>
    <div class="btns">
       <v-btn v-if="screen !== 3 && screen !== 1" @click="goToPrev">
        <v-icon>mdi-chevron-left-circle-outline</v-icon>
        &nbsp;PREVIOUS
      </v-btn>
       <v-btn v-if="screen == 3" @click="()=> goToNext('Draft')">
        <v-icon>mdi-chevron-left-circle-outline</v-icon>
        &nbsp;SAVE DRAFT
      </v-btn>
      <v-btn @click="()=> goToNext('Scheduled')" class="primary">
        {{screen == 3 ? 'SAVE':'NEXT'}}&nbsp;
        <v-icon>mdi-chevron-right-circle-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<style lang="scss">
.create-question-MTFOTO{
    letter-spacing: 2.4px;
    max-width: 80%;
    margin:auto;
    .text-input, .multi-select{
        background: #FFFFFF;
        border: 1px solid #9F9F9F;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        line-height: 50px;
        padding: 0 15px;
        margin: 5px auto;
        &::placeholder{
            text-transform: uppercase;
            color: #616161;
            opacity: 0.7;
        }
        .v-input__control{
            margin-top: 15px;
            margin-bottom: -15px;
        }
        .v-input__slot{
          &:before{
            display: none;
          }
        }
    }
    .text-input{
      label{
        text-transform: uppercase;
            color: #616161;
            opacity: 0.7;
      }
    }
    .multi-select{
        background: #FFFFFF;
        border: 1px solid #DFE0EB;
        box-sizing: border-box;
        border-radius: 4px;
        height: 220px;
        width: 100%;
        padding: 15px;
        margin:10px auto;
        >label{
            font-size: 14px;
            text-transform: uppercase;
            color: #616161;
            opacity: 0.7;
        }
        .select{
            color: #1F1F1F;
            opacity: 0.7;
            list-style: lower-latin;
            padding:10px;
            padding-left: 30px;
            line-height: 35px;
            >li{
              width: max-content;
              padding: 0px 10px;
              border-radius: 5px;
              cursor: pointer;
            }
            height: 140px;
            overflow: auto;
        }
        &.choose-ans{
          height:400px;
          position: relative;
          .select{
            padding-left: 0px;
            padding-top: 0px;
            list-style:none;
            height:320px;
            >li{
              padding:0px;
              margin: 10px 0px;
              width: 100%;
            }
            .checkbox{
              margin-top:-12px;
              padding:0px;
            }
            .label{
              >span{
                  text-transform: lowercase;
              }
            }
          }
          .cloud-upload{
              position: absolute;
              top: 10px;
              right: 30px;
              background: #FFFFFF;
              box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
              padding: 0px 10px;
              border-radius: 5px;
              font-size: 12px;
              line-height: 25px;
          }
          .grid-3{
            display: grid;
            grid-template-columns: 5fr 3fr 2fr;
            line-height: 70px;
            .label{
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
    }
    .ans-section{
        .ans-label{
          font-weight: 300;
          text-transform: uppercase;
          color: #616161;
          opacity: 0.8;
          font-weight: 400;
        }
        padding:15px;
        >ul{
          display: GRID;
          list-style: Upper-latin;
          grid-template-columns: 1fr 1fr;
          min-height: 50px;
          position: relative;
        }
        &.ques-section{
          >ul{
            >li{
              input{
                width: 80%;
              }
            }
            .addNewAns{
              position: absolute;
              top:-45px;
            }
          }
        }
        .addNewAnsDiv{
            position: absolute;
            top: -45px;
            right: 0px;
            width: 200px;
            .addNewAns:last-of-type{
              background: #FFFFFF;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
              line-height: 20px;
              border-radius: 4px;
            }
        }
        .addNewAns{
            cursor: pointer;
            top: 0px;
            right: 0px;
            >.v-icon{
              color:#4483ED
            }
          }
        .text-type-ans-set{
            >li{
              >input{
                height: 50px;
                border: 1px solid #E5E5E5;
                padding: 10px;
                margin:5px 0px;
              }
            }
        }
        .image-type-ans-set{
          >li{
            margin:25px 0px;
          }
          .img-box{
              display: flex;
              align-self: center;
              align-items: baseline;
              max-height: 70px;
              overflow: hidden;
              .dropZone-uploaded{
                  .dropZone-uploaded-info{
                    >img{
                      max-width: 90px;
                    }
                  }
                }
          }
        }
      }
    .file-upload{
        height: 240px;
        .text{
          line-height: 45px;
          letter-spacing: 2.4px;
          text-transform: uppercase;
          color: #616161;
          opacity: 0.7;
        }
      >label{
            text-transform: uppercase;
            color: #616161;
            opacity: 0.7;
          }
    }
    .grid-2{
      display: grid;
      grid-template-columns: 7fr 3fr;
      width: 100%;
      >.select{
        overflow: hidden;
      }
      .col{
        padding: 0px;
      }
      >.label{
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .btns{
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 10px;
    }

    .error-border{
      border:1px solid red;
    }
}
.choose-img{
      border-radius: 10px;
      .headline{
        background: #FFFFFF;
        border: 1px solid #BCBCBC;
        box-sizing: border-box;
        border-radius: 20px!important;
        padding: 10px;
        letter-spacing: 2.4px;
        text-transform: uppercase;
        color: #868686;
        width: 500px;
        justify-content: center;
        margin: auto;
      }
      .image-type-ans-set{
         list-style:none;
         .img-box{
            width: 100px;
            cursor: pointer;
            >img{
              width: 100%;
            }
          }
      }
  }
</style>
<script>
import ImageDropBox from '../ImageDropBox';
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";


export default {
  name: 'CreateMatchTheFollowingOneToOne',
  props: ['onSubmit', 'setData', 'questionData', 'subjects', 'isCloned'],
  filteredQuestions:[],
  allQuestions:[],
  file:null,
  uploadedFile:null,
  async mounted() {
     if(this.setData){
        this.setTitle = this.setData.setTitle;
        this.setId = this.setData.setId;
        this.selectedSubject = this.setData.selectedSubject;
        this.selectedTag = this.setData.selectedTag;
        this.selectedLevel = this.setData.selectedLevel;
     }else{
       this.$router.replace("/admin/create-question-set");
     }
    if(this.setData && this.questionData ){
        if(this.questionData.id && !this.isCloned){
          this.id = this.questionData.id;
        }
        this.title = this.questionData.title;
        this.selectedSubject = this.subjects.find(x => x.id == this.questionData.subject_id);
        this.selectedTag = this.questionData.tags.split(', ');
        this.selectedLevel = {value : this.questionData.level, text:this.questionData.level};
        this.points = this.questionData.points;
        this.discription = this.questionData.specification.discription;
        this.type = this.questionData.specification.questionFormat;
        this.selectedAns = this.questionData.specification.selectedAns;
        this.ansType = this.questionData.specification.ansType;
        this.chooseAns = this.ansType != 'Image Answer';
        this.selectAnsImage = this.ansType == 'Image Answer';
        this.questionType = this.questionData.specification.questionType;
        this.questionImage = this.questionData.specification.questionImage;
        this.questionImageText = this.questionData.specification.questionImageText;
        this.ansValues = this.questionData.specification.answerSet;
        this.is_active = this.questionData.is_active || 0;
        this.subscriber_only = this.questionData.subscriber_only || 0;
        Object.keys(this.questionData.specification.questionKeys).forEach(x=>{
            this.ansSet.push({key:x, lebel: this.questionData.specification.answerSet[x]});
        })
        this.ansExplanationImage = this.questionData.specification.ansExplanationImage;
        this.ansImageExplainationText = this.questionData.specification.ansImageExplainationText;
        this.quesValues = this.questionData.specification.questionKeys;
        this.mapping = this.questionData.specification.AnsKeys;
     }
  },
  data() {
    return {
      id: null,
      form1Valid:true,
      form2Valid:true,
      form3Valid:true,
      selectedAns:null,
      points:0,
      ansType:null,
      screen:1,
      title:null,
      discription:null,
      questionType:null,
      file: this.file,
      dragging: false,
      selectedSubject: {},
      selectedTag:{},
      mapping:{},
      levelOptions: [
          {
            text:'Any',
            value: null
          },
          {
            text:'Level 1',
            value: 1
          },
          {
            text:'Level 2',
            value: 2
          },
          {
            text:'Level 3',
            value: 3
          },
          {
            text:'Level 4',
            value: 4
          },
          {
            text:'Level 5',
            value: 5
          },
          {
            text:'Level 6',
            value: 6
          },
          {
            text:'Level 7',
            value: 7
          },
          {
            text:'Level 8',
            value: 8
          },
          {
            text:'Level 9',
            value: 9
          }
      ],
      tags:[
        {
          text: "Assessment",
          value: "Assessment"
        },
        {
          text: "Question of the day",
          value: "Question of the day"
        },
        {
          text: "Simple Question",
          value: "Simple Question"
        },
        {
          text: "Level 4",
          value: "Level 4"
        }
      ],
      selectedLevel:{},
      questionImage:null,
      questionImageText: null,
      ansKeys:{
          1:{label:'One', key:'A'},
          2:{label:'Tow', key:'B'},
          3:{label:'Three', key:'C'},
          4:{label:'Four', key: 'D'},
          5:{label:'Five', key:'E'},
          6:{label:'Six', key:'F'},
          7:{label:'Seven', key:'G'},
          8:{label:'Eight', key: 'H'},
          9:{label:'Nine', key:'I'},
          10:{label:'Ten', key:'J'},
          11:{label:'One', key:'K'},
          12:{label:'Tow', key:'L'},
          13:{label:'Three', key:'M'},
          14:{label:'Four', key: 'N'},
          15:{label:'Five', key:'O'},
          16:{label:'Six', key:'P'},
          17:{label:'Seven', key:'Q'},
          18:{label:'Eight', key: 'R'},
          19:{label:'Nine', key:'S'},
          20:{label:'Ten', key:'T'},
          21:{label:'One', key:'U'},
          22:{label:'Tow', key:'V'},
          23:{label:'Three', key:'W'},
          24:{label:'Four', key: 'X'},
          25:{label:'Five', key:'Y'},
          26:{label:'Six', key:'Z'}
      },
      quesValues:{},
      ansValues:{},
      ansSet:[],
      isUploading: false,
      ansExplanationImage:null,
      ansImageExplainationText:null,
      chooseAns:true,
      selectAnsImage:false,
      dialog:false,
      setId:null,
      setTitle:null,
      is_active: 0,
      subscriber_only : 0
    };
  },
  methods:{
    validate(form) {
      let values = [];
      switch (form) {
        case 'form1':
          this.form1Valid = false;
          values = ['title','questionType', 'discription', 'quesValues'];
          break;
        case 'form2':
          this.form2Valid = false;
          values = ['ansType','ansSet', 'ansValues','ansImageExplainationText'];
          break;
        case 'form3':
          this.form3Valid = false;
          values = ['points','mapping'];
          break;
        default:
          break;
      }
      return !this.checkDirty(values);
    },
    checkDirty(list){
      return list.find(x=>{
          if(typeof this[x] == 'object'){
            return  !this[x] || Object.values(this[x]).length < 1 || Object.keys(this[x]).filter(y => this[x][y]).length < 1;
          }else if(Array.isArray(this[x])){
             return  !this[x] || this[x].length < 1;
          }else{
            return !this[x];
          }
      })
    },
    async goToNext(type = null){
      this.[`form${this.screen}Valid`] = this.validate(`form${this.screen}`);
      if(!this.[`form${this.screen}Valid`]){
        return;
      }
      if(this.screen == 3){
        if(this.ansExplanationImage && !this.ansExplanationImage.url){
          this.ansExplanationImage = await this.uploadToServer(this.ansExplanationImage);
        }
        return this.submit(type);
      }
      if(this.screen == 1 && this.questionType == 'Image Question' && this.questionImage){
        this.questionImage = await this.uploadToServer(this.questionImage);
      }else if(this.screen == 2 && this.ansType == 'Image Answer'){
        this.ansValues = await this.uploadAnsImages();
      }
      if(screen == 1){
        this.ansSet = [];
      }
      this.screen += 1;
    },
    async uploadAnsImages(){
        let rsp = {};
        Object.keys(this.ansValues).forEach(async (id)=>{
          if(this.ansValues[id] && !this.ansValues[id].url){
            rsp[id] = await this.uploadToServer(this.ansValues[id]);
          }else{
            rsp[id] = this.ansValues[id];
          }
        });
        return rsp;
    },
    goToPrev(){
      if(this.screen == 1){
        return;
      }
      this.screen -= 1;
    },
    uploadQuestionImageCallback(uploaded){
      this.uploadedFile = uploaded;
      setInterval(() => {
        this.submit();
      }, 3000);
    },
    removeOption(idx, isMapping){
      if(isMapping){
        delete this.mapping[idx];
        this.mapping = {...this.mapping};
      }else{
        this.ansSet.splice(idx, 1);
      }
    },
    addOption(isQuestions = null, type = 'text'){
      let n =  this.ansSet.length + 1;
      let i = 1;
      if(this.ansSet.length < 25){
        while (this.ansSet.length < n) {
          const key = this.ansKeys[i];
          if(!this.ansValues.hasOwnProperty(key.key) && !isQuestions){
            this.ansSet = [...this.ansSet,key];
            this.ansValues[key.key] = null; 
          }
          if(!this.quesValues.hasOwnProperty(key.key) && isQuestions){
            this.ansSet = [...this.ansSet,key];
            this.quesValues[key.key] = null; 
          }
          i++;
        }
      }
    },
    async submit(type){
        let data = {
            title:this.title,
            subject_id:this.selectedSubject.id,
            tags: Object.keys(this.selectedTag).join(", "),
            level: this.selectedLevel.value,
            status: type,
            type_id: 3, // for MTFT question type id will be 2
            points: this.points,
            set_id:this.setId,
            specification: JSON.stringify({
                discription:this.discription,
                questionFormat: this.type,
                selectedAns: this.selectedAns,
                ansType: this.ansType,
                questionType: this.questionType,
                questionImage: this.questionImage,
                questionImageText: this.questionImageText,
                answerSet: this.ansValues,
                ansExplanationImage: this.ansExplanationImage,
                ansImageExplainationText: this.ansImageExplainationText,
                questionKeys: this.quesValues,
                AnsKeys: this.mapping
            }),
            is_active: this.is_active,
            subscriber_only: this.subscriber_only
        }
        let rsp = null;
        if(this.id){
            rsp = await this.$api.questions.update(this.id, data);
        }else{
            rsp = await this.$api.questions.create(data);
        }
        if(rsp && rsp.id){
          this.onSubmit(rsp)
        }
    },
    uploadCallback(){
      this.isUploading = false;
      this.screen += 1;
    },
    async uploadToServer(file){
      const formData = new FormData();
      formData.append("attachment", file, file.name);
      const upload = await this.$api.uploads.create(formData);
      const { url, id, filename} = upload;
      return { url, id, filename};
    },
    openSelectImagePopup(value){
      if(value === 'Image Answer'){
        this.chooseAns = false
        this.selectAnsImage = true;
      }else{
        this.chooseAns = true
        this.selectAnsImage = false;
      }
      this.mapping = {};
    },
    ...mapMutations({
      addQuestionSetData: "questionSet/addQuestionSetData",
      addQuestionData: "questionSet/addQuestionData"
    }),
    ...mapActions({
      manageSetData: "questionSet/manageSetData",
    }),
    selectAns(ans){
      let i = 1;
      while (i < 25) {
        const key = this.ansKeys[i];
        if(!this.mapping.hasOwnProperty(key.key)){
          this.mapping[key.key] = ans; 
          break;
        }
        i++;
      }
      this.dialog = false;
    }
  },
  computed: {
    extension() {
      return (this.file) ? this.file.name.split('.').pop() : '';
    },
    ...mapGetters({
      questionSetData: "questionSet/getQuestionSetData",
    }),
  }
};
</script>


