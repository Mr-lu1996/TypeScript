<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" size="large" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>

    <!-- 角色列表 -->
    <el-table :data="roleList" border style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名称" width="180" />
      <el-table-column prop="authority" label="权限管理">
        <template #default="scope">
          <el-button type="primary" size="large" @click="changeRole(scope.row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getRoleList } from '../request/api'
import { InitData, ListInt } from '../type/role'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    const router = useRouter()

    onMounted(() => {
      getRoleList().then(res => data.roleList = res.data)
    })

    // 添加角色按钮消息弹出框
    const addRole = () => {
      ElMessageBox.prompt('请输入角色名称', '添加角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {  // value表示在输入框中输入的值
          if(value) { // 判断输入框中是否有值，有就添加
            data.roleList.push({
              roleId: data.roleList.length + 1,
              roleName: value,
              authority: []
            })
          }
          ElMessage({
            type: 'success',
            message: `${value}角色添加成功`,
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '添加失败',
          })
        })
    }

    // 修改权限事件
    const changeRole = (row:ListInt)=> {
      // 路由跳转并携带参数
      router.push({
        path: "/authority",
        query: {
          id: row.roleId,
          authority: row.authority  
        }
      })
    }

    return { ...toRefs(data), addRole, changeRole }
  }
})
</script>

<style scoped></style>