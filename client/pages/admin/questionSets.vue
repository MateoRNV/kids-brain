<template>
  <div>
    <QuestionSetList :exclude="[]" :createQuestionRequired="true" :editRequired="true" :cloneRequired="true" :deleteActionRequired="true" :deleteActionCallback="deleteQuestionSet" :archieveActionCallback="archieveQuestionSet" ></QuestionSetList>
    <v-snackbar :color="snackbarSuccess ? 'successDark':''" v-model="snackbar" :timeout="snackbarTimeout">
      <span >
        <v-icon v-if="snackbarSuccess">mdi-check-circle</v-icon>
        {{ snackbarText }}
      </span>
    </v-snackbar>
  </div>
</template>
<style lang="scss">
.question-set{
  .create-question{
      background: #FFFFFF;
      border: 1px solid #4483ED;
      box-sizing: border-box;
      box-shadow: 0px 12px 8px rgb(68 131 237 / 12%);
      border-radius: 100px;
      color: #4483ED!important;
  }
  .status{
    padding: 5px 20px;
    border-radius: 5px;
  }
}
</style>
<script>
import QuestionSetList from '../../components/questionSetList';
export default {
  layout: "admin",
  filteredSets:[],
  allQuestions:[],
  subjects: [],
  async mounted() {
   this.getQuestionSets();
  },
  data() {
    return {
      filteredSets: this.filteredSets,
      headers: [
          {text:"Id", value: "id", sortable: false},
          {text:"Set Name", value: "set_name", sortable: false},
          {text:"Created", value: "createdAt", sortable: false},
          {text:"Modified", value: "updatedAt", sortable: false}
        ],
        sortOptions: ['Date Ascending', 'Date Descending','Status'],
        sort:null,
        filters:null,
        dates: [],
        tags:null,
        snackbar: false,
        snackbarText: "Username/Password incorrect.",
        snackbarTimeout: 2000,
        snackbarSuccess: false
    };
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
  },
  methods:{
    goToEdit(e){
      
    },
    cloneQuestion(e){
      console.log(e)
    },
    goToCreateQuestion(e){
      console.log(e)
    },
    async getQuestionSets(){
      let query = {
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
      let sets = await this.$api.questionSets.find(query);
      this.filteredSets = sets.data;
    },
    clearFilters(){
      this.tags = null;
      this.dates = [];
      this.sort = null;
      this.getQuestion();
    },
    deleteQuestionSet(id){
      this.$api.questionSets.delete(id);
      this.snackbarText = "Question set deleted successfully!";
      this.snackbar = true;
    },
    archieveQuestionSet(id){
      this.$api.questionSets.patch(id,{status:'Archived'});
      this.snackbarText = "Question set Archived successfully!";
      this.snackbar = true;
    }
  }
};
</script>


