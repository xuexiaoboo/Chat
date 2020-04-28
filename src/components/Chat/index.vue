<template>
  <div class="chatBox">
    <!-- 在线用户显示部分 -->
    <div class="connectedList">
      <el-card class="box-card">
        <div slot="header" class="clearfix selectuser">
          <el-input
            placeholder="你想找谁？？"
            v-model="selectUser"
            @keyup.enter.native="showUserInfo(selectUser)"
          ></el-input>
          <el-button type="primary" @click="showUserInfo(selectUser)">搜索</el-button>
        </div>
        <!-- 在线用户List -->
        <el-card shadow="hover" v-for="(item, key) in onlineUsers" :key="key" class="onlineUser">
          <div @click="showUserInfo(item)">{{ item }}</div>
        </el-card>
      </el-card>

      <!-- 用户信息展示 -->
      <UserInfo class="userInfo" ref="userInfo" :userInfo="userInfo" :onlineState="onlineState"></UserInfo>
    </div>
    <!-- 聊天部分 -->
    <div class="chatBody">
      <!-- 视频提示 -->
      <!-- <div class="videoNotify">有用户正在进行视频通话</div> -->
      <div id="chatMsgBox">
        <div v-for="(item, index) in chatList" :key="index" :class="item.type">
          <!-- 头像 -->
          <div class="avatar">{{ item.username }}</div>
          <!-- 消息 -->
          <div class="msg">
            <!-- 图片信息 -->
            <img v-if="item.isImg" :src="item.msg" alt width="200" />
            <!-- 文件信息 -->
            <a
              v-else-if="item.isFile"
              :href="item.msg"
              :download="item.fileName"
              :title="item.fileName"
              style="text-decoration: none;"
            >
              <div class="download" style="display: flex">
                <div
                  style="margin-right: 5px; padding-top: 3px; width: 120px; overflow: hidden;"
                >{{ item.fileName }}</div>
                <el-button icon="el-icon-download" type="text" style="font-size: 27px; padding: 0"></el-button>
              </div>
            </a>
            <!-- 普通信息 -->
            <p v-else v-html="item.msg">
              <!-- {{ item.msg }} -->
            </p>
          </div>
        </div>
      </div>
      <!-- 聊天工具栏 -->
      <div id="toolBar">
        <!-- 图片上传 -->
        <div class="upImgBox">
          <input
            type="file"
            :value="fileValue"
            id="upImageFile"
            @change="ImageToBase64"
            accept="image/jpg, image/jpeg, image/png, image/PNG"
          />
          <el-button type="text" class="upImgBtn" icon="el-icon-picture-outline"></el-button>
        </div>

        <!-- emoji -->
        <el-button type="text" class="iconfont iconsmile" @click="OpenEmotions"></el-button>
        <Emoji ref="emoji" @AppendInputValue="AppendMessageText" v-show="isShowEmoji"></Emoji>

        <!-- 文件发送 -->
        <div class="upFileBox" ref="upFileBox">
          <input type="file" class="upFile" @change="upFile" />
          <el-button icon="el-icon-folder-opened" type="text" class="upFileBtn"></el-button>
        </div>

        <!-- 聊天记录 -->
        <el-button
          icon="el-icon-chat-dot-round"
          type="text"
          class="chatRecordBtn"
          @click="showChatRecord"
        ></el-button>
        <ChatRecord ref="chatRecord" class="chatRecordBox" :chatList="chatList"></ChatRecord>

        <!-- 音视频 -->
        <el-button
          class="videoCallBtn"
          icon="el-icon-video-camera"
          type="text"
          @click="showVideoCall"
        ></el-button>
        <VideoCall ref="videoCall" class="videoCallBox" :ws="ws"></VideoCall>
      </div>
      <!-- 消息发送部分 -->
      <div class="sendBox">
        <el-input v-model="msg" @keyup.enter.native="sendMsg" class="msg"></el-input>
        <el-button type="success" class="sendBtn" @click="sendMsg">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Emoji from "./components/Emoji";
import UserInfo from "./components/UserInfo";
import ChatRecord from "./components/ChatRecord";
import VideoCall from "./components/VideoCall";

