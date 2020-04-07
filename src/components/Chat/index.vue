<template>
  <div class="chatBox">
    <!-- 在线用户显示部分 -->
    <div class="connectedList"></div>
    <!-- 聊天部分 -->
    <div class="chatBody">
      <div id="chatMsgBox">
        <p class="msgContainer" v-for="(item, index) in msgList" :key="index">{{ item }}</p>
      </div>

      <!-- 消息发送部分 -->
      <div class="sendBox">
        <!-- <input type="msg" class="msg" v-model="msg" @keyup.enter="sendMsg" /> -->
        <!-- <button type="button" class="send" @click="sendMsg">发送</button> -->
        <el-input v-model="msg" @keyup.enter.native="sendMsg" class="msg"></el-input>
        <el-button type="success" class="sendBtn" @click="sendMsg">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      ws: new WebSocket("ws://localhost:2333"),

      msg: "",

      msgList: [],

      username: window.sessionStorage.getItem("username")
    };
  },

  mounted() {
    this.sysMsg();
  },

  updated() {
    // 让消息框一直保持在底部，确保看到的消息是最新的
    this.$nextTick(function() {
      var div = document.getElementById('chatMsgBox');
      div.scrollTop = div.scrollHeight;
    });
  },

  methods: {
    sendMsg() {
      // new WebSocket创建连接后会触发ws.onopen方法，这里是分开写的，所以，直接调用send发送
      this.ws.send(
        JSON.stringify({
          msg: this.msg,
          type: "chatMsg",
          time: new Date().toLocaleString().toString()
        })
      ); //send给服务端发送数据
      this.ws.onmessage = function(e) {
        //onmessage接收服务端消息
        this.msgList.push(e.data); //在这里直接push，，继承不到vue的this
      }.bind(this);
      this.msg = "";
    },

    // 系统提示消息
    sysMsg() {
      this.ws.onopen = function() {
        this.ws.send(
          JSON.stringify({
            username: this.username,
            type: "newConnectUser",
            time: new Date().toLocaleString().toString()
          })
        );
      }.bind(this);

      this.ws.onmessage = function(e) {
        //onmessage接收服务端消息
        // this.msgList.push(e.data); //在这里直接push，，继承不到vue的this
        var sysP = document.createElement('p');
        sysP.innerHTML = e.data;
        sysP.style.color = '#00f'
        document.getElementById('chatMsgBox').appendChild(sysP)
      }.bind(this);
    }
  }
};
</script>

<style scoped>
@import "./css/index.css";
</style>
