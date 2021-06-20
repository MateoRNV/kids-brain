<template>
<div class="kids-page">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
           <th class="text-left">
            Gender
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in kids"
          :key="item.id"
        >
          <td>{{ item.first_name+' '+item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.gender }}</td>
          <td class="delete"><v-icon @click="deleteStdent(item.id)" color="red darken-2">mdi-delete-circle</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <ConfirmDialog headerText="please confirm" confirmationText="Are you sure want to delete" :onCancel="this.cancelDelete" :onConfirm="this.onConfirmDelete" :showDialog="this.showConfirmBox" />
   <div v-if="$auth.user && $auth.user.role == 'Parent'" class="right-nav">
        <div class="label pa-5">
        <h3>Create child account</h3>
        </div>
        <CreateAccount v-if="this.showCreateAccountForm" userType="Student" :onSubmitCallback="this.onCreateAccount" :parentId="$auth.user.id"/>
        <p v-if="!this.showCreateAccountForm && this.accountCreatedMessage">Please check <span class="email">{{this.childEmail}}</span> and kindly varify account </p>
        <v-btn color="success" class="account-from-button" @click="toggleAccountForm">{{this.showCreateAccountForm ? 'Close':'Create Now'}}</v-btn>
    </div>
</div>
</template>
<style lang="scss">
  .kids-page{
    display: grid;
    grid-template-columns: 7fr 3fr;
    padding: 5px;
    .right-nav{
       width: 400px;
        position: fixed;
        right: 0px;
        height: 100%;
        top: 62px;
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        text-align: center;
        padding: 10px;
        .account-from-button{
            display: flex;
            margin: auto;
            margin-top: 15px;
        }
        >p{
        color:red;
        font-size: 1rem;
        font-weight: 500;
        .email{
            color: #000000;
        }
        }
    }
    .date-of-birth{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .body{
      .row{
        margin:0px;
      }
    }
    .delete{
        cursor: pointer;
    }
  }
</style>
<script>
import ConfirmDialog from '../../components/confirmDialog';
export default {
  kids:[],
  layout: "parents",
  async mounted() {
    let kids = await this.$api.users.find({
        parent_id: this.$auth.user.id
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
        childEmail : null
    };
  },
  methods:{
      deleteStdent(id){
          this.showConfirmBox = 'true';
          this.studentToBeDeleted = id;
      },
      async onConfirmDelete(){
          this.showConfirmBox = 'false';
          await this.$api.users.delete(this.studentToBeDeleted);
          this.studentToBeDeleted = null;
        let kids = await this.$api.users.find({
            parent_id: this.$auth.user.id
        });
        this.kids = kids.data;
      },
      cancelDelete(){
          this.showConfirmBox = 'false';
          this.studentToBeDeleted = null;
      },
    async onCreateAccount(data){
        this.childEmail = data.email;
        this.accountCreatedMessage = true;
        this.showCreateAccountForm = false;
        let kids = await this.$api.users.find({
            parent_id: this.$auth.user.id
        });
        this.kids = kids.data;
    },
    toggleAccountForm(){
        this.showCreateAccountForm = !this.showCreateAccountForm;
        this.accountCreatedMessage = false;
        this.childEmail = null;
    }
  }
};
</script>
