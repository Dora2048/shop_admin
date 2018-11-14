<template>
  <div>orders</div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async getOrderList() {
      let res = await this.axios({
        methods: 'get',
        url: 'orders',
        params: {
          query: this.query,
          pagesize: this.pageSize,
          pagenum: this.currentPage
        }
      })
      console.log(res)
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style>
</style>
