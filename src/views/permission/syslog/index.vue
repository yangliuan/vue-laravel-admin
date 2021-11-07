<template>
  <div class="app-container">

    <div class="top-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="日期时间">
          <el-date-picker v-model="searchForm.date_range" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchSubmitClick()">搜索</el-button>
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
          <span>{{ scope.row.admin.name +',账号:' + scope.row.admin.account + ' ID:' + scope.row.admin.id + ' IP:' + scope.row.ip }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作内容" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.log }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="请求方法" width="80">
        <template v-slot="scope">
          <el-tag>{{ scope.row.method }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="接口请求路径" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="请求参数" width="200">
        <template v-slot="scope">
          <el-button type="text" @click="showRequestParamsClick(scope.row.params)">查看参数</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="180" fixed="right">
        <template v-slot="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
     </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getList" />

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
        per_page: 20,
      },
      searchForm: {
        date_range: ['','']
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dialogVisible: false,
      requestParamsText: ''
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
    searchSubmitClick() {
      this.loading = true
      console.log(this.listQuery,this.searchForm)
      const query = { page: this.listQuery.page , per_page: this.listQuery.per_page , start_at: this.searchForm.date_range[0] , end_at: this.searchForm.date_range[1] }
      syslog(query).then((response) => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    showRequestParamsClick(params) {
      let json_str = '<pre style="white-space: pre-wrap;" >' + JSON.stringify(params,null,4) + '</pre>'
      this.$alert(json_str, '请求参数', {
        dangerouslyUseHTMLString: true
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
