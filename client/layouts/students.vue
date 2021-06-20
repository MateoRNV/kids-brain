<template>
  <v-app>
    <v-main>
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
            <v-avatar color="red rounded-circle" size="32" @click="logout">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters class="main-container">
        <v-col md="2">
          <v-card class="mx-auto" max-width="300" height="100%" tile>
            <v-list flat class="navigation-list-1">
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.url"
                  :nuxt="true"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col md="10" class="screen-container">
          <nuxt />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>
export default {
  middleware: ["auth", "students-only"],
  data: () => ({
    selectedItem: 0,
    items: [
      { text: "Question Bank", icon: "help_outline", url: "/admin/questions" },
      { text: "Dashboard", icon: "dashboard" },
      {
        text: "Question Of The Day",
        icon: "chat_bubble_outline",
      },
      { text: "My levels", icon: "chat_bubble_outline" },
      { text: "My plans", icon: "people" },
      { text: "Create Question", icon: "format_list_numbered" },
      { text: "Setting", icon: "settings" },
      { text: "Help", icon: "help" },
      { text: "FAQ", icon: "question_answer" },
    ],
  }),
  mounted() {
    if (!this.$auth.user.email_verified) {
      this.$router.replace("/varify-email");
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.replace("/");
    },
  },
};
</script>
<style scoped lang="scss">
.header {
  background: #fbfcfd;
  .searchbox {
    .v-input__slot {
      margin-bottom: 0 !important;
    }
  }
}

.main-container {
  height: calc(100% - 64px);
  .v-list-item__icon {
    margin: 10px 14px 10px 0 !important;
  }
  .screen-container {
    padding: 10px;
  }
}

.transparent {
  background-color: transparent !important;
  border-color: transparent !important;
}
</style>

<style>
html {
  font-size: 14px !important;
}
</style>