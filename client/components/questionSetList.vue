<template>
    <div class="question-set-list">
        <div :class="['head' ,'d-flex' , 'justify-space-between align-center',(!createQuestionRequired ? 'grid-only-2':null) ]">
            <Filters v-if="showFilters" :showDialog="showFilters" :tags="tags" :onSubmit="getQuestionSet" :onClose="toggleFilters"/>
            <div>
              <v-tabs  v-if="!subjectId" class="subTabs" @change="tabsChange" :value="selectedTab">
                <v-tab v-for="item in subjects" :key="item.id" >{{item.name}}</v-tab>
              </v-tabs>
            </div>
            <div class=" d-flex flex-row align-center  justify-end">
                <v-col :cols="(!createQuestionRequired ? 6: 3)" class="d-flex justify-end">
                    <div class="filter-btn" @click="toggleFilters">
                      <span>Filter</span>
                      <v-icon>mdi-menu-down</v-icon>
                    </div>
                </v-col>
                 <v-col :cols="(!createQuestionRequired ? 6: 3)">
                    <v-select
                        v-model="sort"
                        :items="sortOptions"
                        label="Sort By"
                        class="mr-6"
                        @change="() => this.getQuestionSet()"
                    ></v-select>
                 </v-col>
                <v-btn v-if="createQuestionRequired" class="create-question" @click="goToCreateQuestion">Create Question Set&nbsp; <v-icon add-circle>mdi-plus-circle</v-icon></v-btn>
            </div>
        </div>
        <v-simple-table>
            <thead>
                <tr>
                <th v-if="this.onSelectCallback || this.singleChoice" class="text-left"></th>
                <th v-for="(header,idx) in headers" :key="idx" class="text-left">
                    {{header.text}}
                </th>
                <th v-if="editRequired" class="text-left">Edit</th>
                <th v-if="cloneRequired" class="text-left">Clone</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredQuestions" :key="item.name" :class="[isActive === item.id ? 'active':null]" v-clickOutside="hideSelectDialog" @click="onSelect(item, selectedQuestions[item.id] ? false:true)">
                  <v-checkbox 
                      v-if="onSelectCallback || singleChoice"
                      @change="(e) => onSelect(item,e)"
                      :disabled="disableSelect && !selectedQuestions[item.id]"
                      :input-value="selectedQuestions[item.id]"
                      v-model="selectedQuestions[item.id]"
                  ></v-checkbox>
                  <td>{{item.id}}</td>
                  <td>{{item.set_name}}</td>
                  <td><span class="status" :style="{background:statusStyle[item.status]}">{{item.status}}</span></td>
                  <td>{{item.level}}</td>
                  <td style="width: 15%;">{{item.tags}}</td>
                  <td v-if="editRequired"><v-icon :disabled="item.status == 'Archived'" @click="() =>{ goToEdit(item.id)}">mdi-circle-edit-outline</v-icon></td>
                  <td v-if="cloneRequired"><v-icon @click="() =>{cloneQuestion(item.id)}">mdi-content-copy</v-icon></td>
                  <div v-if="isActive === item.id" class="select-question-bank" width="500">
                    <v-card>
                      <v-card-text class="select-option-card">
                        <div class="select-options" @click="() => handleDelete(item)">Delete</div>
                        <div class="select-options" @click="() => handleArchieve(item)"  >Archieve</div>
                      </v-card-text>
                    </v-card>
                  </div>
                </tr>
            </tbody>
        </v-simple-table>
        <div class="footer d-flex align-center">
          <div class="bottom-actions d-flex">
            <!-- <v-icon v-if="deleteActionRequired && isActive" @click="handleDelete"  class=" delete-icon white--text">mdi-close-circle</v-icon> -->
            <v-icon v-if="addActionRequired && Object.keys(selectedQuestions).filter(x=> selectedQuestions[x]).length > 0" @click="handleAdd" class="primary delete-icon white--text">mdi-plus</v-icon>
          </div>
           <Pagination :dataset="allQuestions" :dataLength="dataLength" :callback="onPageChange" :recordsPerPage="10"/>
        </div>
        <v-snackbar v-model="snackbar" min-width="100%" min-height="80px" color="red lighten-4" content-class="snackbar-class" :timeout="snackbarTimeout">
        <template >
          <div class="snackbar-text">
            <v-icon class="m-l-6" color="#D64444" @click="snackbar = false">mdi-alert-outline</v-icon><span>{{ snackbarText }}</span>
          </div>
        </template>
        <template v-slot:action="{ attrs }">
          <v-icon  color="#D64444" @click="snackbar = false">mdi-close-circle-outline</v-icon>
        </template>
      </v-snackbar>
       <ConfirmDialog headerText="please confirm" :confirmationText="confirmationText" :onCancel="() => {
      this.showConfirmBox = 'false'
      this.itemToDelete = null }" :onConfirm="this.handleConfirmationCallBack" :showDialog="showConfirmBox" />
    </div>
