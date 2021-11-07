<template>
  <div class="app-container">
    <div class="top-container">
      <router-link :to="'/permission/admingroup/create'">
        <el-button type="primary">添加</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80" fixed>
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="管理组名称" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="启用状态" width="100">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="switchStatusClick(scope.row)">{{ scope.row.status == 1 ? '启用' : '禁用' }}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="180">
        <template v-slot="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template v-slot="scope">
          <router-link :to="'/permission/admingroup/edit/'+scope.row.id">
            <el-button type="text">编辑</el-button>
          </router-link>
          <el-button type="text" @click="destroyClick(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { indexGroup , destroyGroup , switchGroupStatus } from '@/api/permission/group.js'
import Pagination from '@/components/Pagination'

export default {
  name: 'IndexGroup',
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
      indexGroup(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    switchStatusClick(params) {
      this.loading = true
      switchGroupStatus(params.id).then(response => {
        params.status = Math.abs(1 - params.status)
        this.loading = false
      })
    },
    destroyClick(params) {
      this.loading = true
      destroyGroup(params).then(response => {
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
