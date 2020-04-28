<template>
  <div class="videoCall" v-if="isShow">
    <div class="boxHead">
      <div class="headTitle">
        <span>视频聊天</span>
        <div class="videoBtn">
          <el-button
            style=" font-size: 12px; padding: 10px"
            @click="createClient(userId)"
            class="joinBtn"
            type="primary"
          >加入视频</el-button>
          <el-button style=" font-size: 12px; padding: 10px" @click="close" class="closeBtn">退出视频</el-button>
        </div>
      </div>
    </div>
    <div class="boxBody">
      <div class="center-page" v-if="isJoinVideoRoom">
        <!-- <div id="local_stream" class="local-stream" v-for="(item, index) in videoUser" :key="index"></div> -->
        <div id="local_stream" class="local-stream"></div>
        <!-- <div v-html="remoteStream" :class="remoteStream?'distant-stream':''"></div> -->
        <div v-html="remoteStream" id="remoteStream"></div>
      </div>
    </div>
  </div>
</template>

<script>
//前端测试要导入demo里lib-generate-test-usersig.min.js，不然签名无法成功，后面要从后端签名后返回值。
import LibGenerateTestUserSig from "@/assets/js/lib/lib-generate-test-usersig.min.js";
// 导入SDK
import TRTC from "trtc-js-sdk";

