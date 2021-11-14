<template>
  <div class="app-container">
    <div class="top-container">
      <router-link :to="'/permission/adminrules/create'">
        <el-button type="primary">添加</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">>
      <el-table-column align="center" label="ID" width="80" fixed>
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="规则标题" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="icon" width="80">
        <template v-slot="scope">
          <span>{{ scope.row.icon }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="gui类型" width="90">
        <template v-slot="scope">
          <el-tag>{{ scope.row.gui_type === 1 ? '主菜单' : scope.row.gui_type === 2 ? '子菜单' : '路由|按钮' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="gui规则" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.gui_behavior }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="api方法" width="100">
        <template v-slot="scope">
          <el-tag>{{ scope.row.api_http_method }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="api路由和参数" width="auto">
        <template v-slot="scope">
          <span>{{ scope.row.params ? scope.row.api_behavior + '?' + scope.row.params : scope.row.api_behavior }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="启用状态" width="100">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="switchStatusClick(scope.row)">{{ scope.row.status == 1 ? '启用' : '禁用' }}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="日志状态" width="100">
        <template v-slot="scope">
          <el-button type="primary" plain size="small" @click="switchLogStatusClick(scope.row)">{{ scope.row.is_log == 1 ? '启用' : '禁用' }}</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序值" width="80">
        <template v-slot="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="180">
        <template v-slot="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180" fixed="right">
        <template v-slot="scope">
          <router-link :to="'/permission/adminrules/edit/'+scope.row.id">
            <el-button type="text">编辑</el-button>
          </router-link>
          <el-button type="text" @click="destroyClick(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getList" />
  </div>
</template>

<script>
import { indexRules, switchRulesStatus, switchRulesLogStatus, destroyRules } from '@/api/permission/rules.js'
import Pagination from '@/components/Pagination'

export default {
  name: 'IndexAdminRules',
  components: { Pagination },
  data() {
    return {
      list: [],
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
      indexRules(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    switchStatusClick(params) {
      this.loading = true
      switchRulesStatus(params.id).then(response => {
        params.status = Math.abs(1 - params.status)
        this.loading = false
      })
    },
    switchLogStatusClick(params) {
      this.loading = true
      switchRulesLogStatus(params.id).then(response => {
        params.is_log = Math.abs(1 - params.is_log)
        this.loading = false
      })
    },
    destroyClick(params) {
      this.loading = true
      destroyRules(params).then(response => {
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
