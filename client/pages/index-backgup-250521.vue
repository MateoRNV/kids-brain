<template>
    <!-- <h3>Hello welcome to braingym</h3> -->
    <div class="app">
        <div class="body">
          <v-row v-if="!dob" class="date-of-birth">
            <v-row>
              <h3>Please select your date of birth</h3>
            </v-row>
            <v-row>
              <v-date-picker
                v-model="dob"
                class="mt-4"
                @change="this.onDobChange"
                :max="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-row>
          </v-row>
          <div v-if="this.dob" class="question-box">
            <MixTypeAssesment 
              :questionList="this.questionList" 
              :submitCallback="this.onSubmitAns" 
              :showAnsOnComplete="true"
              :passed="this.passed"
              :onRetry="this.retry"
              :onGoNext="this.goToNextLevel"
            ></MixTypeAssesment>
          </div>
        </div>
        <div v-if="$auth.user && $auth.user.role == 'Parent'" class="right-nav">
          <div class="label pa-5">
            <h3>Create child account</h3>
          </div>
          <CreateAccount v-if="this.showCreateAccountForm" userType="Student" :onSubmitCallback="this.onCreateAccount" :parentId="$auth.user.id"/>
          <p v-if="!this.showCreateAccountForm && this.accountCreatedMessage">Please check <span class="email">{{this.childEmail}}</span> and kindly varify account </p>
          <v-btn color="success" class="account-from-button" @click="toggleAccountForm">{{this.showCreateAccountForm ? 'Close':'Create Now'}}</v-btn>
        </div>
    </div>
</template>
<style lang="scss">
  .app{
    display: flex;
    padding: 15px;
    .right-nav{
        width: 400px;
        position: fixed;
        right: 0px;
        height: 100%;
        top: 0px;
        box-shadow: 0 0 10px 0 rgb(21 18 18 / 49%);
        text-align: center;
        padding: 10px;
        .account-from-button{
        display: flex;
        margin: auto;
        margin-top: 15px;
        }
        >p{
        color:red;
        font-size: 1rem;
        font-weight: 500;
        .email{
            color: #000000;
        }
        }
    }
    .date-of-birth{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .body{
      .row{
        margin:0px;
      }
    }
  }
</style>
<script>
import MixTypeAssesment from '../components/MixTypeAssesment';
import CreateAccount from '../components/createAccount';
export default {
  questionList: [],
  data () {
    return{
      questionList: this.questionList,
      column: {},
      row: {},
      dob:null,
      passed:false,
      currentLevel: 1,
      accountCreatedMessage: false,
      showCreateAccountForm:false,
      childEmail : null
    }
  },
  methods:{
    created(){
      
    },
    onSubmitAns(ans){
      console.log("=======>",ans)
    },
    goToNextLevel(){
      this.getQuestions({
          subscriber_only: 0,
          $limit: 10,
          level: this.currentLevel
      });
    },
    retry(){
      this.getQuestions({
          subscriber_only: 0,
          $limit: 10,
          level: this.currentLevel
      });
    },
    getQuestions(query){
      this.$api.questions.find(query).then(x=>{
        this.questionList = x.data.map(x=>{
          x.specification = JSON.parse(x.specification);
          return x;
        })
      })
    },
    onDobChange(){
      let d1 = new Date(this.dob).getFullYear();
      let d2 = new Date().getFullYear()
      this.$api.ageLevels.find({
        age: d2 - d1,
        $limit: 1
      }).then(x=>{
        if(x.data && x.data[0] && x.data[0].level){
          this.currentLevel = x.data[0].level
        }
        this.getQuestions({
            subscriber_only: 0,
            $limit: 10,
            level: this.currentLevel
        });
      })
    },
    onCreateAccount(data){
      this.childEmail = data.email;
      this.accountCreatedMessage = true;
      this.showCreateAccountForm = false;
    },
    toggleAccountForm(){
      this.showCreateAccountForm = !this.showCreateAccountForm;
      this.accountCreatedMessage = false;
      this.childEmail = null;
    }
  }
}
</script>
