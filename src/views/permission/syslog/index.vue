<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
    class="tableWrapper"
  >
    <el-table
      border
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
    <el-table-column
        label="ID"
        prop="id"
        width="100"
        fixed
      />
    <el-table-column
      label="管理员信息"
      prop="admin"
      width="auto"
      :formatter="formatter"
    />
    <el-table-column
      label="操作内容"
      prop="log"
      width="auto"
    />
    <el-table-column
      label="IP"
      prop="ip"
      width="100"
    />
    <el-table-column
      label="请求方法"
      prop="method"
      width="80"
    />
    <el-table-column
      label="请求参数"
      prop="params"
      width="auto"
      :formatter="formatter"
    />
    <el-table-column
      label="创建时间"
      prop="created_at"
      width="200"
      fixed="right"
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
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getList() {
      this.loading = true
      syslog(`?page=${this.page}&per_page=${this.limit}`).then((res) => {
        this.tableData = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    formatter:function(row,column){
      //console.log(column)
      switch (column.label) {
        case '管理员信息':
          return '登录账号:'+row.admin.account+' 名称:'+row.admin.name+' AID:'+row.admin.id
        case '请求参数':
          return JSON.stringify(row.params)
      }
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
