<template>
  <div class="app-container">
    <div class="top-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="开始时间">
          <el-date-picker v-model="listQuery.start_at" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" align="right" :picker-options="pickerOptions"/>
        </el-form-item>

        <el-form-item label="结束时间">
          <el-date-picker v-model="listQuery.end_at" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" align="right" :picker-options="pickerOptions"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchSubmit()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80" fixed>
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="管理员信息" width="auto">
        <template v-slot="scope">
          <span>{{ '登录账号:' + scope.row.admin.account + ' 名称:' + scope.row.admin.name + ' AID:' + scope.row.admin.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作内容" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.log }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="请求记录" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.method + ' ' + JSON.stringify(scope.row.params) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="180" fixed="right">
        <template v-slot="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { syslog } from '@/api/user.js'
import Pagination from '@/components/Pagination'

export default {
  name: 'Syslog',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        start_at: '',
        end_at: '',
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      syslog(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    searchSubmit() {
      this.loading = true
      syslog(query).then((res) => {
        this.tableData = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
