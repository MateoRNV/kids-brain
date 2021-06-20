<template>
   <div class="pagination d-flex align-center">
       <div class="row-per-page d-flex align-center">
           <label for="">Rows per page:</label>
           <v-select
            v-model="rowPerPage"
            :items="rowItems"
            class="select"
            @change="refresh"
            ></v-select>
       </div>
       <div class="pager">
           <span class="arrow" @click="onLeftClick">
               <v-icon class="primary--text text-sm-h5  ">mdi-chevron-left</v-icon>
           </span>
            <div class="d-flex links" ref="links">
                <span  v-for="(n,index) in Math.ceil(dataLength/rowPerPage)" @click="() => moveToPage(n-1)" :class="[currentPage == n ? 'active':null]" :key="index">{{n}}</span>
            </div>
            <span class="arrow" @click="onRightClick">
               <v-icon class="primary--text text-sm-h5  ">mdi-chevron-right</v-icon>
           </span>
       </div>
      <v-snackbar :color="snackbarSuccess ? 'successDark':''" v-model="snackbar" :timeout="snackbarTimeout">
        <span >
          <v-icon v-if="snackbarSuccess">mdi-check-circle</v-icon>
          {{ snackbarText }}
        </span>
      </v-snackbar>
   </div>
</template>
<style lang="scss">
    .pagination{
        margin-right: 20px;
        justify-content: flex-end;
        .pager{
            display: flex;
            align-items: center;
            background: #F0F0F3;
            border: 1px solid #CDCDCD;
            box-sizing: border-box;
            box-shadow: -1px -1px 3px #ffffff, 1.5px 1.5px 3px rgb(174 174 192 / 40%);
            border-radius: 5px;
            max-width: 200px;
            color: #1976d2;
            width: fit-content;
            padding:0px 5px;
            justify-content: space-between;
            .links{
                // list-style: none;
                overflow: hidden;
                width: 80px;
                margin:0px;
                padding:0px 10px; 
                font-size: 12px;   
                >span{
                    padding: 0px 5px;
                    cursor: pointer;
                    &.active{
                        border-bottom: 1px solid;
                    }
                }
            }
            .arrow{
                cursor: pointer;
            }
        }
        .row-per-page{
            margin-right: 20px;
            .select{
                font-size: 12px;
                margin-left: 10px;
                .v-input__control{
                    .v-input__slot{
                        .v-select__slot{
                            .v-select__selections{
                                width:25px;
                            }
                            .v-input__append-inner{
                                .v-input__icon{
                                    min-width: 10px;
                                    width: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<script>
export default {
  name: 'ImageDropBox',
  props: ['recordsPerPage', 'dataset',  'callback', 'dataLength'],
  data () {
    return{
        currentPage:1,
        rowPerPage: 10,
        rowItems: [
            {
              text:'10',
              value: 10
            },
            {
              text:'20',
              value: 20
            },
            {
              text:'30',
              value: 30
            },
            {
              text:'40',
              value: 40
            },
            {
              text:'50',
              value: 50
            },
            {
              text:'60',
              value: 60
            },
            {
              text:'70',
              value: 70
            },
            {
              text:'80',
              value: 80
            },
            {
              text:'90',
              value: 90
            },
            {
              text:'100',
              value: 100
            }
        ],
        snackbar: false,
        snackbarText: "",
        snackbarTimeout: 2000,
        snackbarSuccess: false
    }
  },
  watch: { 
    dataLength: function(newVal, oldVal) { // watch it
      if(newVal){
        this.dataLength = newVal
      }
    }
  },
  methods: {
    onRightClick(e) {
        if(this.currentPage >= (this.dataLength/this.rowPerPage)){
            this.snackbarText = "End of results";
            this.snackbar = true;
            return;
        }
        let dataset = this.dataset.slice((this.currentPage*this.rowPerPage), (this.currentPage+1)*this.rowPerPage);
        this.callback(dataset);
        if(this.currentPage > 10){
            this.$refs.links.scrollBy(24, 0);
        }else if(this.currentPage > 2){
            this.$refs.links.scrollBy(17, 0);
        }
        this.currentPage += 1;
    },
    onLeftClick(file) {
      if(this.currentPage < 2){
          this.snackbarText = "End of results";
          this.snackbar = true;
          return;
      }
      let dataset = this.dataset.slice(((this.currentPage -1 )*this.rowPerPage), (this.currentPage*this.rowPerPage));
      this.callback(dataset);
        if(this.currentPage > 10){
            this.$refs.links.scrollBy(-24, 0);
        }else if(this.currentPage > 2){
            this.$refs.links.scrollBy(-17, 0);
        }
      this.currentPage -= 1;
    },
    refresh(){
      let dataset = this.dataset.slice(0, this.rowPerPage);
      this.currentPage = 1;
      this.callback(dataset);
    },
    moveToPage(n){
      let dataset = this.dataset.slice((n*this.rowPerPage), (n+1)*this.rowPerPage);
      this.callback(dataset);
      if(n > 10){
          this.$refs.links.scrollBy(24, 0);
      }else if(n > 2){
          this.$refs.links.scrollBy(17, 0);
      }
      this.currentPage = (n+1);
    }
  },
};
</script>
<style lang="scss">
.questions__result{
    border: 1px solid #cccccc;
    padding: 10px 15px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>