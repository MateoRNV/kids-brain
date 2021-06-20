<template>
    <div class="question-list">
        <div class="head d-flex justify-space-between">
            <Filters v-if="showFilters" :tags="tags" :onSubmit="getQuestion" :onClose="toggleFilters"/>
            <div>
              <v-tabs  v-if="!subjectId" class="subTabs" @change="tabsChange" :value="selectedTab">
                <v-tab v-for="item in subjects" :key="item.id" >{{item.name}}</v-tab>
              </v-tabs>
            </div>
            <div class=" d-flex flex-row align-center  justify-end">
                <v-col cols="3" class="d-flex justify-end">
                <div class="filter-btn" @click="toggleFilters">
                  <span>Filter</span>
                  <v-icon>mdi-menu-down</v-icon>
                </div>
                </v-col>
                 <v-col cols="3">
                    <v-select
                        v-model="sort"
                        :items="sortOptions"
                        label="Sort By"
                        class="mr-6"
                    ></v-select>
                 </v-col>
                <v-btn v-if="createQuestionRequired" class="create-question" @click="goToCreateQuestion">Create Question</v-btn>
            </div>
        </div>
        <v-simple-table>
            <thead>
                <tr>
                <th v-for="(header,idx) in headers" :key="idx" class="text-left">
                    {{header.text}}
                </th>
                    <th v-if="editRequired" class="text-left">Edit</th>
                    <th v-if="cloneRequired" class="text-left">Clone</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredQuestions" :key="item.name">
                <v-checkbox
                    @change="(e) => onSelect(item,e)"
                    :disabled="disableSelect && !selectedQuestions[item.id]"
                    :input-value="selectedQuestions[item.id]"
                    v-model="selectedQuestions[item.id]"
                ></v-checkbox>
                <td>{{item.id}}</td>
                <td>{{item.title}}</td>
                <td><span class="status" :style="{background:statusStyle[item.status]}">{{item.status}}</span></td>
                <td>{{item.points}}</td>
                <td>{{item.level}}</td>
                <td>{{item.tags}}</td>
                <td v-if="editRequired"><v-icon @click="() =>{ goToEdit(item.id)}">mdi-circle-edit-outline</v-icon></td>
                <td v-if="cloneRequired"><v-icon @click="() =>{cloneQuestion(item.id)}">mdi-content-copy</v-icon></td>
                </tr>
            </tbody>
        </v-simple-table>
        <div class="footer d-flex align-center">
          <div class="bottom-actions d-flex">
            <v-icon v-if="deleteActionRequired && Object.keys(selectedQuestions).filter(x=> selectedQuestions[x]).length > 0" @click="handleDelete"  class="primary delete-icon white--text">mdi-trash-can-outline</v-icon>
            <v-icon v-if="addActionRequired && Object.keys(selectedQuestions).filter(x=> selectedQuestions[x]).length > 0" @click="handleAdd" class="primary delete-icon white--text">mdi-plus</v-icon>
          </div>
           <Pagination :dataset="filteredQuestions" :dataLength="dataLength" :callback="onPageChange" :recordsPerPage="2"/>
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
    </div>
