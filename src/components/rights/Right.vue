<template>
  <div class="right">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if='scope.row.level === "0"'>一级</span>
          <span v-else-if='scope.row.level === "1"'>二级</span>
          <span v-else>三级</span>
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
  async created() {
    let res = await this.axios({
      method: 'get',
      url: `rights/list`
    })
    // console.log(res)
    this.tableData = res.data
  }
}
</script>

<style lang='less' scoped>
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
  background-color: #d4dae0;
  padding-left: 10px;
}
</style>