export default {
  name: "VideoCall",
  props: ["ws"],

  data() {
    return {
      isShow: false,
      isJoinVideoRoom: false,

      videoUser: [1, 2, 3, 4, 5],

      // 音视频
      userId: "user_" + parseInt(Math.random() * 100000000), //用户id --可更改
      // userId: window.sessionStorage.getItem("username"),//用户id --可更改
      roomId: 888888, //房间号--加入相同房间才能聊
      client: "", //客户端服务
      remoteStream: "", //远方播放流
      localStream: "" //本地流
    };
  },

  destroyed() {
    this.leaveRoom(client);
  },

  methods: {
    close() {
      this.isShow = !this.isShow;
      this.leaveRoom(this.client);
    },

    // 音视频
    // 创建连接
    createClient(userId) {
      //获取签名
      const config = this.genTestUserSig(userId);
      const sdkAppId = config.sdkAppId;
      const userSig = config.userSig;
      this.client = TRTC.createClient({
        mode: "videoCall",
        sdkAppId,
        userId,
        userSig
      });
      //注册远程监听，要放在加入房间前--这里用了发布订阅模式
      this.subscribeStream(this.client);
      //初始化后才能加入房间
      this.joinRoom(this.client, this.roomId);
    },

    //加入房间
    joinRoom(client, roomId) {
      client
        .join({ roomId })
        .catch(error => {
          console.error("进房失败 " + error);
        })
        .then(() => {
          console.log("进房成功");
          //创建本地流
          this.createStream(this.userId);
          //播放远端流
          this.playStream(this.client);
        });
        this.isJoinVideoRoom = true

        // this.ws.send(JSON.stringify({
        //     video: true
        // }))
    },

    //创建本地音视频流
    createStream(userId) {
      const localStream = TRTC.createStream({
        userId,
        audio: true,
        video: true
      });
      this.localStream = localStream;

      //初始化本地音视频流
      localStream
        .initialize()
        .catch(error => {
          console.error("初始化本地流失败 " + error);
        })
        .then(() => {
          console.log("初始化本地流成功");
          // 创建好后才能播放 本地流播放 local_stream 是div的id
          localStream.play("local_stream");
          //创建好后才能发布
          this.publishStream(localStream, this.client);
        });
    },

    //发布本地音视频流
    publishStream(localStream, client) {
      client
        .publish(localStream)
        .catch(error => {
          console.error("本地流发布失败 " + error);
        })
        .then(() => {
          console.log("本地流发布成功");
        });
    },

    //订阅远端流--加入房间之前
    subscribeStream(client) {
      client.on("stream-added", event => {
        const remoteStream = event.stream;
        console.log("远端流增加: " + remoteStream.getId());
        //订阅远端流
        client.subscribe(remoteStream);
      });
    },

    //播放远端流
    playStream(client) {
      client.on("stream-subscribed", event => {
        const remoteStream = event.stream;
        console.log("远端流订阅成功：" + remoteStream.getId());
        // 创建远端流标签，因为id是动态的，所以动态创建，用了v-html

        this.remoteStream = `<view id="${"remote_stream-" +
          remoteStream.getId()}"  ></view>`;

        //做了dom操作 需要使用$nextTick(),否则找不到创建的标签无法进行播放
        this.$nextTick(() => {
          //播放
          remoteStream.play("remote_stream-" + remoteStream.getId());
        });
      });
    },

    //退出音视频
    leaveRoom(client) {
      client
        .leave()
        .then(() => {
          console.log("退房成功");
          // 停止本地流，关闭本地流内部的音视频播放器
          this.localStream.stop();
          // 关闭本地流，释放摄像头和麦克风访问权限
          this.localStream.close();
          this.localStream = null;
          this.client = null;

          // 关闭页面摄像头调用
          const videoTrack = localStream.getVideoTrack();
          if (videoTrack) {
            localStream.removeTrack(videoTrack).then(() => {
              console.log("remove video call success");
              // 关闭摄像头
              videoTrack.stop();
            });
          }
          // 退房成功，可再次调用client.join重新进房开启新的通话。
        })
        .catch(error => {
          console.error("退房失败 " + error);
          // 错误不可恢复，需要刷新页面。
        });
        this.isJoinVideoRoom = false
    },

    //获取用户签名--前端测试用
    genTestUserSig(userID) {
      const SDKAPPID = 1400361271;
      /**
       * 签名过期时间，建议不要设置的过短
       * <p>
       * 时间单位：秒
       * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
       */
      const EXPIRETIME = 604800;
      /**
       * 计算签名用的加密密钥，获取步骤如下：
       *
       * step1. 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav )，如果还没有应用就创建一个，
       * step2. 单击“应用配置”进入基础配置页面，并进一步找到“帐号体系集成”部分。
       * step3. 点击“查看密钥”按钮，就可以看到计算 UserSig 使用的加密的密钥了，请将其拷贝并复制到如下的变量中
       *
       * 注意：该方案仅适用于调试Demo，正式上线前请将 UserSig 计算代码和密钥迁移到您的后台服务器上，以避免加密密钥泄露导致的流量盗用。
       * 文档：https://cloud.tencent.com/document/product/647/17275#Server
       */
      const SECRETKEY =
        "a1573522e39154d97152c899b7b430320614460502c9541c8f55e93bddf889f7";

      // a soft reminder to guide developer to configure sdkAppId/secretKey
      if (SDKAPPID === "" || SECRETKEY === "") {
        alert(
          "请先配置好您的账号信息： SDKAPPID 及 SECRETKEY " +
            "\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js"
        );
      }
      const generator = new LibGenerateTestUserSig(
        SDKAPPID,
        SECRETKEY,
        EXPIRETIME
      );
      const userSig = generator.genTestUserSig(userID);
      return {
        sdkAppId: SDKAPPID,
        userSig: userSig
      };
    }
  }
};
</script>

<style scoped>
.videoCall {
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

.videoCall .boxHead {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.videoCall .boxHead .headTitle {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
}

.videoCall .boxBody {
  width: 105%;
  height: 87%;
  margin-top: 10px;
  overflow: auto;
}

.videoCall .boxBody .center-page {
  display: flex;
  flex-wrap: wrap;
}

#local_stream {
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 20px;
  margin-left: 30px;
  overflow: hidden;
}

#remoteStream {
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 20px;
  margin-left: 30px;
  overflow: hidden;
}
</style>
