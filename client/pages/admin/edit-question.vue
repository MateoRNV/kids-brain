<template>
  <div class="create-question">
      <EditMCQQuestion :subjects="subjects" :key="this.$route.query.setId" :questionData="questionData" :onSubmit="onEditSuccess" :setData="setData" v-if="questionData.type_id && questionData.type_id === 2" />
      <EditFillInTheBlankQuestion :subjects="subjects" :key="this.$route.query.setId" :questionData="questionData" :onSubmit="onEditSuccess" :setData="setData" v-if="questionData.type_id && questionData.type_id === 3" />
      <CreateMatchTheFollowingOneToOne :isCloned="isCloned" :subjects="subjects" :key="this.$route.query.setId" :questionData="questionData" :onSubmit="onEditSuccess" :setData="setData" v-if="questionData.type_id && questionData.type_id == 3" />
      <CreateMatchTheFollowingOneToMany :isCloned="isCloned" :subjects="subjects" :key="this.$route.query.setId" :questionData="questionData" :onSubmit="onEditSuccess" :setData="setData" v-if="questionData.type_id && questionData.type_id == 4" />
  </div>
</template>
<script>
import EditMCQQuestion from '../../components/MCQ/editMCQQuestion';
import EditFillInTheBlankQuestion from '../../components/FillInTheBlank/editFillInTheBlankQuestion';
import CreateMatchTheFollowingOneToOne from '../../components/MatchTheFollowingTypes/createMatchTheFollowingOneToOne';
import CreateMatchTheFollowingOneToMany from '../../components/MatchTheFollowingTypes/createMatchTheFollowingOneToMany';
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  layout: "admin",
  components:{
    EditMCQQuestion,
    EditFillInTheBlankQuestion,
    CreateMatchTheFollowingOneToOne,
    CreateMatchTheFollowingOneToMany
  },
  async mounted() {
     if(this.$route.query.setId && this.$route.query.questionId && this.$route.query.questionId != 'undefined'){
        let subjects = await this.$api.subjects.getAll();
        this.subjects = subjects.data;
        this.setId = this.$route.query.setId;
        if(!this.questionSetData[this.$route.query.setId] || !this.questionSetData[this.$route.query.setId].id){
           let questionSet = await this.$api.questionSets.get(this.$route.query.setId);
            if(questionSet && questionSet.id){
              this.setData.setId = this.$route.query.setId;
              this.setData.setTitle = questionSet.set_name
              this.setData.selectedSubject = this.subjects.find(x => x.id == questionSet.subject_id);
              this.setData.selectedTag  = questionSet.tags.split(', ')
              this.setData.selectedLevel = {value : questionSet.level, text:questionSet.level};
              this.addQuestionSetData({...questionSet,screen:2});
            }else{
              this.$router.replace("/admin/create-question-set");
            }
        }else if(this.questionSetData?.[this.setId]?.Questions?.[this.$route.query.questionId]){
          this.setData.setTitle = this.questionSetData[this.setId].set_name;
          this.setData.selectedSubject = this.subjects.find(x => x.id == this.questionSetData[this.setId].subject_id);
          this.setData.selectedTag = this.questionSetData[this.setId].tags.split(', ')
          this.setData.selectedLevel = {value : this.questionSetData[this.setId].level, text:this.questionSetData[this.setId].level};
        }
        this.setData.setId = this.$route.query.setId;
        let question = await this.$api.questions.get(this.$route.query.questionId);
        question.specification = JSON.parse(question.specification);
        question.set_id = this.setData.setId;
        this.questionData = question;
     }else{
       this.$router.replace("/admin/create-question-set");
     }
    if(this.$route.query.isClone && this.$route.query.isClone == 'true'){
      this.isCloned = true;
      this.clonedId = this.$route.query.questionId;
    }

  },
  data() {
    return {
      isCloned : false,
      clonedId: null,
      questionType:null,
      setData:{
        setTitle:null,
        setId:null,
        selectedSubject:{},
        selectedTag:[],
        selectedLevel:{},
      },
      questionData:{}
    };
  },
  methods:{
    addQuestionType(type){
      this.questionType = type;
    },
    ...mapMutations({
      addQuestionSetData: "questionSet/addQuestionSetData",
      addQuestionData: "questionSet/addQuestionData"
    }),
    ...mapActions({
      manageSetData: "questionSet/manageSetData",
    }),
    onEditSuccess(rsp){
      this.$router.replace(`/admin/create-question-set?id=${this.setId}&&isEditSuccess=${this.clonedId || rsp.id }&&isCloned=${this.isCloned}`);
    }
  },
  computed: {
    ...mapGetters({
      questionSetData: "questionSet/getQuestionSetData",
    }),
  }
};
</script>
