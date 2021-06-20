<template>
  <div>
    <v-container fluid mt-15>
      <v-layout row wrap v-if="!resetPassword">
        <v-flex xs12 class="text-center" mt-5>
          <h1>Reset Password</h1>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
          <blockquote class="blockquote text-center">
            Enter the email associated with your account and we will <br />
            send an email with instructions to reset your password.
          </blockquote>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3 class="text-center">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            outlined
            label="Enter your email id."
            id="email"
            type="email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            required
          ></v-text-field>
          <v-btn
            id="sendEmail"
            min-width="50%"
            color="primary"
            @click="submitForm"
            >SEND</v-btn
          >
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
      <v-layout row wrap v-if="resetPassword">
        <v-flex class="flex text-center xs12 mt-5">
          <img class="emailboximg" src="~/assets/images/emailbox.png" />
        </v-flex>
        <v-flex xs12 class="text-center" mt-5>
          <h1>Check your mail</h1>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
          <p class="blockquote text-center">
            We have send a password recover instructions <br />
            to your email.
          </p>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3 class="text-center d-none">
          <v-btn id="openmail" min-width="50%" color="primary"
            >OPEN EMAIL</v-btn
          >
        </v-flex>
        <v-flex xs12 class="text-center d-none" mt-15>
          <span>Skip, I'll confirm later</span>
        </v-flex>
        <v-flex xs12 class="text-center" mt-15>
          <span
            >Didn't receive the email? check your spam folder, <br />
            or
          </span>
          <a id="tryanotheremail" @click="anotherEmail"
            >try another email address</a
          >
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      resetPassword: false,
      email: "",
      snackbar: false,
      snackbarText: "User not registered",
      snackbarTimeout: 2000,
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  validations: {
    email: { required, email },
  },
  methods: {
    anotherEmail() {
      this.email = "";
      this.resetPassword = false;
    },
    async submitForm() {
      
      this.$v.$touch();
      if (!this.$v.$error) {
        try {
          const req = { email: this.email };
          let response = await this.$api.forgotPassword.create(req);

          console.log(response);
          if (response.code == 201) {
            this.resetPassword = true;
          }
        } catch (err) {
          this.snackbar = true;
        }
      }
    },
  },
};
</script>

<style>
.emailboximg {
  width: 228px;
  background: rgba(68, 131, 237, 0.16);
  border-radius: 40px;
  padding: 25pt;
}
</style>