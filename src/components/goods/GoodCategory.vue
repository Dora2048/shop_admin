<template>
  <div class="category">
    <el-button type='success' plain @click='showCategoriesDialog'>添加分类</el-button>
    <!-- 分类表格 -->
     <el-table
      :data="CategoriesList"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      style="width: 100%">
      <!-- childKey: 指定子元素集合的属性名，默认值是children -->
      <!-- tree-key: 每个节点的唯一标识 默认值  id   cat_id -->
      <!-- parent-key： 指定当前节点的父节点， 如果不指定，没法收起来 -->
      <!-- level-key: 指定节点的层级 -->
      
      <el-table-tree-column
        label="分类名称"
        prop="cat_name"
        width="180"
        tree-key="cat_id"
        parent-key="cat_pid"
        level-key="cat_level"
        :indentSize="20">
      </el-table-tree-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '是':'否'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="排序"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope='scope'>
          <el-button size='small' plain type="primary" icon="el-icon-edit"></el-button>
          <el-button size='small' plain type="danger" icon="el-icon-delete" @click='delCate(scope.row.cat_id)'></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 40]"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="categoriesAddDialogVisible"
      width="50%">
        <el-form :model='addForm' label-width="80px" ref='addForm' status-icon :rules='rules'>
          <el-form-item label='分类名称' prop='cat_name'>
            <el-input placeholder='请输入分类名称' v-model="addForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label='父级名称'>
            <div class="block">
              <el-cascader
                :options="options"
                :props='props'
                change-on-select
                v-model="addForm.cat_pid"
                >
              </el-cascader>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="categoriesAddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click='addCategory'>确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      CategoriesList: [],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      // 添加分类对话框显示隐藏
      categoriesAddDialogVisible: false,
      addForm: {
        cat_pid: [],
        cat_name: ''
      },
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        cat_name: [
          { require: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      loading: true
    }
  },
  methods: {
    // 获取分类列表
    async getCategoriesList() {
      this.loading = true
      let res = await this.axios({
        method: 'get',
        url: 'categories',
        params: {
          type: [3],
          pagesize: this.pageSize,
          pagenum: this.currentPage
        }
      })
      // console.log(res)
      let { data: { result, total }, meta: { status, msg } } = res
      if (status === 200) {
        this.CategoriesList = result
        this.total = total
      } else {
        this.$message.warning(msg)
      }
      this.loading = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getCategoriesList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCategoriesList()
    },
    // 删除商品分类
    async delCate(id) {
      try {
        await this.$confirm('此操作将删除该商品分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.axios.delete(`categories/${id}`)
        console.log(res)
        let { meta: { status, msg } } = res
        if (status === 200) {
          // 删除成功,提示信息
          this.$message.success(msg)
          // 重新渲染当前页
          this.total--
          this.currentPage = Math.ceil(this.total / this.pageSize)
          this.getCategoriesList()
        } else {
          this.$message.warning(msg)
        }
      } catch (e) {
        this.$message.error('取消删除')
      }
    },
    // 添加商品分类
    async showCategoriesDialog() {
      this.categoriesAddDialogVisible = true
      let res = await this.axios.get('categories', {
        params: { type: [2] }
      })
      // console.log(res)
      let { data, meta: { status } } = res
      if (status === 200) {
        this.options = data
      }
    },
    addCategory() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return false
        // 校验成功，发送请求
        let { cat_pid: catPid, cat_name: catName } = this.addForm
        let res = await this.axios.post('categories', {
          cat_pid: catPid[catPid.length - 1] || 0,
          cat_name: catName,
          cat_level: catPid.length
        })
        // console.log(res)
        let { meta: { status, msg } } = res
        if (status === 201) {
          this.total++
          this.currentPage = Math.ceil(this.total / this.pageSize)
          // 创建成功,重新渲染，提示信息，关闭对话框
          this.getCategoriesList()
          this.$message.success(msg)
          this.$refs.addForm.resetFields()
          this.categoriesAddDialogVisible = false
        } else {
          this.$message.warning(msg)
        }
      })
    }
  },
  created() {
    this.getCategoriesList()
  }
}
</script>

<style lang='less' scoped>
</style>
