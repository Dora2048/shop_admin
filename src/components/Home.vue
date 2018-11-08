<template>
  <el-container class="home">
    <el-header class="header">
      <div class="logo"></div>
      <div class="mid">
        <h3>电商后台管理系统</h3>
      </div>
      <div class="logout">
        欢迎光临
        <a href="javascipt:;">退出</a>
      </div>
    </el-header>
    <el-container class="contain">
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  .header {
    background-color: #b3c1cd;
    padding: 0 200px;
    position: relative;
    line-height: 60px;
    .logo,
    .logout {
      position: absolute;
      top: 0;
      width: 200px;
      height: 100%;
    }
    .logo {
      left: 0;
      background-image: url('../images/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
    .logout {
      right: 0;
      text-align: right;
      padding-right: 10px;
      a {
        color: darkorange;
      }
    }
    .mid {
      text-align: center;
      color: #fff;
      font-size: 30px;
    }
  }
  .contain {
    height: 100%;
    .aside {
      background-color: #545c64;
    }
    .main {
      background-color: #eaeef1;
    }
  }
}
</style>
