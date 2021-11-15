<template>
  <div class="app-container">

    <el-form ref="postForm" :model="postForm" :rules="rules" label-width="100px" class="form-container">

      <el-form-item label="选择父级">
        <el-cascader v-model="postForm.pid" :options="rules_select_menus" :props="{ value: 'id', label: 'name', checkStrictly: true}" clearable />
      </el-form-item>

      <el-form-item label="规则标题" prop="name">
        <el-input v-model="postForm.name" placeholder="规则标题" clearable />
      </el-form-item>

      <el-form-item label="icon" prop="icon">
        <el-input v-model="postForm.icon" placeholder="请输入icon" clearable />
      </el-form-item>

      <el-form-item label="gui类型" prop="gui_type">
        <el-radio v-for="(item,index) in gui_type_radios" :key="index" v-model="postForm.gui_type" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item label="gui规则" prop="gui_behavior">
        <el-input v-model="postForm.gui_behavior" placeholder="请输入gui规则" clearable />
      </el-form-item>

      <el-form-item label="api方法" prop="api_http_method">
        <el-checkbox v-for="(item,index) in api_http_methods_checkboxs" :key="index" v-model="postForm.api_http_method" :label="item.value">{{ item.label }}</el-checkbox>
      </el-form-item>

      <el-form-item label="api路由" prop="api_behavior">
        <el-input v-model="postForm.api_behavior" placeholder="api路由" clearable />
      </el-form-item>

      <el-form-item label="api路由参数" prop="params">
        <el-input v-model="postForm.params" placeholder="api路由参数" clearable />
      </el-form-item>

      <el-form-item label="启用状态" prop="status">
        <el-radio v-for="(item, index) in status_radios" :key="index" v-model="postForm.status" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item label="日志状态" prop="is_log">
        <el-radio v-for="(item, index) in log_status_radios" :key="index" v-model="postForm.is_log" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item label="排序值" prop="sort">
        <el-input v-model="postForm.sort" placeholder="请输入排序值" oninput="value=value.replace(/[^\d]/g,'')" clearable />
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
  is_log: 1,
  sort: 0
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
        pid: [{ required: false, message: '请选择父级规则', trigger: 'blur' }],
        name: [{ required: true, message: '请输入规则标题', trigger: 'blur' }, { min: 0, max: 100, message: '长度在0~100之间', trigger: 'blur' }],
        icon: [{ required: false, message: '请输入icon', trigger: 'blur' }, { min: 0, max: 100, message: '长度在0~100之间', trigger: 'blur' }],
        gui_type: [{ required: true, message: '请选择gui类型', trigger: 'blur' }],
        gui_behavior: [{ required: true, message: '请输入gui规则', trigger: 'blur' }, { min: 0, max: 255, message: '长度在0~255之间', trigger: 'blur' }],
        api_http_method: [{ required: true, message: '请选择api请求方法', trigger: 'blur' }],
        api_behavior: [{ required: true, message: '请输入api路由', trigger: 'blur' }, { min: 0, max: 255, message: '长度在0~255之间', trigger: 'blur' }],
        params: [{ required: true, message: '请输入api路由参数', trigger: 'blur' }, { min: 0, max: 255, message: '长度在0~255之间', trigger: 'blur' }],
        status: [{ required: true, message: '请选择启用状态', trigger: 'blur' }],
        is_log: [{ required: true, message: '请选择日志状态', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
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
          const key = this.postForm.pid.length - 1
          this.postForm.pid = this.postForm.pid[key]
          this.postForm.api_http_method = this.postForm.api_http_method.join()
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
