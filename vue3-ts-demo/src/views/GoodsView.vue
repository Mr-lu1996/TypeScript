<template>
  <div>
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectData.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      :data="dataList.comList" 
      border 
      style="width: 100%"
      :header-cell-style="{'text-align': 'center'}"
      :cell-style="{'text-align': 'center'}"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="selectData.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getGoodsList } from '../request/api'
import { InitData, goodsListInt } from '../type/goods'

export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    
    onMounted(() => {
      getGoodsData()
    })

    // 获取商品列表数据
    const getGoodsData = () => {
      getGoodsList().then(res => {
        data.list = res.data
        data.selectData.count = res.data.length
      })
    }

    // 展示分页数据，使用计算属性动态展示
    const dataList = reactive({ 
      comList: computed(() => {
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pageSize, // page=1 --> 0, page=2 ---> 10
          data.selectData.page * data.selectData.pageSize // page=1 ---> 10, page=2 --->20
        // 0-9,10-19,
        )
      })
    })

    // 当前页改变事件
    const handleCurrentChange = (page: number) => {
      data.selectData.page = page
    }

    // 每页展示大小改变
    const handleSizeChange = (pageSize: number) => {
      data.selectData.pageSize = pageSize
    }

    // 搜索事件
    const search = () => {
      let arr:goodsListInt[] = [] // 定义数组，用于接收查询返回的列表结果
      if (data.selectData.title || data.selectData.introduce) { // 判断两个其中一个是否有值
        if (data.selectData.title) {
          arr = data.list.filter(value => value.title.includes(data.selectData.title))
        }
        if (data.selectData.introduce) {
          arr = data.list.filter(value => value.introduce.includes(data.selectData.introduce))
        }
      } else {
        arr = data.list
      }
      // 对展示的列表数据长度重新赋值
      data.selectData.count = arr.length
      // 将筛选后的列表赋值给list，进行展示
      data.list = arr
    }

    // 监听搜索框两个属性
    watch([() => data.selectData.title, () => data.selectData.introduce], () => {
      if (data.selectData.title == '' && data.selectData.introduce == '') {
        getGoodsData()
      }
    })

    return { ...toRefs(data), handleCurrentChange, handleSizeChange, dataList, search }
  }
})
</script>

<style lang="scss" scoped>
  .el-pagination {
    width: 300px;
    margin: 10px auto;
  }
</style>