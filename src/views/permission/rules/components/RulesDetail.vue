<template>
  <div class="app-container">

    <el-form ref="postForm" :model="postForm" :rules="rules" label-width="100px" class="form-container">

      <el-form-item label="选择父级">
        <el-cascader v-model="postForm.pid" :options="rules_select_menus" :props="{ value: 'id', label: 'name', checkStrictly: true}" clearable />
      </el-form-item>

      <el-form-item label="规则标题" prop="title">
        <el-input v-model="postForm.name" placeholder="规则标题" clearable />
      </el-form-item>

      <el-form-item label="icon" prop="desc">
        <el-input v-model="postForm.icon" placeholder="请输入icon" clearable />
      </el-form-item>

      <el-form-item label="gui类型" prop="desc">
        <el-radio v-for="(item,index) in gui_type_radios" :key="index" v-model="postForm.gui_type" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item label="gui规则" prop="desc">
        <el-input v-model="postForm.gui_behavior" placeholder="请输入gui规则" clearable />
      </el-form-item>

      <el-form-item label="api方法" prop="desc">
        <el-checkbox v-for="(item,index) in api_http_methods_checkboxs" :key="index" v-model="postForm.api_http_method" :label="item.value">{{ item.label }}</el-checkbox>
      </el-form-item>

      <el-form-item label="api路由" prop="desc">
        <el-input v-model="postForm.api_behavior" placeholder="api路由" clearable />
      </el-form-item>

      <el-form-item label="api路由参数" prop="desc">
        <el-input v-model="postForm.params" placeholder="api路由参数" clearable />
      </el-form-item>

      <el-form-item label="启用状态" prop="status">
        <el-radio v-for="(item, index) in status_radios" :key="index" v-model="postForm.status" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item label="日志状态" prop="is_log">
        <el-radio v-for="(item, index) in log_status_radios" :key="index" v-model="postForm.is_log" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('postForm')">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { storeRules, getRules, updateRules, rulesSelectMenus } from '@/api/permission/rules.js'

const defaultForm = {
  id: '',
  pid: 0,
  name: '',
  icon: '',
  gui_type: '',
  gui_behavior: '',
  api_http_method: [],
  api_behavior: '',
  params: '',
  status: 1,
  is_log: 1
}

export default {
  name: 'AdminRulesDetail',
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
        title: [{ required: true, message: '请输入管理组名称', trigger: 'blur' }, { min: 0, max: 20, message: '长度在0~20之间', trigger: 'blur' }],
        status: [{ required: true, message: '请选择启用状态', trigger: 'blur' }]
      },
      gui_type_radios: [
        { label: '主菜单', value: 1 },
        { label: '子菜单', value: 2 },
        { label: '路由|按钮', value: 3 }
      ],
      status_radios: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      log_status_radios: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      api_http_methods_checkboxs: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' },
        { label: 'DELETE', value: 'DELETE' }
      ],
      rules_select_menus: []
    }
  },
  created() {
    this.fetchRulesSelectMenu()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      getRules(id).then(response => {
        response.api_http_method = response.api_http_method.split(',')
        this.postForm = response
      })
    },
    fetchRulesSelectMenu() {
      rulesSelectMenus().then(response => {
        this.rules_select_menus = response
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isEdit === false) {
            storeRules(this.postForm).then(response => {
              this.loading = false
            })
          } else {
            console.log(this.postForm)
            updateRules(this.postForm, this.postForm.id).then(response => {
              this.loading = false
            })
          }
          this.$message({ message: '保存成功', type: 'success' })
          this.$router.push({ path: '/permission/adminrules' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
