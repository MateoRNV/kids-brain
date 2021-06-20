<template>
  <div class="create-question">
      <SelectQuestionType v-if="!this.questionType" :onSubmit="addQuestionType" />
      <CreateMCQQuestion :handlePrevious="() => this.questionType = null" :key="this.$route.query.setId" :onSubmit="onCreateQuestion" :setData="setData" v-if="this.questionType && this.questionType.id === 2" />
      <CreateFillInTheBlankQuestion :key="this.$route.query.setId" :onSubmit="onCreateQuestion" :setData="setData" v-if="this.questionType && this.questionType.id === 7" />
      <CreateMatchTheFollowingOneToOne :key="this.$route.query.setId" :onSubmit="onCreateQuestion" :setData="setData" v-if="this.questionType && this.questionType.id === 3" ></CreateMatchTheFollowingOneToOne>
      <CreateMatchTheFollowingOneToMany :key="this.$route.query.setId" :onSubmit="onCreateQuestion" :setData="setData" v-if="this.questionType && this.questionType.id === 4" ></CreateMatchTheFollowingOneToMany>
  </div>
</template>
<script>
import CreateMCQQuestion from '../../components/MCQ/createMCQQuestion';
import CreateFillInTheBlankQuestion from '../../components/FillInTheBlank/createFillInTheBlankQuestion.vue';
import SelectQuestionType from '../../components/selectQuestionType';
import CreateMatchTheFollowingOneToOne from '../../components/MatchTheFollowingTypes/createMatchTheFollowingOneToOne';
import CreateMatchTheFollowingOneToMany from '../../components/MatchTheFollowingTypes/createMatchTheFollowingOneToMany';
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";


export default {
  layout: "admin",
  components: {CreateMCQQuestion, CreateFillInTheBlankQuestion, SelectQuestionType, CreateMatchTheFollowingOneToOne, CreateMatchTheFollowingOneToMany},
  async mounted() {
     if(this.$route.query.setId){
        let subjects = await this.$api.subjects.getAll();
        this.subjects = subjects.data;
        this.setId = this.$route.query.setId;
        if(!this.questionSetData[this.$route.query.setId] || !this.questionSetData[this.$route.query.setId].id){
           let questionSet = await this.$api.questionSets.get(this.$route.query.setId);
            if(questionSet && questionSet.id){
            this.setData.setId = questionSet.id;
            this.setData.setTitle = questionSet.set_name
            this.setData.selectedSubject = this.subjects.find(x => x.id == questionSet.subject_id);
            this.setData.selectedTag  = questionSet.tags.split(', ')
            this.setData.selectedLevel = {value : questionSet.level, text:questionSet.level};
            let questions = await this.$api.questions.find({set_id:questionSet.id});
            this.addQuestionSetData({...questionSet,screen:2});
            this.selectedQuestions = questions.data.map(x=>{
              x.specification = JSON.parse(x.specification);
              this.addQuestionData(x);
              return x;
            });
            }else{
              this.$router.replace("/admin/create-question-set");
            }
        }else{
          this.setData.setTitle = this.questionSetData[this.setId].set_name;
          this.setData.setId = this.questionSetData[this.setId].id;
          this.setData.selectedSubject = this.subjects.find(x => x.id == this.questionSetData[this.setId].subject_id);
          this.setData.selectedTag = this.questionSetData[this.setId].tags.split(', ')
          this.setData.selectedLevel = {value : this.questionSetData[this.setId].level, text:this.questionSetData[this.setId].level};
        }
     }else{
       this.$router.replace("/admin/create-question-set");
     }
  },
  data() {
    return {
      questionType:null,
      setData:{
        setTitle:null,
        setId:null,
        selectedSubject:{},
        selectedTag:[],
        selectedLevel:{}
      }
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
    onCreateQuestion(rsp){
      this.$router.replace(`/admin/create-question-set?id=${this.setData.setId}`);
    }
  },
  computed: {
    ...mapGetters({
      questionSetData: "questionSet/getQuestionSetData",
    }),
  }
};
</script>
