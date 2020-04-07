<template>
  <!-- element-ui中的元素名就是他的classname -->
  <el-container class="home-container">
    <!-- 首页头部区域 -->
    <el-header>
      <div>
        <!-- 到时候来个png图片当图标 -->
        <img src="../../assets/images/logo.png" alt />
        <span>Wow!!聊天</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 首页主体区域 -->
    <el-container>
      <!-- 首页侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :default-active="pickPath"
        >
          <el-menu-item index="/chat" @click="saveNavState('/chat')">
            <template slot="title">
              <i class="el-icon-chat-line-square"></i>
              <span>来聊啊</span>
            </template>
          </el-menu-item>
          <el-menu-item index="watch" @click="saveNavState('/watch')">
            <template slot="title">
              <i class="el-icon-crop"></i>
              <span>来看呐</span>
            </template>
          </el-menu-item>
          <el-menu-item index @click="saveNavState('')">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>待定啊</span>
            </template>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>来玩啊</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/game1" @click="saveNavState('/game1')">2048</el-menu-item>
            <el-menu-item index>~没做~</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 首页内容区域 -->
      <el-main>
        <!-- 二级路由占位 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: sessionStorage.getItem("username"),

      pickPath: ""
    };
  },

  created() {
    this.pickPath = window.sessionStorage.getItem("pickPath");
  },

  mounted() {
    
  },

  destroyed() {
    
  },

  methods: {
    // 退出账户
    logout() {
      // 清除登录token，实现退出
      this.$http.get("/users/logout").then(res => {
        var status = res.data.status;
        if (status === 0) {
          sessionStorage.clear();
          this.$router.replace("/login");
          this.$message.info("退出成功");
        } else {
          this.$message.error("退出失败");
        }
      });
    },

    // 菜单选择高亮
    saveNavState(pickPath) {
      sessionStorage.setItem("pickPath", pickPath);
    },
  }
};
</script>

<style scoped>
.el-main {
  padding: 0;
}

.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-header div {
  display: flex;
  align-items: center;
}

.el-header img {
  width: 60px;
  height: 50px;
  margin-right: 10px;
}

.el-aside {
  background-color: #333744;
}
.el-aside .el-menu {
  border-right: 0;
}

.el-main {
  background-color: #eaedf1;
}
</style>
