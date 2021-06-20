<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Create New Tag
        </v-card-title>
        <v-card-text>
            <v-text-field v-model="newTag" placeholder="" ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="this.denie"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="this.confim"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
       <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
        <span >
            {{ snackbarText }}
        </span>
        </v-snackbar>
    </v-dialog>

</template>

<script>
export default {
  name: 'CreateTag',
  props: ['onCancel', 'onConfirm', 'showDialog'],
  data () {
    return{
      dialog: false,
      newTag:null,
      snackbarText:"Please type your new tag!",
      snackbar:false,
      snackbarTimeout:2000
    }
  },
  watch: { 
        showDialog: function(newVal, oldVal) { // watch it
            if(newVal == 'false'){
                this.dialog = false;
            }else if(newVal == 'true'){
                this.dialog = true;
                this.newTag = null;
            }
        }
    },
  methods: {
    confim(){
        if(!this.newTag){
            
            this.snackbar = true;
            return;
        }else if(this.onConfirm){
            this.onConfirm(this.newTag);
        }
    },
    
    denie(){
        if(this.onCancel){
            this.onCancel();
        }
    }
  },
};
</script>
