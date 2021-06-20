<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{this.headerText}}
        </v-card-title>
        <v-card-text>{{this.confirmationText}}</v-card-text>
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
            @click="this.onConfirm"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: ['headerText', 'confirmationText', 'onCancel', 'onConfirm', 'showDialog'],
  data () {
    return{
      dialog: false
    }
  },
  watch: { 
        showDialog: function(newVal, oldVal) { // watch it
            if(newVal == 'false'){
                this.dialog = false;
            }else if(newVal == 'true'){
                this.dialog = true;
            }
        }
    },
  methods: {
    confim(){
        if(this.onConfirm){
            this.onConfirm();
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
