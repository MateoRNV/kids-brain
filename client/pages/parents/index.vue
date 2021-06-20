<template>
  <div>
    <h4>Please choose your profile</h4>
    <div class="cards d-flex ">
      <v-card 
        v-for="item in kids"
        :key="item.id"
        class="justify-center"
        max-width="200"
        min-width="200"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{item.name}}
            </v-list-item-title>
            <v-list-item-subtitle>{{item.gender}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn
            outlined
            rounded
            @click="() => selectProfile(item.id)"
          >
            Select
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card
        class="d-flex justify-center mb-6 text-center"
        max-width="244"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
        flat
        tile
     >
     <v-list-item three-line>
          <v-list-item-content>
            <v-btn class="mb-4 success" @click="openChildProfilePopup">
              Create Child Profile
            </v-btn>
          </v-list-item-content>
        </v-list-item>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Create Child Profile
        </v-card-title>
        <CreateProfile :onSubmitCallback="this.onCreateProfile" :parentId="$auth.user.id" />
      </v-card>
    </v-dialog>
    </div>
  </div>
</template>

<script>

import CreateProfile from '../../components/CreateProfile';
export default {
  kids:[],
  layout: "parents",
  async mounted() {
    let kids = await this.$api.userProfile.find({
        user_id: this.$auth.user.id
    });
    this.kids = kids.data;
  },
  data() {
    return {
        kids:this.kids,
        showConfirmBox:'false',
        studentToBeDeleted : null,
        accountCreatedMessage: false,
        showCreateAccountForm:false,
        childEmail : null,
        dialog:false
    };
  },
  methods:{
    openChildProfilePopup(){
      this.dialog = true;
    },
    onCreateProfile(data){
      if(data.id){
        this.dialog = false;
      }
    },
    selectProfile(id){
      this.$auth.user.profile = id;
      this.$router.replace("/students");
    }
  }
};
</script>
