<template>
  <div class="userInfo" v-show="isShow">
    <div class="boxHead">
      <span>资料卡</span>
      <el-button
        style=" font-size: 21px; padding: 0"
        icon="el-icon-circle-close"
        type="text"
        @click="close"
        class="closeBtn"
      ></el-button>
    </div>
    <div class="boxBody">
      <div class="infoItem">
        <p>用户名：</p>
        {{userInfo.username}}
      </div>
      <div class="infoItem">
        <p>邮箱：</p>
        {{userInfo.email}}
      </div>
      <div class="infoItem">
        <p>注册日期：</p>
        {{userInfo.date}}
      </div>
      <div class="infoItem">
        <p>在线情况：</p>
        {{onlineState}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    userInfo: Object,
    onlineState: String
  },
  data() {
    return {
      isShow: false
    };
  },

  methods: {
    close() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped>
.userInfo {
  width: 105%;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  z-index: 2;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  animation: fade-in 0.5s;
}
@keyframes fade-in {
  from {
    opacity: 0;
    left: 100%;
  }
  to {
    opacity: 1;
    left: 108%;
  }
}
.userInfo .boxHead {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.userInfo .boxBody .infoItem {
  display: flex;
  margin: 20px 10px;
}

.userInfo .boxBody .infoItem p {
  margin: 0;
}
</style>
