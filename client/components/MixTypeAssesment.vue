<template>
  <v-container>
    <h3 for="" class="mb-3 ">Please select One option</h3>
    <div v-for="(item, resultIndex) in questionList" class="questions__result" :key="`questions__result_${resultIndex}`">
        <MCQSingleChoice :reset="reset" :disable="!!disableAll" :seq="(resultIndex+1)" :question="item" :showAns="true" :onChangeCallback="onChange" />
    </div>
    <v-btn v-if="!this.submitted" color="success" class="mr-4" @click="onSubmit">{{'Submit'}}</v-btn>
    <v-btn v-if="this.submitted && !this.passed" color="success" class="mr-4" @click="retry">{{'Retry'}}</v-btn>
    <v-btn v-if="this.passed" color="success" class="mr-4" @click="goNext">Go To Next Level </v-btn>
  </v-container>
</template>

<script>
import MCQSingleChoice from './MCQ/MCQSingleChoice';
export default {
  name: 'MixTypeAssesment',
  props: ['questionList','submitCallback','showAnsOnComplete', 'onRetry', 'onGoNext', 'passed'],
  data () {
    return{
      column: {},
      row: {},
      showAns: false,
      submitted: false,
      nextLevel: false,
      disableAll : false,
      reset:false
    }
  },
  methods: {
    onSubmit(e) {
        let result = JSON.parse(JSON.stringify(this.row));
        if(this.showAnsOnComplete){
            this.showAns = true;
        }
        this.submitCallback(result);
        this.disableAll = true;
        this.submitted = !this.submitted
    },
    retry(){
      this.row = {};
      this.showAns= false;
      this.submitted= false;
      this.nextLevel= false;
      this.onRetry();
      this.disableAll = false;
      this.reset = !this.reset;
    },
    goNext(){
      this.onGoNext();
    },
    onChange(question, ans){
        this.row[question.id] = ans;
    }
  },
};
</script>
<style lang="scss">
.questions__result{
    border: 1px solid #cccccc;
    padding: 10px 15px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>