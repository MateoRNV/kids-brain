<template>
  <v-app>
    <v-main>
      <v-dialog
      v-model="dialog"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="headline">
          Please veify your email
        </v-card-title>
        
        <v-spacer></v-spacer>
        
        <v-card-text>
          Click on link that we have send to you over email to verify email.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" class="mr-4" @click="resendLink">Resend</v-btn>

          <v-btn v-if="closable"
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-row no-gutters class="header pb-10">
        <v-col md="8" class="transparent">
          <v-card class="transparent mx-2" outlined tile>
            <a href="/admin/questionSets"> <img src="~/assets/images/logo.png" /></a>
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
            <v-row align="center" justify="space-around">
              <v-btn color="primary" class="mr-4 mb-4" @click="logout"> Logout </v-btn>
            </v-row>
            <!-- <v-avatar color="red rounded-circle" size="32" @click="logout">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar> -->
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
  middleware: ["auth", "admin-only"],
  data: () => ({
    dialog: false,
    closable: true,
    selectedItem: 0,
    items: [
      // { text: "Question Bank", icon: "help_outline", url: "/admin/questions" },
      { text: "Question Sets Bank", icon: "help_outline", url: "/admin/questionSets" },
      { text: "Create Question Sets", icon: "help_outline", url: "/admin/create-question-set" },
      { text: "Dashboard", icon: "dashboard" },
      {
        text: "Question Of The Day",
        icon: "chat_bubble_outline",
      },
      { text: "My levels", icon: "chat_bubble_outline" },
      { text: "My plans", icon: "people" },
      { text: "Setting", icon: "settings" },
      { text: "Help", icon: "help" },
      { text: "FAQ", icon: "question_answer" },
    ],
  }),
  mounted() {
    if (!this.$auth.user.email_verified) {
      // this.$router.replace("/varify-email");
      this.dialog = true;

      let currDate = new Date();
      let userCreationDate = new Date(this.$auth.user.createdAt);
      
      const timeDiff = Math.abs(userCreationDate.getTime() - currDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

      if( diffDays > 7) {
        this.closable = false;
      }
    }
  },
  methods: {
    resendLink(){
      this.$api.notify.sendVarificationMail({email:this.$auth.user.email}).then(rsp =>{
        this.snackbarText = rsp.message;
        this.snackbar = true;
        this.dialog = false;
        // alert(rsp.message)
      });
    },
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