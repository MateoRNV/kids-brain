<template>
  <v-container>
    <v-row no-gutters class="header">
        <v-col md="8" class="transparent">
          <v-card class="transparent mx-2" outlined tile>
            <img src="~/assets/images/logo.png" />
          </v-card>
        </v-col>
        <v-col md="4" class="d-flex align-center justify-end transparent">
          <v-card
            class="mx-4"
            outlined
            tile
            color="transparent"
            style="border: none"
          >
            <span class="px-1"
              >{{ $auth.user.first_name }} {{ $auth.user.last_name }}</span
            >
            <!-- <v-avatar color="red rounded-circle" size="32" @click="logout">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar> -->
            <v-row align="center" justify="space-around">
              <v-btn color="primary" class="mr-4 mb-4" @click="logout"> Logout </v-btn>
          </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="under-cons">
        <h1>Page Under Construction...</h1>
      </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ["auth"],
  mounted() {
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
