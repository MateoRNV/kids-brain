<template>
  <v-container>
    <h3>Hello {{ $auth.user.first_name }}</h3>
    <v-row align="center" justify="space-around">
      <v-btn color="primary" class="mr-4" @click="logout"> Logout </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "students",
  mounted() {
    console.log("============>",this.$auth.user.profile)
    if(!this.$auth.user.email_verified){
      this.$router.replace("/varify-email");
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.replace("/");
    }
  },
};
</script>
