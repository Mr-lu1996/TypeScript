<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="login-btn">登录</el-button>
        <el-button @click="resetForm()" class="login-btn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import { login } from '../request/api'
import { useRouter } from 'vue-router'
import axios from 'axios'


export default defineComponent({
  setup() {
    const data = reactive(new LoginData())
    const rules = {
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: 'blur'
        },
        {
          min: 3,
          max: 10,
          message: '账号的长度在3到10之间',
          trigger: 'blur'
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: 'blur'
        },
        {
          min: 3,
          max: 10,
          message: '密码的长度在3到10之间',
          trigger: 'blur'
        },
      ]
    }
    // 登录
    const ruleFormRef = ref<FormInstance>()
    const router = useRouter() // ---> $router
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      // 对表单进行验证
      // valid为布尔类型，如果为true表示验证成功，反之验证失败
      formEl.validate((valid) => {
        if (valid) {
          // 验证成功
          axios({
            url: 'https://www.fastmock.site/mock/a35341c17ca29fe899ac2cd286eff4bf/management/login',
            method: 'post',
            data: data.ruleForm
          }).then(res => {
            // 登录成功,保存token
            localStorage.setItem('token', res.data.token)
            // 跳转页面-首页
            router.push('/')
          }).catch(err => console.log(err))
          // login(data.ruleForm).then(res => {
          //   // 登录成功,保存token
          //   localStorage.setItem('token', res.data.token)
          //   // 跳转页面-首页
          //   router.push('/')
          // }, err => console.log(err))
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    // 重置
    const resetForm = () => {
      data.ruleForm.username = ""
      data.ruleForm.password = ""
    }

    return { ...toRefs(data), rules, ruleFormRef, submitForm, resetForm }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  padding: 1px;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  text-align: center;

  h2 {
    margin-bottom: 15px;
  }

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    padding: 30px;
    background-color: rgba($color: #f1eded, $alpha: 0.6);
    border-radius: 20px;
  }

  .login-btn {
    width: 48%;
  }
}
</style>