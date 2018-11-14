<template>
  <div class="goods">
    <el-button plain type='success'>
      添加商品
    </el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      v-loading='loading'
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="120">
      </el-table-column>
      <el-table-column
        prop='goods_weight'
        label="商品重量"
        width='120'>
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size='small' type="primary" icon="el-icon-edit" plain @click='showGoodDialog(scope.row)'></el-button>
          <el-button size='small' type="danger" icon="el-icon-delete" plain @click='delGood(scope.row.goods_id)'></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      background
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    
    <!-- 编辑对话框 -->
  <el-dialog 
    title="提示"
    :visible.sync="editDialogVisible"
    width="50%">
      <el-form :model='editform' label-width='80px' status-icon>
        <el-form-item label='商品名称'>
          <el-tag type="info">{{ editform.goods_name}}</el-tag>
        </el-form-item>
        <el-form-item label='价格'>
          <el-input v-model='editform.goods_price'></el-input>
        </el-form-item>
        <el-form-item label='数量'>
          <el-input v-model='editform.goods_number'></el-input>
        </el-form-item>
        <el-form-item label='重量'>
          <el-input v-model='editform.goods_weight'></el-input>
        </el-form-item>
        <el-form-item label='介绍'>
          <el-input v-model='editform.goods_inroduce'></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click='editGoods(editform.goods_id)'>确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      query: '',
      currentPage: 1,
      pageSize: 5,
      total: 0,
      editDialogVisible: false,
      editform: {
        goods_id: '',
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: ''
      },
      rules: {
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ]
      },
      loading: true
    }
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      this.loading = true
      let res = await this.axios({
        method: 'get',
        url: 'goods',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      // console.log(res)
      let { meta: { status, msg }, data: { goods, total } } = res
      if (status === 200) {
        this.tableData = goods
        this.total = total
      } else {
        this.$message.info(msg)
      }
      this.loading = false
    },
    // 每页条数改变时触发
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getGoodsList()
    },
    // 当前页码改变时触发
    handleCurrentChange(val) {
      this.currentPage = val
      this.getGoodsList()
    },
    // 删除功能
    async delGood(id) {
      try {
        // console.log(id)
        await this.$confirm('确定要删除该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 发送请求
        let res = await this.axios({
          method: 'delete',
          url: `goods/${id}`
        })
        // console.log(res)
        if (res.meta.status === 200) {
          // 成功删除后，重新渲染，定位到第一页
          this.currentPage = 1
          this.getGoodsList()
          // 提示信息
          this.$message.success(res.meta.msg)
        } else {
          this.$message.error(res.meta.msg)
        }
      } catch (e) {
        this.$message.error('已取消删除')
      }
    },
    // 编辑功能
    showGoodDialog(good) {
      this.editDialogVisible = true
      this.editform.goods_id = good.goods_id
      // 数据回显
      this.editform.goods_name = good.goods_name
      this.editform.goods_number = good.goods_number
      this.editform.goods_weight = good.goods_weight
      this.editform.goods_price = good.goods_price
      this.editform.goods_introduce = good.goods_introduce
    },
    async editGoods(id) {
      console.log(id)
      let res = await this.axios.put(`goods/${id}`, this.editform)
      console.log(res)
      let { meta: { status, msg } } = res
      if (status === 200) {
        // 编辑成功后提示
        this.$message.success('编辑成功')
        // 重新渲染当前页
        this.getGoodsList()
      } else {
        this.$message.warning(msg)
      }
      // 关闭对话框
      this.editDialogVisible = false
    }
  },
  created() {
    this.getGoodsList()
  }
}
</script>

<style>
</style>
