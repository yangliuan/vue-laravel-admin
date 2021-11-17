<template>
  <div class="dashboard-container">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="config name" width="180" />
      <el-table-column prop="value" label="config value" width="auto" />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSysinfo } from '@/api/user.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getSystemInfo()
  },
  methods: {
    async getSystemInfo() {
      const response = await getSysinfo()
      this.tableData = response
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
