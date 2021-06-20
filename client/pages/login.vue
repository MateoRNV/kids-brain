<template>
  <v-container class="container" grid-list-md text-xs-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex class="login-form"> 
        <div class="heading">
          <div class="wel-msg">Welcome Back!Log In</div>
          <div class="sub-heading">Enter your email and password</div>
        </div>
        <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="Enter your email id."
        required
        outlined
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        @keyup.enter.native="login"
        ></v-text-field>

        <v-text-field
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          :error-messages="passwordErrors"
          label="Enter your password"
          :type="showPassword ? 'text' : 'password'"
          required
          outlined
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          @click:append="showPassword = !showPassword"
          @keyup.enter.native="login"
        ></v-text-field>
        <a class="forgot-pass" @click="gotoForgotPassword()">Forgot password?</a>
        <v-flex>
          <v-btn color="primary" class="loginBtn" @click="login"> Login </v-btn>
        </v-flex>
        <v-flex class="signup-div">
            Don't have an account? <a @click="gotoSignup()">signup</a>
          </v-flex>
        <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
          {{ snackbarText }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-flex>
      <v-flex class="login-avatar">
        
        <inline-svg 
            :src="require('~/assets/images/loginAvatar.svg')"
            width="400" 
            height="400"
            aria-label="Login Avatar"
        ></inline-svg>
        <!-- <img class="kidImg" src="~/assets/images/SignUpKid.png" /> -->
      </v-flex>
    </v-layout>
    
  </v-container>
</template>

<script>
import InlineSvg from 'vue-inline-svg';


import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: {
    InlineSvg
  },

  data() {
    return {
      submitted: false,
      email: "",
      password: "",
      showPassword: false,
      snackbar: false,
      snackbarText: "Username/Password incorrect.",
      snackbarTimeout: 2000,
    };
  },
  computed: {
    emailErrors() {
      if(this.submitted) {
         const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push("Must be valid e-mail");
        !this.$v.email.required && errors.push("E-mail is required");
        return errors;
      }
    },
    passwordErrors() {
      if(this.submitted) {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.password.required && errors.push("Password is required");
        return errors;
      }
    },
  },
  validations: {
    email: { required, email },
    password: { required },
  },
  mounted() {
    if (this.$auth.loggedIn) this.redirectUser();
  },
  methods: {
    gotoSignup() {
      this.$router.replace("/signup");
    },
    gotoForgotPassword() {
        this.$router.replace("/forgotpassword");
    },
    async login() {
      this.submitted = true;

      this.$v.$touch();
      if (!this.$v.$error) {
        try {
          await this.$auth.loginWith("local", {
            data: {
              strategy: "local",
              email: this.email,
              password: this.password,
            },
          });
          this.redirectUser();
        } catch (err) {
          if (err.response.status === 401) {
            this.snackbar = true;
          }
        }
      }
    },
    redirectUser() {
      const { role } = this.$auth.user;
      switch (role) {
        case "Admin":
          this.$router.replace("/admin/questionSets");
          break;
        case "Parent":
          this.$router.replace("/parents");
          break;
      }
    },
  },
};
</script>
<style scoped>
.login-form {
  width:45%;
  padding-right: 80px !important;
}

.container {
  margin-top: 75px;;
}

.login-avatar {
  border-left: 1px grey solid;
  padding-left: 50px !important;
}


.heading {
  margin-bottom: 50px;
  display: inline-block;
  text-align: center;
  width: 100%;
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

.loginBtn {
  width: 100%;
  border-radius: 8px;
  height: 45px !important;
}

.forgot-pass {
  float: right;
  margin-bottom: 10px;
}

.signup-div {
  font-size: 1.4em;
  text-align: center;
  margin-top: 20px;
}
</style>