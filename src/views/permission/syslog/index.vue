<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
    class="tableWrapper"
  >
    <el-table
      border
      :data="tableData"
      style="width: 90%"
    >
    <el-table-column
        label="ID"
        prop="id"
        width="80"
      />
      <el-table-column
        label="管理员名字"
        prop="admin.name"
        width="160"
      />
      <el-table-column
        label="管理员登录账号"
        prop="admin.account"
        width="160"
      />
      <el-table-column
        label="IP"
        prop="ip"
        width="160"
      />
      <el-table-column
        label="请求方法"
        prop="method"
        width="160"
      />
      <el-table-column
        label="请求参数"
        prop="method"
        width="160"
      />
      <el-table-column
        label="创建时间"
        prop="created_at"
        width="160"
      />
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      class="pageWaprrer"
      :total="total"
      :current-page.sync="page"
      @prev-click="onPrevClick"
      @next-click="onNextClick"
      @current-change="onCurrentChange"
    />
  </div>
</template>
<script>
import { syslog } from '@/api/user.js'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      loading: false,
      rules: {},
      page: 1,
      limit: 10,
      total: 0,
      dialogLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      syslog(`?page=${this.page}&per_page=${this.limit}`).then((res) => {
        this.tableData = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    onPrevClick() {
      if (this.page > 1) {
        this.page--
      }
    },
    onNextClick() {
      this.page++
    },
    onCurrentChange(val) {
      this.page = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.tableWrapper {
  margin: 20px;
}
.dialogBtn {
  margin-top: 20px;
  margin-left: 25px;
  width: 100px;
}
.img {
  max-height: 400px;
}
.addBtn {
  margin-bottom: 20px;
}
.edit-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.inputWrapper {
  width: 400px;
  display: inline-block;
}
.linkWrapper {
  margin-left: 100px;
  width: 400px;
}
.btnWrapper {
  display: flex;
}
.searchWrapper {
  margin: 0 20px;
}
.provinceWrapper {
  position: relative;
}
.pageWaprrer {
  margin-top: 20px;
  display: inline-block;
  margin-left: 120px;
}
.roleWrapper {
  margin-left: 100px;
}
</style>
