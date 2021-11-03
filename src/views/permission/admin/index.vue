<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
    class="tableWrapper"
  >
    <div class="btnWrapper">
      <el-button class="addBtn" @click="onAddClick">添加管理员</el-button>
    </div>
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="id"
        width="100"
        fixed
      />
      <el-table-column
        label="管理员名字"
        prop="name"
        width="auto"
      />
      <el-table-column
        label="登录账号"
        prop="account"
        width="auto"
      />
      <el-table-column
        label="手机号"
        prop="mobile"
        width="auto"
      />
      <el-table-column
        label="归属管理组"
        prop="group"
        width="auto"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.group.title }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="启用状态"
        width="110"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.status == 1 ? '已启用' : '已禁用' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <div class="edit-wrapper">
            <el-link class="edit" @click="onEditClick(scope.row)">编辑</el-link>
            <el-link class="edit" @click="onDeleteClick(scope.row)">删除</el-link>
          </div>
        </template>
      </el-table-column>
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
    <el-dialog
      :visible.sync="dialogVisible"
    >
      <el-form
        v-loading="dialogLoading"
        element-loading-text="加载中..."
        :rules="rules"
        :model="obj"
      >
        <el-form-item
          label="管理员名字"
          prop="name"
        >
          <div class="inputWrapper">
            <el-input
              v-model="obj.name"
              :maxlength="20"
              show-word-limit
            />
          </div>
        </el-form-item>
        <el-form-item label="归属管理组" prop="group_id">
          <div class="roleWrapper">
            <el-radio v-for="(item, index) in radios" :key="index" v-model="obj.group_id" :label="item.id">{{ item.title }}</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-for="(item, index) in radios2" :key="index" v-model="obj.status" :label="item.value">{{ item.label }}</el-radio>
        </el-form-item>
        <el-form-item
          label="绑定手机"
          prop="mobile"
        >
          <div class="inputWrapper">
            <el-input
              v-model="obj.mobile"
              :maxlength="11"
              show-word-limit
            />
          </div>
        </el-form-item>
        <el-form-item
          label="登录账号"
          prop="account"
        >
          <div class="inputWrapper">
            <el-input
              v-model="obj.account"
              :maxlength="20"
              show-word-limit
            />
          </div>
        </el-form-item>
        <el-form-item
          label="登录密码"
          prop="password"
        >
          <div class="inputWrapper">
            <el-input
              v-model="obj.password"
              :maxlength="20"
              type="password"
              show-word-limit
            />
          </div>
        </el-form-item>
      </el-form>
      <el-button class="dialogBtn" @click="onSaveClick">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { getList, add, del, update, getGroup } from '@/api/permission/admin.js'

export default {
  data() {
    return {
      tableData: [],
      obj: { id: 0, name: '', status: 1, group_id: 0 },
      dialogVisible: false,
      loading: false,
      rules: {
        group_id: [{ required: true, message: '归属管理组不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '管理员名字不能为空', trigger: 'blur' }],
        account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '绑定手机不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      radios: [],
      radios2: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      type: '添加',
      page: 1,
      limit: 10,
      total: 0,
      dialogLoading: false
    }
  },
  created() {
    getGroup().then((res) => {
      this.radios = res.data
    })
    this.getList()
  },
  methods: {
    onEditClick(obj) {
      this.type = '编辑'
      this.rules.password[0].required = false
      this.obj = JSON.parse(JSON.stringify(obj))
      this.dialogVisible = true
    },
    onSaveClick() {
      if (!this.obj.group_id || !this.obj.name || this.obj.mobile.length !== 11 || !this.obj.account || !this.obj.password) {
        this.$message('请填入必填内容')
        return
      }
      const params = {
        group_id: this.obj.group_id,
        name: this.obj.name,
        status: this.obj.status,
        mobile: this.obj.mobile,
        account: this.obj.account,
        password: this.obj.password
      }
      this.dialogLoading = true
      if (this.type === '添加') {
        add(params).then((res) => {
          this.getList()
        }).finally(() => {
          this.dialogLoading = false
          this.dialogVisible = false
        })
      } else {
        params.id = this.obj.id
        update(params, this.obj.id).then((res) => {
          this.getList()
        }).finally(() => {
          this.dialogLoading = false
          this.dialogVisible = false
        })
      }
    },
    getList() {
      this.loading = true
      getList(`?page=${this.page}&per_page=${this.limit}`).then((res) => {
        this.tableData = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    onDeleteClick(obj) {
      this.$confirm('确定要删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        del(obj.id).then(() => {
          this.getList()
        }).finally(() => {
          this.loading = false
        })
      })
    },
    onAddClick() {
      this.type = '添加'
      this.obj = { id: 0, name: '', status: 1, group_id: 0, mobile: '', account: '', password: '' }
      this.dialogVisible = true
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
