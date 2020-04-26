<template>
  <div class="EmoticonListCover">
    <div class="EmoticonList">
      <div
        class="PicItem"
        v-for="(item,index) in EmotionList"
        @click="ClickEmoticon(index)"
        :key="index"
      >
        <img
          :src=" 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + index + '.gif'"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Emoji",
  data() {
    return {
      // isShow: false,
      EmotionList: [
        "微笑",
        "撇嘴",
        "色",
        "发呆",
        "得意",
        "流泪",
        "害羞",
        "闭嘴",
        "睡",
        "大哭",
        "尴尬",
        "发怒",
        "调皮",
        "呲牙",
        "惊讶",
        "难过",
        "酷",
        "冷汗",
        "抓狂",
        "吐",
        "偷笑",
        "可爱",
        "白眼",
        "傲慢",
        "饥饿",
        "困",
        "惊恐",
        "流汗",
        "憨笑",
        "大兵",
        "奋斗",
        "咒骂",
        "疑问",
        "嘘",
        "晕",
        "折磨",
        "衰",
        "骷髅",
        "敲打",
        "再见",
        "擦汗",
        "抠鼻",
        "鼓掌",
        "糗大了",
        "坏笑",
        "左哼哼",
        "右哼哼",
        "哈欠",
        "鄙视",
        "委屈",
        "快哭了",
        "阴险",
        "亲亲",
        "吓",
        "可怜",
        "菜刀",
        "西瓜",
        "啤酒",
        "篮球",
        "乒乓",
        "咖啡",
        "饭",
        "猪头",
        "玫瑰",
        "凋谢",
        "示爱",
        "爱心",
        "心碎",
        "蛋糕",
        "闪电",
        "炸弹",
        "刀",
        "足球",
        "瓢虫",
        "便便",
        "月亮",
        "太阳",
        "礼物",
        "拥抱",
        "强",
        "弱",
        "握手",
        "胜利",
        "抱拳",
        "勾引",
        "拳头",
        "差劲",
        "爱你",
        "NO",
        "OK",
        "爱情",
        "飞吻",
        "跳跳",
        "发抖",
        "怄火",
        "转圈",
        "磕头",
        "回头",
        "跳绳",
        "挥手",
        "激动",
        "街舞",
        "献吻",
        "左太极",
        "右太极"
      ]
    };
  },
  methods: {
    // 选中表情
    ClickEmoticon(EmoticonNo) {
      // this.isShow = false;
      this.$emit("AppendInputValue", {
        emoji: "[[" + this.EmotionList[EmoticonNo] + "]]",
        emojiUrl: 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + EmoticonNo + '.gif',
      });
    },
    //   点击弹出表情组件
  //   OpenEmotion() {
  //     this.isShow = !this.isShow;
  //   }
  }
};
</script>

<style scoped>
.EmoticonListCover {
  width: 239px;
  overflow: hidden;
  position: absolute;
  left: 57px;
  bottom: 54px;
  background-color: rgb(252, 252, 252);
  padding: 3px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.EmoticonListCover .EmoticonList {
  display: flex;
  width: 257px;
  height: 170px;
  overflow-y: scroll;
  flex-wrap: wrap;
}
</style>
