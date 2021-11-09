<template>
  <div class="app-container">

    <el-form ref="postForm" :model="postForm" :rules="rules" label-width="100px" class="form-container">
      <el-form-item label="管理员名字" prop="name">
        <el-input v-if="!postForm.id || postForm.id > 1" v-model="postForm.name" placeholder="请输入管理员名称" clearable />
        <el-input v-else v-model="postForm.name" :disabled="true" />
      </el-form-item>

      <el-form-item v-if="!postForm.id || postForm.id > 1" label="归属管理组" prop="group_id">
        <el-select v-model="postForm.group_id" filterable placeholder="请选择管理组" :loading="loading">
          <el-option v-for="item in group_select_menus" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="!postForm.id || postForm.id > 1" label="启用状态" prop="status">
        <el-radio v-for="(item, index) in status_radios" :key="index" v-model="postForm.status" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item label="绑定手机" prop="mobile">
        <el-input v-model="postForm.mobile" placeholder="请输入合法手机号" clearable />
      </el-form-item>

      <el-form-item label="登录账号" prop="account">
        <el-input v-model="postForm.account" placeholder="请输入登录账号" clearable />
      </el-form-item>

      <el-form-item label="登录密码" prop="password">
        <el-input v-model="postForm.password" placeholder="请输入密码" show-password />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('postForm')">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { groupSelectMenus } from '@/api/permission/group.js'
import { storeAdmin, getAdmin, updateAdmin } from '@/api/permission/admin.js'

const defaultForm = {
  name: '',
  group_id: '',
  status: 1,
  mobile: '',
  account: '',
  password: '',
  id: ''
}

export default {
  name: 'AdminDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        name: [{ required: true, message: '请输入管理员名称', trigger: 'blur' }, { min: 0, max: 20, message: '长度在0~20之间', trigger: 'blur' }],
        group_id: [{ required: true, message: '请选择管理组', trigger: 'blur' }],
        status: [{ required: true, message: '请选择启用状态', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        account: [{ required: true, message: '请输入登录账号', trigger: 'blur' }, { min: 0, max: 20, message: '长度在0~20之间', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 20, message: '长度在6~20之间', trigger: 'blur' }]
      },
      group_select_menus: [],
      status_radios: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  },
  created() {
    this.getGroupSelectMenus()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
      this.rules.password[0].required = false
    }
  },
  methods: {
    fetchData(id) {
      getAdmin(id).then(response => {
        this.postForm = response
        if (id === 1) {
          this.rules.group_id[0].required = false
          this.rules.status[0].required = false
        }
      })
    },
    getGroupSelectMenus(query) {
      groupSelectMenus(query).then(response => {
        this.loading = true
        this.group_select_menus = response
        this.loading = false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isEdit === false) {
            storeAdmin(this.postForm).then(response => {
              this.loading = false
            })
          } else {
            // console.log(this.postForm)
            updateAdmin(this.postForm, this.postForm.id).then(response => {
              this.loading = false
            })
          }
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push({ path: '/permission/admin' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
