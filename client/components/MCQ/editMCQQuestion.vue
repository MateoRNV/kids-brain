<template>
  <div class="create-question">
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
        <v-text-field :class="['text-input', (!form1Valid && !discription && 'error-border')]"  v-model="discription" label="4.type your question here"/>
        <div :class="['text-input', 'file-upload', (!form1Valid && !this.questionImage && 'error-border')]" v-if="questionType == 'Image Question'" >
          <label for="">upload your queston image</label>
            <ImageDropBox :uploadedImage="this.questionImage" key="questionImage" :showIcon="true" label="Upload image here" :deleteEnable="true" :callback="(file) => this.questionImage = file" />
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
          label="8.	select your answer format*"
          :class="['text-input', (!form2Valid && !ansType && 'error-border')]" 
          :item-text="item => item.type"
          :item-value="item => item.id"
        ></v-select>
        <div :class="['text-input ans-section', (!form2Valid && (Object.keys(ansSet).length < 1 || Object.keys(ansValues).filter(x => ansValues[x]).length < Object.keys(ansSet).length) && 'error-border')]" >
          <label class="ans-label" for="multi-select">9.Add answers to your question*</label>
          <ul v-if="ansType == 'Text Answer'" class="text-type-ans-set">
            <li v-for="(ansKey,idx) in ansSet" :key="idx">
              <input class="text-ans-input" v-model="ansValues[ansKey.key]" @blur="() => ansValues = {...ansValues}"  :placeholder="ansKey.label"/>
              <v-icon @click="() => removeOption(idx)" >mdi-close-circle</v-icon>
            </li>
            <span v-if="ansSet.length < 10" class="addNewAns" @click="addOption">Add Answer <v-icon>mdi-plus-circle</v-icon></span>
          </ul>
          <ul v-if="ansType == 'Image Answer'" class="image-type-ans-set">
            <li v-for="(ansKey,idx) in ansSet" :key="idx">
              <div class="img-box">
                <ImageDropBox :key="ansKey.key" :uploadedImage="ansValues[ansKey.key] && ansValues[ansKey.key].url ? ansValues[ansKey.key]:null" label="Click to add image" :deleteEnable="false" :callback="(file) => ansValues[ansKey.key] = file "/>
                <v-icon @click="() => removeOption(idx)" >mdi-close-circle</v-icon>
              </div>
            </li>
            <span v-if="ansSet.length < 10" class="addNewAns" @click="addOption">Add Answer <v-icon>mdi-cloud-upload</v-icon></span>
          </ul>
          
        </div>
        <input :class="['text-input',(!form2Valid && !ansImageExplainationText && 'error-border')]" v-model="ansImageExplainationText" placeholder="11. Add explanation text*  "/>
        <div class="text-input file-upload" >
          <label for="">add explanation image</label>
            <ImageDropBox :uploadedImage="ansExplanationImage" key="explanationImage"  :showIcon="true" label="Upload image here" :deleteEnable="true" :callback="(file) => this.ansExplanationImage = file"/>
        </div>
    </v-form>
    <v-form ref="form3" v-if="screen == 3" class="d-flex flex-column align-center screen-2">
      <input :class="['text-input',(!form3Valid && points < 1 && 'error-border')]" v-model="points" placeholder="12.	Add points to this question*"/>
        <v-select
          :items="['Text Answer', 'Image Answer']"
          label="8.	select your answer format*"
          :value="(!selectAnsImage && !chooseAns ? null : (selectAnsImage && !chooseAns) ? 'Image Answer' :'Text Answer')"
          class="text-input"
          @change="openSelectImagePopup"
        ></v-select>
        <div v-if="chooseAns" :class="['multi-select choose-ans', (!form3Valid && !selectedAns && 'error-border')]">
            <label for="multi-select">13. select answer*</label>
            <ul class="select">
                <li v-for="(ans,idx) in Object.keys(ansValues)" :key="idx">
                   <div class="d-flex flex-row">
                    <v-checkbox class="checkbox" v-model="selectedAns" :value="ans"  ></v-checkbox>
                    <div class="label">
                      <span>{{ans}}</span>&nbsp; Option {{ans}}
                    </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="selectAnsImage"  :class="['multi-select d-flex justify-center', (!form3Valid && !selectedAns && 'error-border')]">
          <v-dialog v-model="dialog" max-width="1300" > 
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
          <div v-if="selectedAns" class="d-flex justify-space-between align-center">
              <div class="img-box" style="width:200px;">
                <img :src="selectedAns.url"  style="width:100%;" />
              </div>
          </div>
        </div>
    </v-form>
    <div class="btns">
       <v-btn v-if="screen !== 1" @click="goToPrev">
        <v-icon>mdi-chevron-left-circle-outline</v-icon>
        &nbsp;PREVIOUS
      </v-btn>
       <v-btn v-if="screen == 3" @click="()=> goToNext('Draft')">
        <v-icon>mdi-chevron-left-circle-outline</v-icon>
        &nbsp;cencel
      </v-btn>
      <v-btn @click="()=> goToNext('Scheduled')" class="primary">
        {{screen == 3 ? 'SAVE':'NEXT'}}&nbsp;
        <v-icon>mdi-chevron-right-circle-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<style lang="scss">
