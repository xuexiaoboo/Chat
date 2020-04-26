<template>
  <div>
    <!-- <div @click="download">下载</div> -->
    <input type="file" @change="upFile" id="upFile"/>
    <a href id="download">
      <div class="downloadBtn"></div>
    </a>

    <!-- 截屏 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileValue: "",
      iconBase64: [],

      fileContent: {},
      fileName: '',
    };
  },

  methods: {
    //将本地图片转化为Base64
    ImageToBase64() {
      let files = document.getElementById("upImageFile").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => {
        this.iconBase64.push(reader.result);
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    upFile(e) {
      let file = e.target.files;
      if (file.length === 0) {
        return;
      }
      this.fileName = file[0].name
      console.log('fileName:'+this.fileName)
      let reader = new FileReader();
      if (typeof FileReader === "undefined") {
        this.$message.info("您的浏览器不支持FileReader接口");
        return;
      }
      reader.readAsArrayBuffer(file[0]);
      reader.onload = function(e) {
        console.log("文件内容");
        console.log(e.target.result);
        this.fileContent = e.target.result;
        console.log('aaa:'+this.fileContent)

        let blob = new Blob([this.fileContent], {type: 'application/octet-stream;charset=UTF-8'});
        let blobUrl = URL.createObjectURL(blob);
        let a = document.getElementById("download");
        a.href = blobUrl;
        a.download = this.fileName;
      }.bind(this);
    }
  }
};
</script>

<style scoped>
#download {
  text-decoration: none;
}
#download .downloadBtn {
  width: 100px;
  height: 50px;
  border: 1px solid #000;
  text-align: center;
  line-height: 50px;
}
</style>
