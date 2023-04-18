<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <!-- <img src="../assets/logo1.jpg" alt="" class="logo"> -->
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <span class="exit">退出登录</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" router>
            <!-- router开启路由模式，通过 el-menu-item index来进行跳转 -->
            <!-- 展示获取的菜单列表 -->
            <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <!-- 设置子路由出口 -->
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const router = useRouter()
    // 通过对子路由进行筛选来动态展示菜单列表
    const list = router.getRoutes().filter(r => r.meta.isShow)
    return {list}
  }
});
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 60px;

  .logo {
    width: 60px;
    height: 60px;
  }

  h2,
  .exit {
    line-height: 60px;
  }
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: calc(100vh - 160px);
  height: calc(100vh - 160px);
  .el-menu {
    height: calc(100vh - 160px);
  }
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: calc(100vh - 160px);
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 60px;
}
</style>
