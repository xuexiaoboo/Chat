<template>
  <div class="register_container">
    <div class="register_box">
      <el-page-header @back="goBack" class="back" content="注册页"></el-page-header>
      <!-- register_form -->
      <el-form
        label-width="0px"
        class="register_form"
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerFormRules"
      >
        <!-- userName -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="registerForm.username"></el-input>
        </el-form-item>
        <!-- passWord -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
            v-model="registerForm.password"
          ></el-input>
        </el-form-item>
        <!-- email -->
        <el-form-item prop="email">
          <el-input
            prefix-icon="el-icon-message"
            placeholder="请输入注册邮箱"
            v-model="registerForm.email"
          ></el-input>
        </el-form-item>
        <!-- verifyCode -->
        <el-form-item class="verifyCode">
          <el-input
            prefix-icon="el-icon-warning-outline"
            placeholder="请输入验证码"
            v-model="registerForm.verifycode"
          ></el-input>
          <el-button class="verifyBtn" type="info" @click="sendVerifyCode" :loading="this.sendVerifyState">发送验证码</el-button>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="register" :loading="this.registerState">注册</el-button>
          <el-button type="info" @click="resetRegisterForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 注册信息
      registerForm: {
        username: "",
        password: "",
        email: "",
        verifycode: ""
      },
      // 注册信息校验
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        // 验证邮箱是否合法
        email: [
          { required: true, message: "请输入正确的邮箱地址", trigger: "blur" },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ]
      },

      // 验证码发送状态
      sendVerifyState: false,
      // 注册请求状态
      registerState: false
    };
  },

  methods: {
    // 重置表单
    resetRegisterForm() {
      // this是这个template模板对象
      this.$refs.registerFormRef.resetFields();
    },

    goBack() {
      this.$router.back();
    },

    // 发送验证码
    sendVerifyCode() {
      this.sendVerifyState = true;
      this.$http.get('/users/verify?email='+this.registerForm.email).then((res) => {
        var status = res.data.status;
        if(status === 0) {
          this.sendVerifyState = false
          this.$message.success('验证码发送成功')
        }
        else {
          this.sendVerifyState = false
          this.$message.error('验证码发送失败')
        }
      })
    },

    //注册
    register() {
      if(this.registerForm.username === ''|| this.registerForm.password === '' || this.registerForm.email === '' || this.registerForm.verifycode === '') {
        return this.$message.error('请确认注册信息填写完整')
      }
      this.registerState = true;
      this.$http.post('/users/register', {
        username: this.registerForm.username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        verify: this.registerForm.verifycode
      }).then((res) => {
        var status = res.data.status
        if(status === 0) {
          this.registerState = false
          this.$message.success('注册成功')
          this.goBack();
        }
        else {
          this.registerState = false
          this.$message.error(res.data.msg)
        }
      })
    } 
  }
};
</script>


<style scoped>
.back {
  position: relative;
  top: 16px;
  left: -14px;
}

.register_container {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register_box {
  width: 450px;
  height: 500px;
  background-color: #fff;
  padding: 0 30px 0 30px;
  border-radius: 10px;
}

.register_form {
  margin-top: 100px;
}

.btns {
  display: flex;
  justify-content: center;
  vertical-align: bottom;
  margin-top: 70px;
}

.verifyCode .el-input {
  width: 68%;
  margin-right: 13px;
}
</style>

