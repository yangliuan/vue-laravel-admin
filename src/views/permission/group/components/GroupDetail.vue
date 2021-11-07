<template>
  <div class="app-container">

    <el-form ref="postForm" :model="postForm" :rules="rules" label-width="100px" class="form-container">
      <el-form-item label="管理组名称" prop="title">
        <el-input v-model="postForm.title" placeholder="请输入管理组名称" clearable />
      </el-form-item>

      <el-form-item label="描述" prop="desc">
        <el-input v-model="postForm.desc" placeholder="请输入描述文本" clearable />
      </el-form-item>

      <el-form-item label="启用状态" prop="status">
        <el-radio v-for="(item, index) in status_radios" :key="index" v-model="postForm.status" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('postForm')">保存</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { storeGroup , getGroup , updateGroup } from '@/api/permission/group.js'

const defaultForm = {
  title: '',
  desc: '',
  status: 1,
  id: ''
}

export default {
  name: 'GroupDetail',
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
        title: [{ required: true, message: '请输入管理组名称', trigger: 'blur' },{ min: 0, max: 20, message: '长度在0~20之间', trigger: 'blur' }],
        status: [{ required: true, message: '请选择启用状态', trigger: 'blur' }],
      },
      status_radios: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      getGroup(id).then(response => {
        this.postForm = response
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if(this.isEdit === false){
            storeGroup(this.postForm).then(response => {
              this.loading = false
              this.$router.push({path: '/permission/admingroup'})
            })
          }else{
            console.log(this.postForm)
            updateGroup(this.postForm,this.postForm.id).then(response => {
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
