<template>
  <div class="app-container">
    <div class="top-container">
      <router-link :to="'/permission/admin/create'">
        <el-button type="primary">添加</el-button>
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

      <el-table-column align="center" label="绑定手机号" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="登录账号" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属管理组" width="auto">
        <template v-slot="scope">
          <el-tag>{{ scope.row.group.title }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="启用状态" width="100">
        <template v-slot="scope">
          <span v-if="scope.row.id == 1">{{ scope.row.status == 1 ? '启用' : '禁用' }}</span>
          <el-button v-else type="primary" plain size="small" @click="switchStatusClick(scope.row)">{{ scope.row.status == 1 ? '启用' : '禁用' }}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="180">
        <template v-slot="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template v-slot="scope">
          <router-link :to="'/permission/admin/edit/'+scope.row.id">
            <el-button type="text">编辑</el-button>
          </router-link>
          <el-button v-if="scope.row.id > 1" type="text" @click="destroyClick(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getList" />

  </div>
</template>

<script>
import { indexAdmin, switchAdminStatus, destroyAdmin } from '@/api/permission/admin.js'
import Pagination from '@/components/Pagination'

export default {
  name: 'IndexAdmin',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        per_page: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      indexAdmin(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    switchStatusClick(params) {
      this.loading = true
      switchAdminStatus(params.id).then(response => {
        params.status = Math.abs(1 - params.status)
        this.loading = false
      })
    },
    destroyClick(params) {
      this.loading = true
      destroyAdmin(params).then(response => {
        this.loading = false
        this.getList()
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
