<template>
<div class='login-container'>
  <el-form :model="loginForm" ref="login" label-width="100px" class="login-form">
    <el-form-item label='用户名' prop='username' 
      :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符',trigger: 'blur' }
      ]">
      <el-input type='username' v-model.trim='loginForm.username'></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      :rules="[
        { required: true, message: '密码不能为空',trigger: 'blur' },
        { type: 'number', message: '密码必须为字符值'}
      ]"
    >
      <el-input type="password" v-model.number="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</div>

</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        password: '',
        username: ''
      }
    };
  },
  methods: {
    login() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          // alert('submit!');
          console.log(valid)
          this.$axios.post('http://localhost:8888/api/private/v1/', this.loginForm).then(res => {
            console.log(res)
          }).catch()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.login.resetFields();
    }
  }
}  
</script>
<style>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-form {
  width: 400px;
  padding: 20px;
  border-radius: 15px;
  margin: 200px auto;
  background-color: #fff;
}
</style>
