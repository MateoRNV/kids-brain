<template>
    
  <v-form ref="form" v-model="valid" lazy-validation>
      <v-container class="container" grid-list-md text-xs-center>
      <v-layout align-center justify-center row fill-height>
        <v-flex class="signup-form">
          <div class="heading">
            <div class="wel-msg">Sign Up</div>
            <!-- <div class="sub-heading"> Quisque a pulvinar quam. In vitae arcu consequat</div> -->
          </div>
          <v-text-field
            v-model="parent_name"
            label="Parent name"
            :error-messages="nameErrors"
            required
            outlined
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Sign up with your Email"
            :error-messages="emailErrors"
            required
            outlined
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-row class="phone-details-container">
            <v-select class="country-code"
              :items="countries"
              label="Code"
              :error-messages="codeErrors"
              v-model="countryCode"
              outlined
              @input="$v.countryCode.$touch()"
              @blur="$v.countryCode.$touch()"
            ></v-select>
              
            <v-text-field
              class="mobile_number"
              v-model="phone_number"
              label="Phone number"
              :error-messages="phoneErrors"
              required
              outlined
              @input="$v.phone_number.$touch()"
              @blur="$v.phone_number.$touch()"
            ></v-text-field>
          </v-row>
          <v-text-field v-if="false"
            v-model="referal_code"
            label="Use referal code(optional)"
            outlined
          ></v-text-field>

          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="password"
            label="Password"
            :error-messages="passwordErrors"
            :type="showPassword ? 'text' : 'password'"
            required
            outlined
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            :append-icon="confPassword ? 'mdi-eye' : 'mdi-eye-off'"
            v-model="repeatPassword"
            :error-messages="confPasswordErrors"
            label="Confirm Password"
            :type="confPassword ? 'text' : 'password'"
            required
            outlined
            @input="$v.repeatPassword.$touch()"
            @blur="$v.repeatPassword.$touch()"
            @click:append="confPassword = !confPassword"
          ></v-text-field>
          <v-flex>
            <v-btn color="primary" class="signUpBtn" :disabled="!valid"  @click="onSubmit">
              Sign Up
            </v-btn>
          </v-flex>
          <v-flex class="already-login">
            Already have an account? <a @click="gotoLogin()">login</a>
          </v-flex>
        </v-flex>
        <v-flex class="signup-avatar">
          <img class="kidImg" src="~/assets/images/SignUpKid.png" />
        </v-flex>

        <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
          {{ snackbarText }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-layout>
      
    </v-container>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, sameAs, minLength, maxLength, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex('alpha', /^[a-zA-Z ]*$/)

export default {
  mixins: [validationMixin],
  name: 'CreateAccount',
  props: ['userType', 'displayRow', 'parentId'],
  data () {
      return {
          dialog: false,
          isSuccess: true,
          submitted: false,
          valid: false,
          showPassword: false,
          confPassword: false,
          parent_name: "",
          referal_code: "",
          phone_number: null,
          countryCode: null,
          countries: [],
          email: "",
          password:null,
          repeatPassword:null,
          snackbar: false,
          snackbarText: "User already exist",
          snackbarTimeout: 2000
      };
  },
  async mounted() {
    let countries =  await this.$api.countries.getAll();
    for (let value of Object.values(countries.countries)) {
      this.countries.push(value['code'])
    }
  },
    
  validations: {
    parent_name: {required, alpha},
    email: { required, email },
    phone_number: { required,
       maxLength: maxLength(15)
    },
    countryCode: { required },
    // min 6 & max 16
    // 1 upper case, 1 lower case, 1 digit 
    password: { required ,
      minLength: minLength(8),
      maxLength: maxLength(16),
      valid: function(value) {
        const containsUppercase = /[A-Z]/.test(value)
        const containsLowercase = /[a-z]/.test(value)
        const containsNumber = /[0-9]/.test(value)
        // const containsSpecial = /[#?!@$%^&*-]/.test(value)
        return containsUppercase && containsLowercase && containsNumber
      }
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    nameErrors() {
      if (this.submitted) {
        const errors = [];
        if (!this.$v.parent_name.$dirty) return errors;
        !this.$v.parent_name.required && errors.push("Parent name is required");
        !this.$v.parent_name.alpha && errors.push("Invalid name");
        return errors;
      }
    },
    emailErrors() {
      if (this.submitted) {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push("Must be valid e-mail");
        !this.$v.email.required && errors.push("E-mail is required");
        return errors;
      }
    },
    phoneErrors() {
      if (this.submitted) {
        const errors = [];
        if (!this.$v.phone_number.$dirty) return errors;
        !this.$v.phone_number.required && errors.push("Phone number is required");
        !this.$v.phone_number.maxLength && errors.push("Maximum length exceed");
        return errors;
      }
    },
    codeErrors() {
      if (this.submitted) {
        const errors = [];
        if (!this.$v.countryCode.$dirty) return errors;
        !this.$v.countryCode.required && errors.push("Country code is required");
        return errors;
      }
    },
    passwordErrors() {
      if (this.submitted) {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.required && errors.push("Password is required");
        !this.$v.password.minLength && errors.push("Password must have atleast 8 letters");
        !this.$v.password.maxLength && errors.push("Password must have at most 16 letters");
        !this.$v.password.valid && errors.push("Password must contain 1 upper, 1 lower & 1 digit");
        return errors;
      }
    },
    confPasswordErrors() {
      if (this.submitted) {
        const errors = [];
        if (!this.$v.repeatPassword.$dirty) return errors;
        !this.$v.repeatPassword.required && errors.push("Confirm Password is required");
        !this.$v.repeatPassword.sameAsPassword && errors.push("Password is not identical");
        return errors;
      }
    }
  },
  methods: {
    gotoLogin() {
      this.$router.replace("/login");
    },
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    
    async onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        if(this.validate()) {
          console.log('Validate: '+this.validate());
          let dataToSubmit = {
            parent_name: this.parent_name,
            email: this.email,
            phone_number: this.phone_number,
            password: this.password,
            country_code: this.countryCode,
            role: 'Parent',
            email_verified: 0
          }
          try {
            let rsp = await this.$api.users.create(dataToSubmit);
            this.doAutoLogin();
          } catch (error) {
            this.snackbarText =  error.response.data.message;
            this.snackbar = true;
          }

        }
    },

    async doAutoLogin() {
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
    },
    redirectUser() {
      const { role } = this.$auth.user;
      switch (role) {
        case "Admin":
          this.$router.replace("/admin/questions");
          break;
        case "Parent":
          this.$router.replace({ name: 'parents', params: { newUser: true }});
          break;
      }
    }

  }
};
</script>


<style lang="scss">
.invalid-feedback {
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}

.signup-form {
  width:45%;
  padding-right: 80px !important;
}
.phone-details-container {
  margin: auto;
  flex: 0 0 auto;
}

.country-code {
  width: 120px !important;
  margin-right: 20px !important;
  flex: 0 0 auto;
}

.mobile_number {
  flex: 1 1 auto;
}

.container {
  margin-top: 10px;;
}

.signup-avatar {
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
  width: 550px;
  height: 500px;
}

.signUpBtn {
  width: 100%;
  border-radius: 8px;
  height: 45px !important;
}

.login-avatar {
  border-left: 1px grey;
  margin-left: 50px;
}
.already-login {
  font-size: 1.4em;
  text-align: center;
  margin-top: 20px;
}
            
</style>
