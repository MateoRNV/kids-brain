<template>
  <v-container>
    <div v-if="isVerified" class="title">
      Congratulations!! Your Email has been verified. Click <a href="javascript:void(0)" @click="login">here</a> to Login.
    </div>
    <!-- <h3>Hello {{ $auth.user.first_name }}</h3>
    <div v-if="!$auth.user.email_verified">
      <p>Please varify your email</p>
      <v-btn color="primary" class="mr-4" @click="resendLink">Resend varification link </v-btn>
    </div>
    <v-row align="center" justify="space-around">
      <v-btn color="primary" class="mr-4" @click="logout"> Logout </v-btn>
    </v-row> -->
  </v-container>
</template>

<script>
import md5 from 'js-md5';
export default {
  middleware: ["auth"],
  data() {
    return {
      isVerified: false
    }
  },
  mounted() {
    if (!this.$auth.loggedIn){
        this.$router.replace("/login");
    } else if(this.$route.query.appcode){
        var md5sum = md5(this.$auth.user.email);
        if(md5sum !== this.$route.query.appcode){
            alert("invalid auth token")
            this.$auth.logout();
            this.$router.replace("/");
        }else{
            this.verifyUser();
        }
    }
  },
  methods: {
    async verifyUser() {
      console.log('Doing verifyuser');
      await this.$api.users.patch(this.$auth.user.id, {email_verified:true});
      this.isVerified = true;
      this.$auth.fetchUser();
    },
    async login() {
      if (this.$auth.loggedIn){
        this.$router.replace("/parents");
      } else {
        this.$router.replace("/login");
      }
    },
    resendLink(){
      this.$api.notify.sendVarificationMail({email:this.$auth.user.email}).then(rsp =>{
        alert(rsp.message)
      });
    },
    logout() {
      this.$auth.logout();
      this.$router.replace("/");
    }
  },
};
</script>
<style scoped>
.title {
  font-size: 1.5em !important;
  text-align: center;
}
</style>
