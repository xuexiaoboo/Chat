<template>
  <div class="chatRecord" v-if="isShow">
    <div class="boxHead">
      <div class="headTitle">
        <span>聊天记录</span>
        <el-button
          style=" font-size: 21px; padding: 0"
          icon="el-icon-circle-close"
          type="text"
          @click="close"
          class="closeBtn"
        ></el-button>
      </div>
    </div>
    <div class="boxBody">
      <div class="msgList" v-for="(item, index) in chatList" :key="index">
        <div class="msgHead">
          <div class="name">{{ item.username }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="msg" v-html="item.msg"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatRecord",
  props: {
    chatList: Array
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
.chatRecord {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
    bottom: 100%;
  }
  to {
    opacity: 1;
    bottom: 170%;
  }
}

.chatRecord .boxHead {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.chatRecord .boxHead .headTitle {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
}

.chatRecord .boxBody {
  width: 105%;
  height: 87%;
  margin-top: 10px;
  overflow: auto;
}

.chatRecord .boxBody .msgList {
  /* border-bottom: 1px solid #eee; */
  position: relative;
  padding: 10px 45px 10px 10px;
}

.chatRecord .boxBody .msgList:after {
  content: "";
  position: absolute;
  left: 1%;
  top: auto;
  bottom: 0;
  right: auto;
  height: 1px;
  width: 93%;
  background-color: #eee;
}

.chatRecord .boxBody .msgList .msgHead {
  display: flex;
  justify-content: space-between;
  color: rgb(190, 187, 187);
  margin-bottom: 3px;
}
</style>
