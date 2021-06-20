<template>
    <div class="filters">
       <div class="header d-flex align-center">
            <label for="">FILTER BY</label>
            <v-icon @click="close" >mdi-close</v-icon>
       </div>
       <div class="filters-body">
           <v-expansion-panels accordion multiple v-model="panel">
                <v-expansion-panel>
                    <v-expansion-panel-header>Custom Date</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row>
                            <v-col cols="5 pt-7">
                                <span class="cal-label d-flex align-center">
                                    {{datelabel}}
                                    <v-icon class="primary--text">mdi-calendar-blank-outline</v-icon>
                                </span>
                            </v-col>
                            <v-col cols="7">
                                <v-date-picker
                                    v-model="dates"
                                    :max="new Date().toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    range
                                    no-title
                                    width="100%"
                                    @change="dateChange"
                                ></v-date-picker>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                    <v-expansion-panel-header>Tags</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="tags">
                            <v-list flat one-line>
                                <v-list-item-group v-model="selectedTags" multiple active-class="" >
                                    <v-list-item v-for="(tag, i) in tags" :key="i">
                                        <template>
                                            <v-list-item-action>
                                                <v-checkbox :input-value="selectedTags[tag]"></v-checkbox>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                <v-list-item-title>{{tag}}</v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                    <v-expansion-panel-header>Status</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="tags">
                            <v-list flat one-line>
                                <v-list-item-group v-model="selectedStatus" multiple active-class="" >
                                    <v-list-item v-for="(st, i) in status" :key="i">
                                        <template>
                                            <v-list-item-action>
                                                <v-checkbox :input-value="selectedStatus[st]"></v-checkbox>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                <v-list-item-title>{{st}}</v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel >
                    <v-expansion-panel-header>Level</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="tags">
                            <v-list flat one-line>
                                <v-list-item-group v-model="selectedLevel" multiple active-class="" >
                                    <v-list-item v-for="(level, i) in levels" :key="i">
                                        <template>
                                            <v-list-item-action>
                                                <v-checkbox :input-value="selectedLevel[level.value]"></v-checkbox>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                                <v-list-item-title>{{level.text}}</v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
       </div>
       <div class="d-flex filter-footer">
            <v-btn color="primary" @click="submit">Submit</v-btn>&nbsp;&nbsp;   
            <v-btn color="white" @click="clearall">clear all</v-btn>
        </div>
    </div>
</template>
<style lang="scss">
    .filters{
        background: #FFFFFF;
        border: 1px solid #BBBBBB;
        box-sizing: border-box;
        box-shadow: -3px 11px 9px 4px rgb(173 173 173 / 25%);
        width: 450px;
        position: absolute;
        right: 10px;
        z-index: 9;
        .header{
            padding:10px;
            border: 1px solid #D1D1D1;
            justify-content: space-between;
        }
        .filters-body{
            max-height: 90%;
            .cal-label{
                justify-content: space-around;
                background: #EFEFEF;
                box-shadow: 0px 0px 1px rgb(0 0 0 / 48%), 0px 0px 4px rgb(0 0 0 / 12%);
                border-radius: 10px;
                padding: 10px;
            }
            .v-expansion-panel-content{
                max-height: 300px;
                overflow-y: auto;
            }
        }
        .btn{
            padding: 10px;
            width: 150px;
            align-items: center;
            justify-content: space-between;
        }
        .filter-footer{
            justify-content: flex-end;
            margin: 10px;
        }
    }
</style>
<script>
export default {
  name: 'Filters',
  props: ['onSubmit', 'onClose', 'tags'],
  data () {
    return{
      panel: [],
      selectedTags:[],
      dialog: false,
      dates:[],
      datelabel:null,
      status: ['Active', 'Scheduled', 'Draft', 'Published'],
      selectedStatus:[],
      levels: [
          {
            text:'Any',
            value: null
          },
          {
            text:'Level 1',
            value: 1
          },
          {
            text:'Level 2',
            value: 2
          },
          {
            text:'Level 3',
            value: 3
          },
          {
            text:'Level 4',
            value: 4
          },
          {
            text:'Level 5',
            value: 5
          },
          {
            text:'Level 6',
            value: 6
          },
          {
            text:'Level 7',
            value: 7
          },
          {
            text:'Level 8',
            value: 8
          },
          {
            text:'Level 9',
            value: 9
          }
      ],
      selectedLevel:[]
    }
  },
  async mounted() {

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
    close(){
        this.onClose();
    },
    dateChange(e){
        this.datelabel = e.map(d => {
            const date = new Date(d);
            return date.toLocaleDateString('en-US', {
                month: 'short', day: 'numeric' 
            }).replace(/ /g, ', ');
        }).join('-')
    },
    submit(){
        let obj = {
            tags: this.selectedTags.map(x=>{
                return this.tags[x];
            }),
            status: this.selectedStatus.map(x=>{
                return this.status[x];
            }),
            level: this.selectedLevel.map(x=>{
                return this.levels[x].value;
            }),
            dates: this.dates
        }
        this.onSubmit(obj);
        this.onClose();
    },
    clearall(){
        this.selectedTags = [];
        this.selectedStatus = [];
        this.selectedLevel = [];
        this.dates = [];
        this.datelabel = null;
        this.submit();
    }
  },
};
</script>