.create-question{
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
          height:350px;
          .select{
            padding-left: 0px;
            padding-top: 0px;
            list-style:none;
            height:300px;
            >li{
              padding:0px;
              margin: 10px 0px;
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
      width: 100%;
      .col{
        padding: 0px;
      }
    }
    .btns{
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 10px;
    }
    .screen-2{
      .ans-section{
        .ans-label{
          font-weight: 300;
          text-transform: uppercase;
          color: #616161;
        }
        padding:15px;
        >ul{
          display: GRID;
          list-style: Upper-latin;
          grid-template-columns: 1fr 1fr;
          min-height: 50px;
          position: relative;
        }
        .addNewAns{
            position: absolute;
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
  name: 'EditMCQQuestion',
  props: ['onSubmit', 'setData', 'questionData', 'subjects'],
  subjects: [],
  file:null,
  uploadedFile:null,
  async mounted() {
     if(this.setData && this.questionData && this.questionData.id){
        this.id = this.questionData.id;
        this.setTitle = this.setData.setTitle;
        this.setId = this.setData.setId;
        this.title = this.questionData.title;
        this.selectedSubject = this.subjects.find(x => x.id == this.questionData.subject_id);
        this.selectedTag = this.questionData.tags.split(', ');
        this.selectedLevel = {value : this.questionData.level, text:this.questionData.level};
        this.points = this.questionData.points;
        this.discription = this.questionData.specification.discription;
        this.type = this.questionData.specification.questionFormat;
        this.selectedAns = this.questionData.specification.selectedAns;
        this.ansType = this.questionData.specification.ansType;
        this.questionType = this.questionData.specification.questionType;
        this.questionImage = this.questionData.specification.questionImage;
        this.questionImageText = this.questionData.specification.questionImageText;
        this.ansValues = this.questionData.specification.answerSet;
        this.is_active = this.questionData.is_active;
        this.subscriber_only = this.questionData.subscriber_only;
        Object.keys(this.questionData.specification.answerSet).forEach(x=>{
            this.ansSet.push({key:x, lebel: this.questionData.specification.answerSet[x]});
        })
        this.ansExplanationImage = this.questionData.specification.ansExplanationImage;
        this.ansImageExplainationText = this.questionData.specification.ansImageExplainationText;
        console.log("========>",this.setData.setId, this.setId)
     }else{
       this.$router.replace("/admin/create-question-set");
     }
  },
  data() {
    return {
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
          10:{label:'Ten', key:'J'}
      },
      ansValues:{},
      ansSet:[],
      isUploading: false,
      ansExplanationImage:null,
      ansImageExplainationText:null,
      chooseAns:false,
      selectAnsImage:false,
      dialog:false,
      setId:null,
      setTitle:null
    };
  },
  methods:{
    validate(form) {
      let values = [];
      switch (form) {
        case 'form1':
          this.form1Valid = false;
          values = ['title','questionType', 'discription'];
          if(this.questionType == 'Image Question'){
              values = ['title','questionType', 'discription', 'questionImage'];
          }
          break;
        case 'form2':
          this.form2Valid = false;
          values = ['ansType','ansSet', 'ansValues','ansImageExplainationText', 'selectedTag', 'selectedLevel'];
          break;
        case 'form3':
          this.form3Valid = false;
          values = ['points','selectedAns'];
          break;
        default:
          break;
      }
      return !this.checkDirty(values);
    },
    checkDirty(list){
      return list.find(x=>{
          if(typeof this[x] == 'object'){
            return  !this[x] || (Object.values(this[x]).length < 1 && !this[x] instanceof File);
          }else{
            return !this[x];
          }
      })
    },
    tabsChange(e){
      this.selectedTab = e;
      this.getQuestion();
    },
    goToEdit(e){
      console.log(e)
    },
    cloneQuestion(e){
      console.log(e)
    },
    goToCreateQuestion(e){
      console.log(e)
    },
    async getQuestion(){
      let query = {
        tags:this.tags,
        level:this.level,
        subject_id: this.selectedTab,
        "createdAt[$gte]": this.dates[0],
        "createdAt[$lte]": this.dates[1],
      }
      if(this.sort){
        switch (this.sort) {
          case 'Date Ascending':
            query = {
              ...query,
              "$sort[createdAt]": 1
            }
            break;
          case 'Date Descending':
            query = {
              ...query,
              "$sort[createdAt]": -1
            }
            break;
          case 'Status':
            query = {
              ...query,
              "$sort[status]": 1
            }
            break;
          default:
            break;
        }
      }
      let questions = await this.$api.questions.find(query);
      this.filteredQuestions = questions.data;
    },
    handleMultiSelect(name,value){
      switch (name) {
        case 'subject':
          this.selectedSubject = value;
          break;
        case 'tags':
          if(!this.selectedTag[value.value]){
            this.selectedTag = {...this.selectedTag,[value.value]:true};
          }else{
            this.selectedTag = {...this.selectedTag,[value.value]:false};
          }
          break;
        case 'level':
          this.selectedLevel = value;
          break;
        default:
          break;
      }
      
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
      if(this.screen == 1 && this.questionType == 'Image Question' && this.questionImage && !this.questionImage?.url){
        this.questionImage = await this.uploadToServer(this.questionImage);
      }else if(this.screen == 2 && this.ansType == 'Image Answer'){
        this.ansValues = await this.uploadAnsImages();
        // this.selectedAns = null;
        // this.chooseAns = !this.selectedAns?.url;
        // this.selectAnsImage = this.selectedAns?.url;
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
    removeOption(idx){
      let key = this.ansSet.splice(idx, 1);
      this.$set(this.ansValues, key[0].key, null);
      delete this.ansValues[key[0].key];
    },
    addOption(){
      let n =  this.ansSet.length + 1;
      let i = 1;
      if(this.ansSet.length < 10){
        while (this.ansSet.length < n) {
          const key = this.ansKeys[i];
          if(!this.ansValues.hasOwnProperty(key.key)){
            this.ansSet = [...this.ansSet,key];
            this.ansValues[key.key] = null; 
          }
          i++;
        }
      }
    },
    async submit(type){
        let data = {
            id:this.id,
            title:this.title,
            subject_id:this.selectedSubject.id,
            tags: Object.keys(this.selectedTag).join(", "),
            level: this.selectedLevel.value,
            status: type,
            type_id: 2, // for MCQ question type id will be 2
            points: this.points,
            set_id:this.setId,
            is_active : this.is_active,
            subscriber_only : this.subscriber_only,
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
            }),
        }
        let rsp = await this.$api.questions.update(this.id, data);
        if(rsp && rsp.id){
          this.onSubmit(rsp);
        }
    },
    uploadCallback(){
      this.isUploading = false;
      this.screen += 1;
    },
    async uploadToServer(file){
      const formData = new FormData();
      formData.append("attachment", file, "MyFileName");
      const upload = await this.$api.uploads.create(formData);
      const { url, id, filename} = upload;
      return { url, id, filename};
    },
    openSelectImagePopup(value){
      if(value === 'Image Answer'){
        this.chooseAns = false
        this.selectAnsImage = true;
        this.dialog = true;
      }else{
        this.chooseAns = true
        this.selectAnsImage = false;
      }
    },
    ...mapMutations({
      addQuestionSetData: "questionSet/addQuestionSetData",
      addQuestionData: "questionSet/addQuestionData"
    }),
    ...mapActions({
      manageSetData: "questionSet/manageSetData",
    }),
    selectAns(ans){
      this.selectedAns = ans;
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