</template>
<style lang="scss">
.question-list{
  >.create-question{
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
    display: grid;
    grid-template-columns: 2.5fr 3.5fr 4fr;
    grid-gap: 10px;
    .filter-btn{
      border-bottom: 2px solid #C7C7C7;
      padding: 5px;
      padding-top: 0px;
      cursor: pointer;
    }
  }
  >.filters{
    display: grid;
    grid-template-columns: 4fr 3fr 3fr;
    grid-gap: 5px;
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
}
</style>
<script>
import Filters from './filters';
export default {
  name: 'QuestionList',
  props: ['createQuestionRequired', 'editRequired', 'cloneRequired', 'subjectId', 'selectAction', 'deleteActionRequired', 'addActionRequired', 'deleteActionCallback', 'addActionCallback', 'onSelectCallback', 'preSelectedQuestions'],
  filteredQuestions:[],
  allQuestions:[],
  subjects: [],
  tags: [],
  async mounted() {
    let subjects = await this.$api.subjects.getAll();
    this.subjects = subjects.data;
    let questions = await this.$api.questions.find({
    subject_id:this.subjects[0].id
    });
    this.filteredQuestions = questions.data;
    this.dataLength = questions.total
    this.preSelectedQuestions && this.preSelectedQuestions.map(x=>{
      this.selectedQuestions[x.id] = true;
    })

    let tags = await this.$api.questions.find({
      $select:['tags'],
      "tags[$ne]" : 'null',
      $limit: 10000
    });
    tags = tags.data.map(x=> x.tags.split(','));
    let tagsArray = new Set();
    tags.forEach(x => {
      tagsArray.add(...x);
    })
    this.tags = [...tagsArray];

  },
  data() {
    return {
      snackbar: false,
      snackbarText: "Something went wrong.",
      snackbarTimeout: 2000,
      subjects:this.subjects,
      allQuestions: this.allQuestions,
      filteredQuestions: this.filteredQuestions,
      headers: [
          {text:"", value: "select", sortable: false},
          {text:"Id", value: "id", sortable: false},
          {text:"Title", value: "title", sortable: false},
          {text:"Status", value: "status", sortable: false},
          {text:"Points", value: "points", sortable: false},
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
          Published: 'rgb(246 161 93 / 21%)'
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
        }
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
      this.getQuestion();
    },
    goToEdit(e){
      console.log(e)
    },
    cloneQuestion(e){
      console.log(e)
    },
    goToCreateQuestion(e){
      console.log(e)
    },
    async getQuestion(filters){
      if(filters){
        this.selectedFilters = filters;
      }
      let query = {
        "tags[$in]":this.selectedFilters.tags,
        "status[$in]":this.selectedFilters.status,
        "level:[$in]": this.selectedFilters.level,
        subject_id: this.subjectId || this.selectedTab +1,
        "createdAt[$gte]": this.selectedFilters.dates[0],
        "createdAt[$lte]": this.selectedFilters.dates[1],
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
      let questions = await this.$api.questions.find(query);
      this.filteredQuestions = questions.data;
      this.dataLength = questions.total;
    },
    onPageChange(data){
        console.log("======>",data)
    },
    handleDelete(){
      let ids = Object.keys(this.selectedQuestions).filter(x=> this.selectedQuestions[x]);
      let questions = this.filteredQuestions.filter(qus => {
        return ids.includes(`${qus.id}`);
      })
      this.deleteActionCallback(questions);
    },
    handleAdd(){
      let ids = Object.keys(this.selectedQuestions).filter(x=> this.selectedQuestions[x]);
      let questions = this.filteredQuestions.filter(qus => {
        return ids.includes(`${qus.id}`);
      })
      this.addActionCallback(questions);
    },
    onSelect(item, isSelected){
      if(this.addActionRequired){
          let total = 0;
          let ids = Object.keys(this.selectedQuestions).filter(x=> this.selectedQuestions[x]);
          this.filteredQuestions.forEach(qus => {
              if(ids.includes(`${qus.id}`)){
                total += Number(qus.points);
              }
          });
          if(isSelected){
            if(total < 100){
              this.selectedQuestions[item.id] = true;
            }else{
              this.disableSelect = true;
              this.selectedQuestions[item.id] = false;
              this.snackbarText = "You cannot select question of value more than 100. Make sure total no of questions values max 100."
              this.snackbar = true;
            }
          }else{
            this.selectedQuestions[item.id] = false;
            this.disableSelect = false;
          }
      }else{
        this.selectedQuestions[item.id] = isSelected;
      }
    },
    toggleFilters(){
      this.showFilters = !this.showFilters
    }
  }
};
</script>
