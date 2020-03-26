<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      // 清除登录token，实现退出
      // window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style>

</style>
