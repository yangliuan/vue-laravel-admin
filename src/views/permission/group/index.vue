<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
    class="tableWrapper"
  >
    <div class="btnWrapper">
      <el-button class="addBtn" @click="onAddClick">添加</el-button>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 90%"
    >
      <el-table-column
        label="ID"
        prop="id"
        width="80"
      />
      <el-table-column
        label="管理组名称"
        prop="title"
        width="160"
      />
      <el-table-column
        label="管理组介绍"
        prop="desc"
        width="330"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="edit-wrapper">
            <el-link class="edit" @click="onEditClick(scope.row)">编辑</el-link>
            <el-link class="edit" @click="onDeleteClick(scope.row)">删除</el-link>
            <el-link class="edit" @click="onPermissionClick(scope.row)">权限设置</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      width="680px"
    >
      <el-form
        v-loading="submiting"
        :rules="rules"
        :model="obj"
        element-loading-text="加载中..."
      >
        <el-form-item
          label="管理组名称"
          prop="title"
        >
          <div class="inputWrapper">
            <el-input
              v-model="obj.title"
              :maxlength="20"
              show-word-limit
            />
          </div>
        </el-form-item>
        <el-form-item
          label="管理组介绍"
        >
          <div class="inputWrapper">
            <el-input
              v-model="obj.desc"
              :maxlength="255"
              type="textarea"
              :rows="5"
              show-word-limit
            />
          </div>
        </el-form-item>
      </el-form>
      <el-button class="dialogBtn" @click="onSaveClick">保存</el-button>
    </el-dialog>
    <el-dialog
      :visible.sync="perDialogVisible"
      width="680px"
    >
      <el-form
        v-loading="submiting"
        :rules="rules"
        :model="obj"
        element-loading-text="加载中..."
      >
        <div class="checkBoxWrapper">
          <div v-for="(item, index) in checkGroup" :key="index" class="checkGroupWrapper">
            <el-checkbox v-model="checkGroup[index].check" class="checkGroup" @change="onGroupChange(index, $event)">{{ item.name }}</el-checkbox>
            <div class="checkBoxListWrapper">
              <el-checkbox v-for="(jtem, jndex) in checkList[index]" :key="jndex" v-model="jtem.check" class="checkItem" @change="onGroupItemChange(index)">{{ jtem.name }}</el-checkbox>
            </div>
          </div>
        </div>
      </el-form>
      <el-button class="dialogBtn" @click="onSavePerClick">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { getList, update, del, add, getRules, updateRules, detail } from '@/api/permission/group.js'

export default {
  data() {
    return {
      tableData: [],
      obj: { id: 0, desc: '', title: '' },
      dialogVisible: false,
      loading: false,
      rules: {
        role_id: [{ required: true, message: '归属管理组不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '管理员名字不能为空', trigger: 'blur' }],
        account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      checkGroup: [],
      checkList: [],
      type: '添加',
      submiting: false,
      perDialogVisible: false,
      perObj: null
    }
  },
  created() {
    this.getList()
    getRules().then((res) => {
      for (let i = 0; i < res.length; i++) {
        this.checkGroup[i] = { name: res[i].name, check: false }
        for (let j = 0; j < res[i].children.length; j++) {
          if (!this.checkList[i]) {
            this.checkList[i] = []
          }
          this.checkList[i][j] = { name: res[i].children[j].name, value: res[i].children[j].gui_behavior, check: false, id: res[i].children[j].id }
        }
      }
      this.$forceUpdate()
    })
  },
  methods: {
    onEditClick(obj) {
      this.type = '编辑'
      this.obj = JSON.parse(JSON.stringify(obj))
      this.dialogVisible = true
    },
    onSaveClick() {
      if (!this.obj.title) {
        this.$message('请填入必填内容')
        return
      }

      const params = {
        title: this.obj.title,
        desc: this.obj.desc
      }
      if (this.type === '添加') {
        this.submiting = true
        add(params).then(() => {
          this.dialogVisible = false
          this.getList()
        }).finally(() => {
          this.submiting = false
        })
        return
      } else {
        this.submiting = true
        update(params, this.obj.id).then((res) => {
          this.dialogVisible = false
          this.getList()
        }).finally(() => {
          this.submiting = false
        })
      }
    },
    getList() {
      this.loading = true
      getList().then((res) => {
        this.tableData = res.data
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
        del(obj.id).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.getList()
        })
      })
    },
    onAddClick() {
      this.type = '添加'
      this.obj = { id: 0, desc: '', title: '' }
      this.dialogVisible = true
    },
    onGroupChange(i, val) {
      if (val) {
        for (let j = 0; j < this.checkList[i].length; j++) {
          this.checkList[i][j].check = true
        }
      } else {
        for (let j = 0; j < this.checkList[i].length; j++) {
          this.checkList[i][j].check = false
        }
      }
      this.$forceUpdate()
    },
    onGroupItemChange(i) {
      let flag = true
      for (let index = 0; index < this.checkList[i].length; index++) {
        if (!this.checkList[i][index].check) {
          flag = false
          break
        }
      }
      this.checkGroup[i].check = flag
      this.$forceUpdate()
    },
    onPermissionClick(obj) {
      this.reset()
      detail(obj.id).then((res) => {
        const auth = [] // 权限集合
        console.log(JSON.stringify(res.cache));
        for (let i = 0; i < res.cache.length; i++) {
          for (let j = 0; j < res.cache[i].children.length; j++) {
            auth.push(res.cache[i].children[j].gui_behavior)
          }
        }
        for (let i = 0; i < this.checkList.length; i++) {
          this.checkGroup[i].check = true
          for (let j = 0; j < this.checkList[i].length; j++) {
            const value = this.checkList[i][j].value
            if (auth.indexOf(value) > -1) {
              this.checkList[i][j].check = true
            } else {
              this.checkList[i][j].check = false
              this.checkGroup[i].check = false
            }
          }
        }
        this.$forceUpdate()
      })
      this.perObj = obj
      this.perDialogVisible = true
    },
    reset() {
      for (let i = 0; i < this.checkList.length; i++) {
        this.checkGroup[i].check = false
        for (let j = 0; j < this.checkList[i].length; j++) {
          this.checkList[i][j].check = false
        }
      }
      this.$forceUpdate()
    },
    onSavePerClick() {
      const arr = []
      for (let i = 0; i < this.checkList.length; i++) {
        for (let j = 0; j < this.checkList[i].length; j++) {
          if (this.checkList[i][j].check) {
            arr.push(this.checkList[i][j].id)
          }
        }
      }
      updateRules({ rules: arr }, this.perObj.id).then((res) => {
        this.$message({ type: 'success', message: '设置成功' })
      }).finally((res) => {
        this.perDialogVisible = false
      })
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
.checkBoxWrapper {
  margin-left: 20px;
}
.checkGroup {
  margin-top: 20px;
  ::v-deep .el-checkbox__label {
    font-size: 20px;
    font-weight: bold;
  }
}
.checkBoxListWrapper {
  margin-top: 10px;
  &::v-deep .el-checkbox__label {
    font-size: 16px;
    font-weight: normal;
    line-height: 28px;
  }
}
</style>