export default {
  props: ["ws"],

  components: {
    Emoji: Emoji,
    UserInfo: UserInfo,
    ChatRecord: ChatRecord,
    VideoCall: VideoCall
  },

  data() {
    return {
      msg: "",
      selectUser: "",

      onlineUsers: null,
      userInfo: null,
      onlineState: "",

      chatList: [],
      imgBase64: [],
      fileValue: "",

      emojiInfo: new Map(),
      isShowEmoji: false,

      // 文件发送
      fileContent: {},
      fileName: "",
      fileUrl: [],

      // 音视频提醒
      video: false,

      username: window.sessionStorage.getItem("username")
    };
  },

  mounted() {
    this.sysMsg();
  },

  updated() {
    // 让消息框一直保持在底部，确保看到的消息是最新的
    this.$nextTick(function() {
      var div = document.getElementById("chatMsgBox");
      div.scrollTop = div.scrollHeight;
    });

    // 接收用户信息
    this.ws.onmessage = function(e) {
      //onmessage接收服务端消息
      var data = JSON.parse(e.data);

      switch (data.type) {
        case "sysInfo":
          if (data.video) {
            this.$notify.info({ message: "有用户正在使用视频通话" });
            break;
          }
          this.chatList.push(data);
          this.onlineUsers = data.onlineUsers;
          break;

        case "chatMsg":
          if (data.username === this.username) {
            data.type = "myMsg";
            this.chatList.push(data);
          } else {
            data.type = "anotherMsg";
            this.chatList.push(data);
          }
          this.msg = "";
          break;
        // default:
        //   this.$notify.info({message: '有用户正在进行视频通话'})
      }
    }.bind(this);
  },

  methods: {
    // 发送消息
    sendMsg() {
      // 正则筛选emoji
      var reg = new RegExp(/\[\[[\u4e00-\u9fa5]{1,3}\]\]/g);
      var sendEmojisName = this.msg.match(reg);
      // var sendEmojisUrl = sendEmojisName.forEach((item, index) => {
      //   sendEmojisName[index] = this.emojiInfo.get(item)
      // })
      if (sendEmojisName) {
        for (var i = 0; i < sendEmojisName.length; i++) {
          this.msg = this.msg.replace(
            sendEmojisName[i],
            `<img src='${this.emojiInfo.get(sendEmojisName[i])}'>`
          );
        }
      }

      // new WebSocket创建连接后会触发ws.onopen方法，这里是分开写的，所以，直接调用send给服务端发送
      this.ws.send(
        JSON.stringify({
          msg: this.msg,
          type: "chatMsg",
          sendUser: this.username,
          date: new Date().toLocaleString().toString()
        })
      );
    },

    // 系统提示消息
    sysMsg() {
      this.ws.send(
        JSON.stringify({
          sendUser: this.username,
          type: "sysInfo",
          date: new Date().toLocaleString().toString()
        })
      );

      //onmessage接收服务端消息
      this.ws.onmessage = function(e) {
        var data = JSON.parse(e.data);
        this.chatList.push(data);
        this.onlineUsers = data.onlineUsers;
      }.bind(this);
    },

    // 展示用户信息
    showUserInfo(username) {
      if (username === "") {
        username = this.selectUser;
      }
      if (username === "") {
        return;
      }
      // 获取用户信息
      this.$http
        .get("/users/getUserInfo", {
          params: {
            username: username
          }
        })
        .then(res => {
          var status = res.data.status;
          if (status !== 0) {
            this.selectUser = "";
            return this.$message.error("获取用户信息失败/该用户不存在");
          }
          this.userInfo = res.data;

          // 展示资料卡
          this.$refs.userInfo.isShow = !this.$refs.userInfo.isShow;
          // console.log(this.onlineUsers);

          if (this.onlineUsers.indexOf(username) !== -1) {
            this.onlineState = "[ 在线 ]";
          } else {
            this.onlineState = "[ 不在线 ]";
          }
          this.selectUser = "";
        });
    },

    // 上传图片转base64
    ImageToBase64() {
      let files = document.getElementById("upImageFile").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);

      reader.onload = () => {
        this.ws.send(
          JSON.stringify({
            msg: reader.result,
            type: "chatMsg",
            isImg: true,
            sendUser: this.username,
            date: new Date().toLocaleString().toString()
          })
        );
      };

      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    // 打开表情包弹框
    OpenEmotions() {
      // this.$refs.emoji.OpenEmotion();
      this.isShowEmoji = !this.isShowEmoji;
    },

    //表情选中后追加在input并保存选中表情，用来传给后端
    AppendMessageText(EmotionChinese) {
      this.isShowEmoji = !this.isShowEmoji;
      this.msg += EmotionChinese.emoji;
      this.emojiInfo.set(EmotionChinese.emoji, EmotionChinese.emojiUrl);
    },

    // 文件发送-选择文件
    upFile(e) {
      let file = e.target.files;
      this.fileName = file[0].name;
      if (file.length === 0) {
        return;
      }
      let reader = new FileReader();
      if (typeof FileReader === "undefined") {
        this.$message.info("您的浏览器不支持FileReader接口");
        return;
      }
      reader.readAsArrayBuffer(file[0]);
      reader.onload = function(e) {
        console.log("文件内容");
        console.log(e.target.result);

        const blob = new Blob([e.target.result], {
          type: "application/octet-stream;charset=UTF-8"
        });
        var url = URL.createObjectURL(blob);

        this.ws.send(
          JSON.stringify({
            msg: url,
            type: "chatMsg",
            isFile: true,
            fileName: this.fileName,
            sendUser: this.username,
            date: new Date().toLocaleString().toString()
          })
        );
      }.bind(this);

      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    // 打开聊天记录
    showChatRecord() {
      this.$refs.chatRecord.isShow = !this.$refs.chatRecord.isShow;
    },

    showVideoCall() {
      this.$refs.videoCall.isShow = !this.$refs.videoCall.isShow;
    }
  }
};
</script>

<style scoped>
@import "./css/index.css";
@import "../../assets/css/icon/iconfont.css";
</style>
