<template>
  <div class="createPost-container">

    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-form-item label="管理员名字" prop="name">
        <el-input v-model="postForm.name" placeholder="请输入管理员名称" clearable />
      </el-form-item>

      <el-form-item label="归属管理组" prop="group_id">
        <el-select v-model="postForm.group_id" multiple filterable remote reserve-keyword placeholder="请输入管理组名称" :remote-method="remoteMethod" :loading="loading">
          <el-option v-for="item in group_select_menus" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="启用状态" prop="status">
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

    </el-form>

  </div>
</template>

<script>
import { groupSelectMenus } from '@/api/permission/group.js'

const defaultForm = {
  name: '',
  group_id: 0,
  status: 0,
  mobile: '',
  account: '',
  password: ''
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

      },
      group_select_menus: [],
      status_radios: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]

    }
  },
  methods: {
    getGroupSelectMenus(query) {
      console.log(query)
      groupSelectMenus(query).then(response => {
        this.loading = true
        this.group_select_menus = response
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;
}

</style>