</template>
<style lang="scss">
.question-set-list{
  .create-question{
    background: #FFFFFF;
    border: 1px solid #4483ED;
    box-sizing: border-box;
    box-shadow: 0px 12px 8px rgb(68 131 237 / 12%);
    border-radius: 100px;
    color: #4483ED!important;
  }
  
  .status{
    padding: 5px 20px;
    border-radius: 5px;
  }
  >.head{
    position: relative;
    display: grid;
    grid-template-columns: 2.5fr 3.5fr 4fr;
    grid-gap: 10px;
    &.grid-only-2{
      grid-template-columns: 3fr 5fr;
    }
    >.filters{
      top:0px;
    }
    .filter-btn{
      border-bottom: 2px solid #C7C7C7;
      padding: 5px;
      padding-top: 0px;
      cursor: pointer;
    }
  }
  .footer{
    background: #FFFFFF;
    border: 1px solid #DFE0EB;
    box-sizing: border-box;
    border-radius: 8px;
    height: 55px;
    justify-content: flex-end;
    .bottom-actions{
      margin-right: 20px;
    }
  }
  .snackbar-class{
      color:#D64444;
      .snackbar-text{
        margin-left: 100px;
        display: flex;
        align-items: center;
        >span{
          margin-left:20px;
        }
      }
    }
  .active{
    position: relative;
    background: #EBF3FF!important;
    .select-question-bank{
      position: absolute;
      right: 0px;
      top: 0px;
      width: 250px;
      font-size: 16px;
      font-weight: 500;
      right: 10px;
      z-index: 9;
      box-shadow: -3px 11px 9px 4px rgb(173 173 173 / 25%);
       .select-option-card{
          display: flex;
          flex-direction: column;
          font-size: 16px;
          line-height: 30px;
          padding: 5px 0px;
          .select-options{
            padding: 0px 10px;
            cursor: pointer;
            &:hover{
              background: #CCDFFF;
            }
          }
      }
    }
   
  }
  .delete-icon{
    color: #D8D8D8!important;
    font-size: 40px;
  }
}
</style>
<script>
import Filters from './filters';
import Vue from 'vue';

