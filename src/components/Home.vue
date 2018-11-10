<template>
  <el-container class="home">
    <!-- header -->
    <el-header class="header">
      <div class="logo"></div>
      <div class="mid">
        <h3>电商后台管理系统</h3>
      </div>
      <div class="logout">
        欢迎光临
        <a href="javascipt:;" @click='logout'>退出</a>
      </div>
    </el-header>

    <el-container class="contain">
      <!-- aside -->
      <el-aside width="200px" class="aside">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="/users"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
              unique-opened>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="/users">
                  <i class="el-icon-menu"></i>
                  <span>用户列表</span>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item index="2-1">
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item index="3-1">
                  <i class="el-icon-menu"></i>
                  <span>商品列表</span>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <i class="el-icon-menu"></i>
                  <span>分类参数</span>
                </el-menu-item>
                <el-menu-item index="3-3">
                  <i class="el-icon-menu"></i>
                  <span>商品分类</span>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item index="4-1">
                  <i class="el-icon-menu"></i>
                  <span>订单列表</span>
                </el-menu-item>
              </el-submenu>

              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item index="5-1">
                  <i class="el-icon-menu"></i>
                  <span>数据报表</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!-- main -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
      // this.$axios({
      //   methods: 'get',
      //   url: 'http://localhost:8888/api/private/v1/users',
      //   data: {
      //     pagenum: 1,
      //     pagesize: 2
      //   }
      // }).then(res => {
      //   console.log(res)
      // })
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      this.$confirm('您确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 消息类型对应的图标 success/info/warning/error
        type: 'warning',
        // 是否将取消和关闭区分
        distinguishCancelAndClose: true
      })
        .then(() => {
          // 退出时删除token,并跳转到登录页
          localStorage.removeItem('token')
          this.$router.push('/login')

          this.$message({
            type: 'success',
            message: '退出成功!',
            center: true
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出',
            center: true
          })
        })
    }
  }
}
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
      .el-menu {
        border-right: none;
        min-width: 200px;
      }
    }
    .main {
      background-color: #eaeef1;
      padding: 20px;
    }
  }
}
</style>
