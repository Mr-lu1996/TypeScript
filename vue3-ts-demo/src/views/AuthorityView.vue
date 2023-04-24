<template>
  <div>
    <el-tree
    ref="treeRef"
    :data="list"
    show-checkbox
    node-key="roleId"
    :check-strictly="true"
    :default-checked-keys="authority"
    :props="{
      children: 'roleList',
      label: 'name'
    }"
  />
  <el-button type="primary" @click="changeAuthority()">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { InitData } from '../type/authority'
import { getAuthorityList } from '../request/api'

export default defineComponent({
  setup () {
    const route = useRoute()
    const params: any = route.query
    const data = reactive(new InitData(params.id, params.authority))
    console.log(data)

    onMounted(() => {
      getAuthorityList().then(res => {
        console.log(res.data)
        data.list = res.data
      })
    })

    const changeAuthority = ()=> {
      // getCheckedKeys() --> 获取选中的权限 id
      console.log(data.treeRef.getCheckedKeys().sort((a: number, b: number) => a - b))
      // 开发中一般 将排序后的权限id数组传给后台，后台进行修改
    }

    return {...toRefs(data), changeAuthority}
  }
})
</script>

<style scoped>

</style>