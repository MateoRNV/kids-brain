<template>
  <v-container>
    <div class="question" >
        <div>
            <span v-if="this.seq">{{this.seq}}:</span>
            <span>{{question.title}}</span>
        </div>
        <v-radio-group v-model="ans" row :disabled="!!ans || !!disable" @change="this.onChange">
            <v-radio 
                v-for="obj in question.specification.options"
                :key="obj"
                :label="obj" 
                :value="obj"
            ></v-radio>
        </v-radio-group>
        <v-icon v-if="showAns && ans && ans === question.specification.answer" color="green darken-2">mdi-checkbox-marked-circle</v-icon>
        <v-icon v-if="showAns && ans && ans!== question.specification.answer"  color="red darken-2">mdi-close-circle</v-icon>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'MCQSingleChoice',
  props: ['question', 'seq', 'showAns', 'onChangeCallback', 'disable', 'reset'],
  data () {
    return{
      ans: null,
    }
  },
  watch: { 
    reset: function(newVal, oldVal) { // watch it
      if(!oldVal && newVal){
        this.ans = null
      }
    }
  },
  methods: {
    onChange(){
      this.onChangeCallback(this.question, this.ans);
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