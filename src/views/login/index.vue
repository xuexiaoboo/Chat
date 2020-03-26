<template>
  <div class="login_container">
    <div class="login_box">
      <!-- avatar -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" />
      </div>
      <!-- login_form -->
      <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!-- userName -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- passWord -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单绑定对象
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 登录表单验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    // 重置表单
    resetLoginForm() {
      // this是这个template模板对象
      this.$refs.loginFormRef.resetFields()
    },
    // 登录
    login() {
      // 登录预验证，element组件方法
      this.$refs.loginFormRef.validate((valid) => {
        // 这里之后写登录的请求，以及登陆后用户token的保存
        this.$message.success('登录成功')
        this.$router.replace("/home")
      })
    }
  }
};
</script>

<style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  padding: 0 30px 0 30px;
  border-radius: 10px;
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  margin-top: 100px;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>
