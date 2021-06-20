<template>
  <div class="select-question-type">
      <div :class="['label',(!isValid && !selectedType && 'error-class')]">{{(selectedType ? types[selectedType].type : '1. Select the question type :')}}</div>
      <div class="radio-group">
            <v-radio-group v-model="selectedType" column class="d-flex align-center  justify-center text--h2">
                <v-row class="d-flex align-center justify-space-between pa-6">
                    <div >
                        <v-radio v-for="type in types1" :key="type.id"
                            :label="type.type"
                            class="pa-3"
                            :value="type.id"
                        ></v-radio>     
                        
                    </div>
                    <div >
                        <v-radio v-for="type in types2" :key="type.id"
                            :label="type.type"
                            class="pa-3"
                            :value="type.id"
                        ></v-radio>    
                    </div>
                </v-row>
            </v-radio-group>
      </div>
      <div class="btns">
            <v-btn  disabled>
                <v-icon>mdi-chevron-left-circle-outline</v-icon>
                &nbsp;PREVIOUS
            </v-btn>
            <v-btn @click="submit" class="primary">
                next&nbsp;
                <v-icon>mdi-chevron-right-circle-outline</v-icon>
            </v-btn>
        </div>
  </div>
</template>
<style lang="scss">
.select-question-type{
    width:100%;
    .label{
        background: #FFFFFF;
        border: 1px solid #9F9F9F;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px;
        color: #9F9F9F;
    }
    .radio-group{
        padding: 10px;
    }
    .error-class{
        border:1px solid red;
    }
}
</style>
<script>
export default {
  name: 'SelectQuestionType',
  props: ['onSubmit'],
  async mounted() {
    let type = await this.$api.questionTypes.getAll();
    type.data.forEach(element => {
        this.types[element.id] = element;
    });
    this.types1 = type.data.splice(0,(type.data.length/2))
    this.types2 = type.data;
  },
  data () {
    return{
        selectedType:null,
        isValid:true,
        types1:[],
        types2:[],
        types:[]
    }
  },
 
  methods: {
   submit(){
       this.isValid = false;
       if(this.selectedType){
           this.onSubmit(this.types[this.selectedType])
       }
   }
  },
};
</script>
