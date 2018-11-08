<template>
<div class="login">
  <el-form ref="form" :model="form" label-width="80px" :rules='rules' class='loginForm'>
    <div class="img"></div>
    <el-form-item label="用户名" prop='username'>
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop='password'>
      <el-input v-model="form.password" type='password'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">确认</el-button>
      <el-button @click='reset'>取消</el-button>
    </el-form-item>
  </el-form>
</div>

</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录功能
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios
            .post('http://localhost:8888/api/private/v1/login', this.form)
            .then(res => {
              console.log(res.data)
              if (res.data.meta.status === 200) {
                // 登陆成功消息提示框
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  center: true
                })
                // 存储token
                localStorage.setItem('token', res.data.data.token)
                // 登录成功后跳转到home组件
                this.$router.push('/home')
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error',
                  center: true
                })
              }
            })
        } else {
          console.log('校验失败')
          return false
        }
      })
    },
    // 取消登录
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  height: 100%;
  background-color: #fff;
  background-color: #2d434c;
  overflow: hidden;
  .loginForm {
    width: 400px;
    border-radius: 20px;
    padding: 80px 40px 20px;
    background-color: #fff;
    margin: 200px auto;
    position: relative;
    .img {
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      background-image: url('../images/70.jpg');
      background-size: contain;
      // background-repeat: no-repeat;
      border-radius: 50%;
      top: -50px;
    }
  }
}
</style>
