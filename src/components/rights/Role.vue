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

    <el-button plain type='success' @click='roleAddDialogVisible=true'>添加角色</el-button>
    <!-- 表格 -->
    <el-table
      :data="roleListData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-row v-for='level1 in scope.row.children' :key='level1.id'>
            <!-- 一级权限 -->
            <el-col :span='4'>
              <el-tag
                closable
                @close="removeTag(scope.row,level1.id)">
                {{ level1.authName}}
              </el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>

            <!-- 二级权限 -->
            <el-col :span='20'>
              <el-row v-for='level2 in level1.children' :key='level2.id'>
                <el-col :span='4'>
                  <el-tag closable type='success'
                  @close="removeTag(scope.row,level2.id)">
                    {{ level2.authName}}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>

                <!-- 三级权限 -->
                <el-col :span='16'>
                  <span v-for='level3 in level2.children' :key='level3.id' >
                     <el-tag closable type='danger'
                     @close="removeTag(scope.row,level3.id)">
                      {{ level3.authName}}
                    </el-tag>
                  </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          
        </template>
      </el-table-column>

      <el-table-column
        type='index'
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
          <el-button size='small' type="primary" icon="el-icon-edit" plain @click='showRoleEditDialog(scope.row)'></el-button>
          <el-button size='small' type="danger" icon="el-icon-delete" plain @click='delRole(scope.row.id)'></el-button>
          <el-button size='small' type="success" icon="el-icon-check" plain @click='showRoleAssignDialog(scope.row)'>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配角色对话框 -->
    <el-dialog
      title="角色授权"
      :visible.sync="roleAssignDialogVisible"
      width="50%">
      <!--树形控件分析
      data   展示数据
      shwo-checkbox   节点是否可被选择,默认值false
      node-key   每个树节点的唯一标识
      props   配置选项
      default-expanded-keys   默认展开的节点的 key 的数组
        :default-checked-keys = 'checkedRights'
      default-checked-keys   默认勾选的节点的 key 的数组-->
      <el-tree
        :data="roleData"
        show-checkbox  
        node-key="id"
        ref="tree"
        default-expand-all
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleAssignDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='changeRights(curId)'>确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色对话框 -->
    <el-dialog
    title="添加角色"
    :visible.sync="roleAddDialogVisible"
    width="50%">
      <el-form :model='addForm' ref='addForm' :rules='rules' status-icon label-width="80px">
        <el-form-item label='角色名称' prop='roleName'>
          <el-input placeholder='请输入角色名称' v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input placeholder='请输入角色描述' v-model='addForm.roleDesc' @keyup.enter.native='addRole'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleAddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='addRole'>确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色对话框 -->
    <el-dialog
    title="编辑角色"
    :visible.sync="roleEditDialogVisible"
    width="50%">
      <el-form :model='editForm' status-icon label-width="80px">
        <el-form-item label='角色名称'>
          <el-tag type="info" v-model="editForm.roleName">{{ editForm.roleName }}</el-tag>
        </el-form-item>
        <el-form-item label='描述'>
          <el-input v-model='editForm.roleDesc' @keyup.enter.native='editRole(editForm.id)'></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='editRole(editForm.id)'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleListData: [],
      // 角色授权对话框显示隐藏
      roleAssignDialogVisible: false,
      roleData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      curId: -1,
      // 默认勾选的权限
      // checkedRights: []
      // 添加角色对话框显示隐藏
      roleAddDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ]
      },
      // 编辑角色对话框显示隐藏
      roleEditDialogVisible: false,
      editForm: {
        roleName: '',
        roleDesc: '',
        id: ''
      }
    }
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      let res = await this.axios({
        method: 'get',
        url: 'roles'
      })
      // console.log(res)
      this.roleListData = res.data
    },
    // 删除角色指定权限
    async removeTag(role, rightId) {
      let res = await this.axios.delete(`roles/${role.id}/rights/${rightId}`)
      // console.log(res)
      let { data, meta: { status, msg } } = res
      if (status === 200) {
        // 取消权限成功后，重新渲染当前权限
        role.children = data
        // 提示信息
        this.$message.success(msg)
      }
    },
    // 角色授权对话框显示渲染
    async showRoleAssignDialog(role) {
      this.curId = role.id
      // console.log(role)
      // 显示分配角色对话框
      this.roleAssignDialogVisible = true
      // 发送请求，返回数据,渲染树形列表
      let res = await this.axios({
        method: 'get',
        url: `rights/tree`
      })
      // console.log(res)
      this.roleData = res.data
      this.$nextTick(() => {
        // 通过遍历获取当前角色的权限id,设置数据回显
        let checkedRights = []
        role.children.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              checkedRights.push(level3.id)
            })
          })
        })
        // console.log(checkedRights)

        // this.checkedRights = checkedRights
        this.$refs.tree.setCheckedKeys(checkedRights)
      })
    },
    // 提交修改后的权限
    async changeRights(roleId) {
      // console.log(roleId)
      // 获取所有全选的id
      let checked = this.$refs.tree.getCheckedKeys()
      // 获取所有半选的id
      let halfChecked = this.$refs.tree.getHalfCheckedKeys()
      let res = await this.axios.post(`roles/${roleId}/rights`, {
        rids: [...checked, ...halfChecked].join()
      })
      // console.log(res)
      let { meta: { msg, status } } = res
      if (status === 200) {
        // 更新成功的消息提示
        this.$message.success(msg)
        // 关闭对话框
        this.roleAssignDialogVisible = false
        // 重新渲染
        this.getRoleList()
      }
    },
    // 删除角色功能
    delRole(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await this.axios.delete(`roles/${id}`)
          let { meta: { msg, status } } = res
          if (status === 200) {
            // 重新渲染
            this.getRoleList()
            this.$message.success(msg)
          } else {
            this.$message.warning(msg)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加角色功能
    addRole() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) this.$message.waring('校验失败')
        let res = await this.axios.post('roles', this.addForm)
        // console.log(res)
        let { meta: { msg, status } } = res
        if (status === 201) {
          // 添加成功，重新渲染
          this.getRoleList()
          this.$message.success(msg)
          // 关闭添加对话框
          this.roleAddDialogVisible = false
          // 重置表单
          this.$refs.addForm.resetFields()
        } else {
          this.$message.warning(msg)
        }
      })
    },
    // 编辑角色功能
    showRoleEditDialog(role) {
      this.roleEditDialogVisible = true
      this.editForm.id = role.id
      // 数据回显
      this.editForm.roleName = role.roleName
      this.editForm.roleDesc = role.roleDesc
    },
    async editRole(id) {
      let res = await this.axios.put(`roles/${id}`, this.editForm)
      // console.log(res)
      let { meta: { status, msg } } = res
      if (status === 200) {
        // 编辑成功，关闭对话框,重新渲染
        this.getRoleList()
        this.roleEditDialogVisible = false
        // 提示信息
        this.$message.success('编辑成功')
      } else {
        this.$message.warning(msg)
      }
    }
  },
  created() {
    this.getRoleList()
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
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
