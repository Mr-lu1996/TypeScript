<template>
  <div>
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="selectData.role" class="m-2" placeholder="请选择">
          <el-option label="全部" :value="0"/>
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      :data="userlist" 
      border 
      style="width: 100%"
      :header-cell-style="{'text-align': 'center'}"
      :cell-style="{'text-align': 'center'}"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button 
            v-for="item in scope.row.role" 
            :key="item.role"
            type="primary"
            disabled
            link
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button 
            type="primary"
            @click="changeUser(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog v-model="isShow" title="编辑用户信息">
      <el-form :model="activeData">
        <el-form-item label="姓名" label-width='50px'>
          <el-input v-model="activeData.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width='50px'>
          <el-select v-model="activeData.role" placeholder="请选择" multiple>
            <el-option 
              v-for="item in roleList" 
              :key="item.roleId" 
              :label="item.roleName" 
              :value="item.roleId" 
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="updateInfo()">
            更改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from '../request/api'
import { InitData, UserListInt } from '../type/user'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())

    onMounted(() => {
      getUserListData()
      getRoleListData()
    })

    // 获取用户列表数据
    const getUserListData = () => {
      getUserList().then(res => {
        data.userlist = res.data
      })
    }

    // 获取角色列表数据
    const getRoleListData = () => {
      getRoleList().then(res => {
        data.roleList = res.data
      })
    }

    // 搜索框事件
    const search = () => {
      let result:UserListInt[] = [] 
      if(data.selectData.nickName|| data.selectData.role) {
        if(data.selectData.nickName) {
          result = data.userlist.filter(user => user.nickName.includes(data.selectData.nickName))
        }
        if(data.selectData.role) {
          // 如果 nickName有值，就在 nickName 的筛选结果上进一步进行筛选；如果没有值，就在userlist进行筛选
          // 嵌套筛选，先筛选user,再筛选role，先用filter,再用find
          result = (data.selectData.nickName ? result : data.userlist).filter(
            user => user.role.find(
              value => value.role === data.selectData.role
            )
          )
        }
      } else {
        result = data.userlist
      }
      data.userlist = result
    }

    // 编辑按钮事件
    const changeUser = (row:UserListInt) => {
      data.isShow = true
      data.activeData = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((value:any) => value.role || value.roleId)
      }
    }

    // 修改用户信息事件
    const updateInfo = ()=> {
      // 创建一个对象，用于接收被修改信息的那一个用户对象
      let obj:any = data.userlist.find(user => user.id === data.activeData.id)
      // 修改其nickName属性
      obj.nickName = data.activeData.nickName
      // 修改其role属性，先在角色列表中筛选出下拉框中选择的角色id的对象，然后将其赋给 role
      obj.role = data.roleList.filter(role => data.activeData.role.includes(role.roleId))
      // obj中的属性修改完毕后，最后将userlist中的对应修改的对象进行替换
      data.userlist.forEach(item => {
        if (item.id === obj.id) {
          item = obj
        }
      })

      // 自己写的(只有管理员和普通用户的情况下比视频代码简洁)
      // data.userlist.forEach(item => {
      //   if(item.id === data.activeData.id) {
      //     item.nickName = data.activeData.nickName
      //     item.role = data.activeData.role.map(value => {
      //       return {role: value, roleName: value == 1 ? '管理员' : '普通用户'}
      //     })
      //   }
      // })
      data.isShow = false
    }

    // 监听输入框，如果清空就重新获取用户列表数据
    watch([() => data.selectData.nickName, () => data.selectData.role], () => {
      if(data.selectData.nickName == '' || data.selectData.role == 0) {
        getUserListData()
      }
    })

    
    return { ...toRefs(data), search, changeUser, updateInfo}
  }
})
</script>

<style scoped></style>