export default {
  name: 'QuestionSetList',
  directives:{
    clickOutside:{
      bind: function (el, binding, vnode) {
        vnode.event = function (event) {
          if (!(vnode == event.target )) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', vnode.event)
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.event)
      }
    }
  },
  props: ['createQuestionRequired', 'editRequired', 'cloneRequired', 'subjectId', 'selectAction', 'deleteActionRequired', 'addActionRequired', 'deleteActionCallback', 'addActionCallback', 'onSelectCallback', 'singleChoice', 'exclude', 'archieveActionCallback'],
  filteredQuestions:[],
  allQuestions:[],
  subjects: [],
  tags: [],
  async mounted() {
    let subjects = await this.$api.subjects.getAll();
    this.subjects = subjects.data;
    let questionSets = await this.$api.questionSets.find({
      subject_id:this.subjects[0].id,
      $limit: 10000
    });
    this.allQuestions = questionSets.data;
    this.filteredQuestions = questionSets.data.filter( x=> !this.exclude.includes(x.id));
    this.filteredQuestions = this.filteredQuestions.slice(0, 9);
    this.dataLength = questionSets.total
    let tags = await this.$api.questionSets.find({
      $select:['tags'],
      "tags[$ne]" : 'null',
      $limit: 10000
    });
    let tagsArray = new Set();
    tags = tags.data.forEach(x=> {
        x.tags.split(',').forEach(y => {
            tagsArray.add(y.replace(/^\s+|\s+$/g, ""));
        })
    });
    this.tags = [...tagsArray];
  },
  data() {
    return {
      confirmationText: 'Are you sure want to delete',
      selectDialog: false,
      snackbar: false,
      snackbarText: "Something went wrong.",
      snackbarTimeout: 2000,
      subjects:this.subjects,
      allQuestions:this.allQuestions,
      itemToDelete:null,
      showConfirmBox: 'false',
      filteredQuestions: this.filteredQuestions,
        headers: [
          {text:"Id", value: "id", sortable: false},
          {text:"Title", value: "title", sortable: false},
          {text:"Status", value: "status", sortable: false},
          {text:"Level", value: "level", sortable: false},
          {text:"Tags", value: "tags", sortable: false}
        ],
        selectedTab:0,
        sortOptions: ['Date Ascending', 'Date Descending','Status'],
        levelOptions: [
            {
              text:'Any',
              value: null
            },
            {
              text:'1',
              value: 1
            },
            {
              text:'2',
              value: 2
            },
            {
              text:'3',
              value: 3
            },
            {
              text:'4',
              value: 4
            },
            {
              text:'5',
              value: 5
            },
            {
              text:'6',
              value: 6
            },
            {
              text:'7',
              value: 7
            },
            {
              text:'8',
              value: 8
            },
            {
              text:'9',
              value: 9
            }
        ],
        sort:null,
        filters:null,
        statusStyle:{
          Scheduled: 'rgb(246 161 93 / 21%)',
          Active : 'rgb(109 157 254 / 21%)',
          Draft:'rgb(246 161 93 / 21%)',
          Published: 'rgb(246 161 93 / 21%)',
          Archived: 'rgb(109 157 254 / 21%)'
        },
        selectedQuestions : {},
        startDate:null,
        endDate:null,
        dates: [],
        tags:this.tags,
        level:null,
        dataLength:0,
        total:0,
        disableSelect:false,
        showFilters:false,
        selectedFilters:{
          dates:[],
          level:[],
          tags:[],
          status:[]
        },
        isActive: null,
        toArchieve:false
    };
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
  },
  methods:{
    tabsChange(e){
      this.selectedTab = e;
      this.getQuestionSet();
    },
    goToEdit(e){
      console.log(e)
      this.$router.replace(`/admin/create-question-set?id=${e}`);
    },
    cloneQuestion(e){
        this.$router.replace(`/admin/create-question-set?clone=${e}`);
    },
    goToCreateQuestion(e){
        this.$router.replace(`/admin/create-question-set`);
    },
    async getQuestionSet(filters){
      if(filters){
        this.selectedFilters = filters;
      }
      let query = {
        "tags[$in]":this.selectedFilters.tags,
        "status[$in]":this.selectedFilters.status,
        "level[$in]": this.selectedFilters.level,
        subject_id: this.subjectId || this.selectedTab +1,
        "createdAt[$gte]": this.selectedFilters.dates[0],
        "createdAt[$lte]": this.selectedFilters.dates[1],
        $limit:10000
      }
      if(this.sort){
        switch (this.sort) {
          case 'Date Ascending':
            query = {
              ...query,
              "$sort[createdAt]": 1
            }
            break;
          case 'Date Descending':
            query = {
              ...query,
              "$sort[createdAt]": -1
            }
            break;
          case 'Status':
            query = {
              ...query,
              "$sort[status]": 1
            }
            break;
          default:
            break;
        }
      }
      let questionSets = await this.$api.questionSets.find(query);
      this.filteredQuestions = questionSets.data.filter( x=> !this.exclude.includes(x.id));;
      this.dataLength = questionSets.total;
    },
    onPageChange(data){
      this.filteredQuestions = data;
    },
    handleDelete(questionSet){
      if(!this.itemToDelete && questionSet && this.showConfirmBox === 'false'){
        this.itemToDelete = questionSet;
        this.showConfirmBox = 'true';
        return;
      }else{
         this.filteredQuestions = this.filteredQuestions.filter(qus => {
            return qus.id != this.itemToDelete.id;
          });
          if(this.deleteActionCallback){
            this.deleteActionCallback(this.isActive);
          }
          this.itemToDelete = null;
          this.show = false;
          this.showConfirmBox = 'false';
      }
      // let ids = Object.keys(this.selectedQuestions).filter(x=> this.selectedQuestions[x]);
    },
    handleArchieve(questionSet){
      if(!this.itemToDelete && questionSet && this.showConfirmBox === 'false'){
        this.itemToDelete = questionSet;
        this.confirmationText = 'Are you sure want to Archive'
        this.showConfirmBox = 'true';
        this.toArchieve = true;
        return;
      }else{
          this.filteredQuestions = this.filteredQuestions.map(qus => {
             if(qus.id == this.itemToDelete.id){
               qus.status = 'Archived';
             }
             return qus;
          });
          if(this.archieveActionCallback){
            this.archieveActionCallback(this.isActive);
          }
          this.itemToDelete = null;
          this.show = false;
          this.showConfirmBox = 'false';
          this.toArchieve = false;
      }
    },
    handleAdd(){
      let ids = Object.keys(this.selectedQuestions).filter(x=> this.selectedQuestions[x]);
      let questions = this.filteredQuestions.filter(qus => {
        return ids.includes(`${qus.id}`);
      })
      this.addActionCallback(questions);
    },
    onSelect(item, isSelected){
        if(this.isActive && this.isActive == item.id){
          this.isActive = null;
          this.selectDialog = false;
          return;
        }
        if(this.singleChoice){
            this.selectedQuestions = isSelected ? {[item.id]:true}:{}
        }
        if(this.onSelectCallback){
          this.onSelectCallback(item,isSelected);
        }
        this.isActive = item.id;
        this.selectDialog = true;
    },
    toggleFilters(){
      this.showFilters = !this.showFilters
    },
    hideSelectDialog(e){
      let show = false;
      for (const el of e.path) {
        if ((el.tagName === 'DIV' || el.tagName === 'TR') && (el.classList.contains('select-question-bank') || el.classList.contains('active'))) {
          show = true;
        }
      }
      if(!show){
        this.selectDialog = false;
        this.isActive = null;
      }
    },
    handleConfirmationCallBack(){
      if(this.toArchieve){
        this.handleArchieve();
      }else{
        this.handleDelete();
      }
    }
  }
};
</script>
