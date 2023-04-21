<template>
  <div>
    <!-- 搜索框 -->
    <el-form :model="userSearchData" :inline="true" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="userSearchData.username" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="用户地区">
        <el-input v-model="userSearchData.address" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户列表 -->
    <el-table :data="comUserList" border style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="userId" label="用户ID" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="email" label="邮箱" width="250"/>
      <el-table-column prop="phone" label="手机号码" width="220"/>
      <el-table-column prop="address" label="地区"/>
    </el-table>
    <div class="pagination">
      <el-pagination :total="userList.length" layout="prev, pager, next" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { userData, userListInt } from '../type/users1'
import { getUserList } from '../request/api'

export default defineComponent({
  setup() {
    const data = reactive(new userData())

    // 获取用户数据
    onMounted(() => {
      getUserData()
    })

    // 封装获取用户数据
    const getUserData = ()=> {
      getUserList().then(res => {
        data.userList = res.data
        data.userSearchData.count = res.data.length
      })
    }

    // 对用户列表进行分页
    const comUserList = reactive(computed(() => {
      return data.userList.slice(
        (data.userSearchData.page - 1) * data.userSearchData.pageSize,
        data.userSearchData.page * data.userSearchData.pageSize
      )
    }))

    // 每页显示条数改变事件
    const handleSizeChange = (pageSize: number) => {
      data.userSearchData.pageSize = pageSize
    }

    // 当前页码改变事件
    const handleCurrentChange = (page: number) => {
      data.userSearchData.page = page
    }

    // 搜索事件
    const search = () => {
      // 定义一个结果数组，用于接收搜索过滤后的结果
      let result:userListInt[] = []
      if(data.userSearchData.username || data.userSearchData.address) {
        if(data.userSearchData.username) {
          result = data.userList.filter(userInfo => userInfo.username.includes(data.userSearchData.username))
        }
        if(data.userSearchData.address) {
          result = data.userList.filter(userInfo => userInfo.address.includes(data.userSearchData.address))
        }
      } else {
        result = data.userList
      }
      // 将搜索结果赋给表格展示列表
      data.userSearchData.count = result.length
      data.userList = result
    }

    // 监听搜索框
    watch([() => data.userSearchData.username, () => data.userSearchData.address], (newValue, oldValue) => {
      if(data.userSearchData.username == "" && data.userSearchData.address == "") {
        getUserData()
      }
    })

    return { ...toRefs(data), comUserList, handleSizeChange, handleCurrentChange, search}
  }
})
</script>

<style lang="scss" scoped>
  .el-pagination {
    width: 200px;
    margin: 10px auto;
  }
</style>