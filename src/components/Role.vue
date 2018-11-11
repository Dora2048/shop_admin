<template>
  <div class="role">
    <!-- 面包屑导航 -->
    <el-row class="nav">
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div class="manager">
              
              <el-button type="primary" plain>商品管理<i class="el-icon-close el-icon--right"></i></el-button>
              <i class="el-icon-arrow-right el-icon--right"></i>

              <el-button type="success" plain>商品列表<i class="el-icon-close el-icon--right"></i></el-button>
              <i class="el-icon-arrow-right el-icon--right"></i>

              <el-button type="warning" plain>添加商品<i class="el-icon-close el-icon--right"></i></el-button>
            </div>
            
            

          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="#"
        prop="id"
        width='120'>
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
        width='180'>
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc"
        width='180'>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size='small' type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size='small' type="danger" icon="el-icon-delete" plain></el-button>
          <el-button size='small' type="success" icon="el-icon-check" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.axios({
      method: 'get',
      url: 'roles'
    }).then(res => {
      console.log(res)
      this.tableData = res.data.data
    })
  }
}
</script>

<style lang='less' scoped>
.role {
  width: 100%;
  height: 100%;
  .nav {
    width: 100%;
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
      width: 100%;
      padding-left: 10px;
      background-color: #d4dae0;
    }
  }
}
</style>
