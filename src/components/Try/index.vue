<template>
  <div>
    <input type="file" :value="fileValue" id="upImageFile" @change="ImageToBase64" />
    <img v-for="(url, index) in iconBase64" :key="index" :src="url" alt width="200" />

    <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif" />
    <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/1.gif" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileValue: "",
      iconBase64: []
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
    }
  }
};
</script>

<style scoped>
</style>
