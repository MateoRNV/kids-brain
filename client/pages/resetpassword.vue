<template>
  <v-container grid-list-md text-xs-center mt-15>
    <v-layout align-center justify-center row fill-height>
      <v-flex>
        <v-form ref="form" lazy-validation>
          <div class="heading">
            <h1>Create New Password</h1>
            <p class="blockquote text-center">
              your password must be different from <br />
              different user passwords.
            </p>
          </div>
          <v-text-field
            v-model="password"
            label="Password"
            id="password"
            required
            outlined
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="confrimPassword"
            label="Confirm Password"
            id="confirmPassword"
            required
            outlined
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <v-flex>
            <v-btn id="reset" color="primary" class="btn" @click="submit"
              >RESET PASSWORD</v-btn
            >
          </v-flex>
        </v-form>
      </v-flex>
      <v-divider vertical></v-divider>
      <v-flex class="kid-flex-item reset-avatar">
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
</template>


<script>
export default {
  data() {
    return {
      resetToken: "",
      password: "",
      confrimPassword: "",
      passwordRegex: /(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^0-9]*[0-9])/,
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 8) || "Password must be minimum 8 characters long",
        (v) =>
          (v && v.length <= 14) ||
          "Password must be maximum 14 characters long",
        (v) =>
          (v && this.passwordRegex.test(v)) ||
          "Password must be alpha-numeric characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          v === this.password ||
          "Password and confirm password does not match.",
      ],
      showPassword: false,
      showConfirmPassword: false,
      snackbar: false,
      snackbarText: "Reset code is invalid",
      snackbarTimeout: 2000,
    };
  },
  async mounted() {
    let resetCode = this.$route.query.code;

    try {
      let response = await this.$api.forgotPassword.find({
        resetToken: resetCode,
      });
      if (response && response.code === 200) {
        this.resetToken = resetCode;
      }
    } catch (err) {
      this.snackbar = true;
     //  this.$router.replace("/forgotpassword");
    }
  },
  computed: {},
  methods: {
    async submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        try {
          let request = {
            resetToken: this.resetToken,
            newPassword: this.password,
          };
          let response = await this.$api.forgotPassword.patch(
            this.resetToken,
            request
          );
          if (response && response.code === 200) {
            this.$router.replace("/login");
          }
        } catch (err) {
          this.snackbar = true;
          // this.$router.replace("/login");
        }
      }
    },
  },
};
</script>

<style scoped>
.heading {
  margin-bottom: 30px;
  display: inline-block;
  text-align: center;
  width: 100%;
}

.kid-flex-item {
  justify-content: flex-end;
}

.kidImg {
  width: 450px;
  height: 350px;
}

.btn {
  width: 100%;
  border-radius: 8px;
  height: 45px !important;
}
.reset-avatar {
  border-left: 1px grey solid;
  margin-left: 50px;
}
</style>