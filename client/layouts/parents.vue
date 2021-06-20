<template>
  <v-app>
    <v-main>
      <v-dialog
        v-model="isSuccess"
        max-width="500px"
        >
        <v-card>
          <div class="cong-model">
            <div class="outer-circle">
              <v-icon class="checked-icon" color="green darken-2">mdi-checkbox-marked-circle</v-icon>
            </div>
            <br>
            <p class="congo-text">
              Congratulations!!
            </p>
            <!-- <br> -->
            <p class="congo-subline">
              You have successfully created an Account.
            </p>
          </div> 
        </v-card>
      </v-dialog>  
      <v-dialog
      v-if="!isFirstLogin"
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
            <v-row align="center" justify="space-around">
              <v-btn color="primary" class="mr-4 mb-4" @click="logout"> Logout </v-btn>
          </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="under-cons">
        <h1>Page Under Construction...</h1>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
          {{ snackbarText }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      <!-- <v-row no-gutters class="main-container">
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
      </v-row> -->
    </v-main>
  </v-app>
</template>
<script>
export default {
  middleware: ["auth", "parents-only"],
  data: () => ({
    isSuccess: false,
    isFirstLogin: false,
    selectedItem: 0,
    dialog: false,
    closable: true,
    snackbar: false,
    snackbarText: "",
    snackbarTimeout: 2000,
    items: [
      { text: "Dashboard", icon: "dashboard" },
      { text: "My Kids", icon: "people", url: "/parents/kids"  },
      { text: "Setting", icon: "settings" },
      { text: "Help", icon: "help" },
      { text: "FAQ", icon: "question_answer" },
    ],
  }),
  mounted() {
    if(this.$route.params.newUser) {
      this.isSuccess = true; 
      this.isFirstLogin= true; 
    }
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
  font-family: 'Poppins';
}

.under-cons {
    text-align: center;
    margin-top: 50px;
    width: 100% !important;
    display: inline-block !important;
}

.cong-model {
  text-align: center;
  padding-top: 40px;
  height: 250px;
}
.checked-icon {
  font-size: 50px !important;
  padding-bottom: 10px;
  color: #4CD964 !important;
  caret-color: #4CD964 !important;	
  padding-top: 9px;

}
.congo-text {
  font-size: 30px;
  margin-bottom: 0px !important;
}
.congo-subline {
  font-size: 15px;
}

.outer-circle {
  background: #E0FFE5;
  border-radius: 69px;
  width: 67px;
  margin: auto;
}
</style>