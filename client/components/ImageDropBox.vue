<template>
   <div v-if="!file">
        <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
            <div class="dropZone-info" @drag="onChange">
            <span  class="dropZone-title">
                <svg v-if="showIcon" width="101" height="91" viewBox="0 0 101 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M88.8623 42.2731V10.4618C88.8623 4.68649 84.1746 0 78.4135 0H10.4646C4.68776 0 0 4.68649 0 10.4618V65.9896C0 71.7491 4.68776 76.4514 10.4646 76.4514H50.8709C55.243 85.0669 64.1766 91.0158 74.4991 91.0158C89.1149 91.0158 101 79.1339 101 64.5221C101 55.1965 96.1544 46.9912 88.8623 42.2731ZM10.4646 71.7018C7.30786 71.7018 4.73511 69.1297 4.73511 65.9738V10.4618C4.73511 7.30588 7.30786 4.73383 10.4646 4.73383H78.4135C81.5702 4.73383 84.143 7.30588 84.143 10.4618V39.8589C81.1441 38.6912 77.9084 38.0284 74.5149 38.0284C72.9523 38.0284 71.4371 38.1862 69.9376 38.4545L62.2194 32.1743C62.2036 32.1743 62.2036 32.1585 62.1878 32.1585C62.1247 32.1111 62.0458 32.0638 61.9827 32.0165C61.9195 31.9691 61.8564 31.9376 61.7932 31.8902C61.7459 31.8587 61.6828 31.8429 61.6354 31.8271C61.5407 31.7956 61.446 31.7482 61.3671 31.7167C61.3355 31.7009 61.2882 31.7009 61.2566 31.7009C61.1461 31.6693 61.0356 31.6535 60.9251 31.6378C60.8778 31.6378 60.8304 31.6378 60.7831 31.6378C60.6726 31.6378 60.5779 31.6378 60.4674 31.6378C60.4043 31.6378 60.3569 31.6535 60.2938 31.6693C60.1991 31.6851 60.1044 31.7009 60.0097 31.7324C59.9623 31.7482 59.915 31.7798 59.8518 31.7956C59.7571 31.8271 59.6624 31.8745 59.5835 31.9218C59.5677 31.9218 59.5677 31.9218 59.552 31.9376L48.8348 38.0916L36.0974 26.2254C36.0816 26.2096 36.0658 26.2096 36.05 26.1939C35.829 26.0045 35.5923 25.8625 35.3397 25.752C35.3082 25.7363 35.2766 25.7205 35.245 25.7205C34.9925 25.6258 34.7242 25.5942 34.4558 25.5942C34.4243 25.5942 34.3927 25.5942 34.3454 25.5942C34.077 25.61 33.8245 25.6731 33.572 25.7678C33.5404 25.7836 33.493 25.7994 33.4615 25.8152C33.2721 25.9098 33.0985 26.0045 32.9406 26.1465L8.80731 46.6598C7.81294 47.5119 7.68667 48.9951 8.53899 49.9893C9.0125 50.5415 9.67542 50.8256 10.3383 50.8256C10.875 50.8256 11.4274 50.6362 11.8694 50.2575L34.3927 31.1013L53.27 48.6953C49.9712 53.1136 47.9983 58.5575 47.9983 64.4748C47.9983 66.9679 48.3771 69.3822 49.0242 71.6702C49.0084 71.7018 10.4646 71.7018 10.4646 71.7018ZM56.411 45.1923L52.4335 41.4841L60.4832 36.8608L64.3818 40.0324C61.4144 41.2632 58.7312 43.0147 56.411 45.1923ZM74.4991 86.2662C62.5035 86.2662 52.7334 76.4987 52.7334 64.5063C52.7334 52.514 62.5035 42.7465 74.4991 42.7465C86.4948 42.7465 96.2649 52.514 96.2649 64.5063C96.2649 76.4987 86.4948 86.2662 74.4991 86.2662Z" fill="#808080"/>
                </svg>
            </span>
            <span class="dropZone-title">{{label}}</span>
            </div>
            <input type="file" @change="onChange">
        </div>
    </div>
    <div v-else class="dropZone-uploaded">
        <div class="dropZone-uploaded-info">
            <img :src="uploadedFile" />
            <v-btn v-if="deleteEnable" type="button" class="ml-6" @click="removeFile">Remove File</v-btn>
            <!-- <v-icon v-if="deleteEnable" class="ml-6" @click="removeFile" >mdi-close-circle</v-icon> -->
        </div>
    </div>
</template>
<style lang="scss">
    .dropZone {
          height: 100px;
          position: relative;
          padding: 10px;
          >input {
            cursor: pointer;
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 10px;
            bottom: 0px;
          }
         
          .dropZone-info {
            color: #A8A8A8;
            display: flex;
            align-items: center;
            >span:nth-of-type(2){
              margin-left: 10px;
            }
          }

          .dropZone-title {
            color: #787878;
          }

          .dropZone-upload-limit-info {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
          }

          .dropZone-over {
            background: #5C5C5C;
            opacity: 0.8;
          }
        }
        .dropZone-uploaded {
          height: 115px;
          position: relative;
          overflow: hidden;
          .dropZone-uploaded-info{
            display: flex;
            align-items: center;
            >img{
              max-width: 230px;
              max-height: 180px;
            }
          }
        }
</style>
<script>
export default {
  name: 'ImageDropBox',
  props: ['callback', 'upload', 'showIcon', 'label', 'deleteEnable', 'uploadedImage'],
  data () {
    return{
      file: this.uploadedImage,
      uploadedFile: (this.uploadedImage && this.uploadedImage.url) ? this.uploadedImage.url:null,
      dragging:false,
    }
  },
//   watch: { 
//     upload: function(newVal, oldVal) { // watch it
//       if(!oldVal && newVal){
//         this.uploadToServer();
//       }
//     }
//   },
  methods: {
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.dragging = false;
        return;
      }
      
      var reader = new FileReader();
      let that = this;
      reader.onload = function (e) {
        that.uploadedFile = e.target.result;
      }
      reader.readAsDataURL(files[0]);
      this.createFile(files[0]);
    },
    createFile(file) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        alert('please select image file');
        this.dragging = false;
        return;
      }
      if (file.size / 1024 / 1024 > 5) {
        alert('please check file size no over 5 MB.')
        this.dragging = false;
        return;
      }
      this.file = file;
      this.dragging = false;
      this.callback(this.file);
    },
    removeFile() {
      this.file = '';
    },
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