<template>
  <QuestionList :createQuestionRequired="true" :editRequired="true" :cloneRequired="true" :deleteActionRequired="true" :deleteActionCallback="deleteQuestions" >
    
  </QuestionList>
</template>
<style lang="scss">
  .delete-icon{
    border-radius: 50%;
    padding:8px;
  }
</style>
<script>
import QuestionList from '../../components/question-list';
export default {
  layout: "admin",
  data() {
    return {
    }
  },
  methods:{
    deleteQuestions(data){

    }
  }
};
</script>


