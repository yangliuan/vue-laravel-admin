<template>
  <div class="app-container">
    <el-tree ref="tree" :data="data" show-checkbox default-expand-all node-key="id" highlight-current :props="defaultProps" />
    <div style="margin:20px">
      <el-button type="primary" @click="saveRules">保存</el-button>
      <el-button type="primary" @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>

<script>
import { getAllRules, getGroupRules, setRules } from '@/api/permission/group.js'
import { getChildrenPids, arrayDiff } from '@/utils/data-handle.js'

export default {
  name: 'SetRules',
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: ''
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.loadRules()
  },
  methods: {
    loadRules() {
      getAllRules().then(response => {
        this.data = response
        getGroupRules(this.id).then(response => {
          // console.log(response)
          if (response.length > 0) {
            const pids = getChildrenPids(this.data)
            this.$refs.tree.setCheckedKeys(arrayDiff(pids, response))
          }
        })
      })
    },
    saveRules() {
      setRules({ rules: this.$refs.tree.getCheckedKeys() }, this.id).then(response => {
        // console.log(response)
        this.$message({ message: '保存成功', type: 'success' })
        this.$router.push({ path: '/permission/admingroup' })
      })
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
