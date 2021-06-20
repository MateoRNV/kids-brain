<template>
  <v-container class="container" grid-list-md text-xs-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex class="login-signup-btn"> 
        <div class="heading">
          <div class="wel-msg">Welcome to</div>
          <div class="wel-msg">Braingym Jr.</div>
          <!-- <div class="sub-heading">Quisque a pulvinar quam. In vitae arcu consequat</div> -->
        </div>
        
        <v-flex>
          <v-btn color="blue" class="loginBtn" @click="login">ALREADY HAVE AN ACCOUNT? LOGIN </v-btn>
        </v-flex>
        <v-flex>
          <v-btn color="#1A448B" class="signUpBtn" @click="signup"> NEW HERE? SIGNUP </v-btn>
        </v-flex>
      </v-flex>
      <v-flex class="home-avatar">
        <inline-svg 
            :src="require('~/assets/images/loginAvatar.svg')"
            width="400" 
            height="400"
            aria-label="Home Avatar"
        ></inline-svg>
      </v-flex>
    </v-layout>
    
  </v-container>
</template>

<script>
import InlineSvg from 'vue-inline-svg';

export default {
  components: {
    InlineSvg
  },
  methods: {
    async login() {
      this.$router.replace("/login");
    },
    signup() {
      this.$router.replace("/signup");
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 75px;;
}

.login-signup-btn {
  width:45%;
  padding-right: 80px !important;
}

.heading {
  margin-bottom: 50px;
  display: inline-block;
  text-align: center;
  width: 100%;
}


.home-avatar {
  border-left: 1px grey solid;
  padding-left: 50px !important;
}

.wel-msg {
  font-size: 40px;
  line-height: 50px;

  text-align: center;

  color: #2C2C2C;
}

.sub-heading {
  font-size: 16px;
  line-height: 15px;

  text-align: center;

  color: #7C7C7C;
}

.kidImg {
  width: 450px;
  height: 300px;
  padding-left: 100px;
}

.loginBtn, .signUpBtn {
  width: 100%;
  border-radius: 8px;
  height: 60px !important;
  font-size: 1.3em;
  color: white;
}


.forgot-pass {
  float: right;
  margin-bottom: 10px;
}

</style>