<template>
<div class="users">
  <!-- 面包屑导航 -->
  <el-row class="nav">
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/home">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  
  <!-- 搜索 -->
  <el-row :gutter="20">
    <el-col :span="12">
      <el-input placeholder="请输入内容" class="input-with-select" v-model='query'>
        <el-button slot="append" icon="el-icon-search"  @click='search'></el-button>
      </el-input>
    </el-col>
    <el-button type="success" plain>添加用户</el-button>
  </el-row>
  
  <!-- 表格 -->
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="100">
    </el-table-column>

    <el-table-column
      prop="email"
      label="邮箱"
      width="220">
    </el-table-column>
    
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>

    <el-table-column
      prop="status"
      label="用户状态"
      width="180">
      <template slot-scope='scope'>
        <!-- {{ scope.row}} -->
        <el-switch
          v-model="scope.row.mg_state"
          active-color="#409EFF"
          inactive-color="#C0CCDA">
        </el-switch>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" plain></el-button>
        <el-button type="danger" icon="el-icon-delete" plain @click='del(scope.row.id)'></el-button>
        <el-button type="success" icon="el-icon-check" plain>分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <!-- 分页 -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[2, 4, 6, 8]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    background>
  </el-pagination>

</div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      // 当前页
      currentPage: 1,
      // 每页显示的条数
      pageSize: 2,
      // 表格的数据
      tableData: [],
      // 总条数
      total: 0
    }
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        // console.log(res.data.data.users)
        // console.log(res.data.data.total)
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data.users
          this.total = res.data.data.total
        } else {
          this.$message.info(res.data.meta.msg)
        }
      })
    },
    // 每页条数改变时会触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      // 每次改变每页显示条数时都显示第一页的结果
      this.currentPage = 1
      // 重置每一页显示的条数
      this.pageSize = val
      this.getUserList()
    },
    // 当前页码改变时会触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getUserList()
    },
    // 筛选功能
    search() {
      // 搜索时每次都将搜索结果都从第一页查看
      this.currentPage = 1
      this.getUserList()
    },
    // 删除功能
    del(id) {
      this.$confirm('您确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 发送请求
          this.$axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              // 成功删除后，重新渲染，定位到第一页
              this.currentPage = 1
              this.getUserList()
              // 提示信息
              this.$message.success(res.data.meta.msg)
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang='less' scoped>
.users {
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
