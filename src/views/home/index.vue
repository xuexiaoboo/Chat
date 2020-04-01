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
      <el-aside width="200px">Aside</el-aside>
      <!-- 首页内容区域 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      // 清除登录token，实现退出
      this.$http.get("/users/logout").then(res => {
        var status = res.data.status;
        if (status === 0) {
          this.$router.replace("/login");
          this.$message.info("退出成功");
        }
        else {
          this.$message.error('退出失败')
        }
      });
    }
  }
};
</script>

<style scoped>
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

.el-main {
  background-color: #eaedf1;
}
</style>
