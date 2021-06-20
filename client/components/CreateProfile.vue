<template>
  <v-form class="create-profile-form" ref="form" v-model="valid" lazy-validation>
      <div :class="(displayRow) ? 'row':null">
          <v-text-field
              v-model="childName"
              :counter="10"
              :rules="nameRules"
              label="Children Name"
              required>
          </v-text-field>
      </div>
      <div :class="(displayRow) ? 'row':null">
        <v-select
          v-model="genderValue"
          :items="gender"
          :rules="[v => !!v || 'Gender is required']"
          label="Gender"
          required
        ></v-select>
        <v-select
          v-model="instituteValue"
          :items="institutes"
          :rules="[v => !!v || 'Institute is required']"
          item-text="name"
          item-value="id"
          label="Institute"
          required
        ></v-select>
      </div>
     
      <div :class="(displayRow) ? 'row':null">
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date_of_birth"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date_of_birth"
            label="Date of birth"
            :rules="[v => !!v || 'Date of birth is required']"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date_of_birth"
          no-title
          scrollable
          :max="new Date().toISOString().substr(0, 10)"
        >
        <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date_of_birth)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      </div>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="onSubmit">
        Submit
      </v-btn>
  </v-form>
</template>
<style lang="scss">
.create-profile-form{
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 25px;
    border-radius: 5px;
    background: #eee;
    .row{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 10px;
    }
}
</style>

<script>
export default {
  name: 'CreateProfile',
  props: ['userType','onSubmitCallback', 'displayRow', 'parentId'],
  mounted() {
    this.$api.institutes.getAll().then(data=>{
        this.institutes = data.data;
    })
  },
  institutes: [],
    data () {
        return {
            valid: false,
            childName: "",
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 10) || "Name must be less than 10 characters"
            ],
            genderValue: "Male",
            instituteValue: null,
            gender: ["Male", "Female", "Other"],
            institutes: this.institutes,
            password:null,
            date_of_birth: null,
            menu: false,
            modal: false,
            menu2: false,
        };
    },
    methods: {
      validate() {
        return this.$refs.form.validate();
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      },
      
      async onSubmit() {
          if(this.validate()){
            let dataToSubmit = {
              name: this.childName,
              institute_id: this.instituteValue,
              gender: this.genderValue,
              user_id : this.parentId,
              date_of_birth: this.date_of_birth
            }
             let rsp = await this.$api.userProfile.create(dataToSubmit);
              if(this.onSubmitCallback){
                this.onSubmitCallback(rsp);
              }
          }
    }
  }
};
</script>
