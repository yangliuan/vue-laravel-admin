<template>
  <div class="app-container">
    <div>
      <router-link :to="'/administrator-create'">
        <el-button type="primary" style="margin:0 0 20px 20px;" size="small" icon="el-icon-edit">
          添加管理员
        </el-button>
      </router-link>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80" fixed>
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="管理员名称" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录账号" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="绑定手机号" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属管理组" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.group.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账号状态" width="auto">
        <template v-slot="scope">
          <el-button v-if="scope.row.id > 1" type="primary" size="small" icon=""  @click="switchStatusClick(scope.row)">
            {{ scope.row.status == 1 ? '启用' : '禁用' }}
          </el-button>
          <span v-else>{{ scope.row.status == 1 ? '启用' : '禁用' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { featchIndex , switchStatus } from '@/api/permission/admin.js'
import Pagination from '@/components/Pagination'

export default {
  name: 'adminList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      featchIndex(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    switchStatusClick(item){
      console.log(item.id)
      switchStatus(item.id).then(response=>{
        this.listLoading = false
      })
      this.getList()
    }
  }
}

</script>
