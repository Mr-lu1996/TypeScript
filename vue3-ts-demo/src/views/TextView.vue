<template>
  <div class="login-box">
    <el-form ref="ruleFormRef"  status-icon label-width="80px" class="demo-ruleForm">
      <img src="../assets/cqupt.png" alt="">
      <h2>基于深度学习的对抗文本生成模型研究</h2>
      <span>请输入一段文本</span>
      <el-input
      v-model="data.textarea"
      :rows="5"
      ref="input_textarea"
      type="textarea"
      placeholder="Please input"
      class="input_text"
    />
      <el-form-item class="btn">
        <el-button type="primary" @click="targetModel()" class="login-btn" :loading="data.loading_target">目标分类模型</el-button>
        <el-button type="danger" @click="attack()" class="login-btn" :loading="data.loading_attack">同义词攻击</el-button>
        <el-button type="success" @click="advModel()" class="login-btn" :loading="data.loading_adv">对抗文本生成模型</el-button>
      </el-form-item>
      <div :class="{'knocktxt':data.isActive}">{{ data.attacked_text }}</div>
    </el-form>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import axios from 'axios'


export default defineComponent({
  setup() {
    const ruleFormRef = ref<any>(null)
    const data = reactive({
      loading_target: false,
      loading_attack: false,
      loading_adv: false,
      classify: 'positive',
      textarea: '',
      attacked_text: '',
      isActive: false
    })
    
    // 目标分类模型
    const targetModel = () => {
      data.loading_target = true
      if (data.attacked_text !== '') {
        data.isActive = true
        setTimeout(() => {
          data.textarea = data.attacked_text
        }, 1000)
      }
      setTimeout(() => {
        data.loading_target = false
        ElMessageBox.alert(`该文本分类为：${data.classify}`, '目标模型分类', {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: '确定',
          // callback: (action: Action) => {
          //   ElMessage({
          //     type: 'success',
          //     message: `确认分类为positive`,
          //   })
          // },
        })
      }, 2000);
    }
    

    // 同义词攻击
    const attack = () => {
      data.loading_attack = true
      setTimeout(() => {
        data.loading_attack = false
        data.classify = 'negative'
        ElMessageBox.alert('攻击完成！', '同义词攻击', {
          confirmButtonText: '确定',
        })
        data.attacked_text = `vietnam opens bunker used by ho chi minh ( ap ) . ap - behind thick specific walls and iron doors , ho chi minh and other top vietnamese chefs hides in secret subterranean tunneling during u . s . b - 52 bombardments raiding to plot essentials military strategies that led to americas ' s defeat in the vietnam war.`
      }, 2000);
    }

    // 对抗生成模型
    const advModel = () => {
      data.loading_adv = true
      setTimeout(() => {
        data.loading_adv = false
        data.classify = 'negative'
        ElMessageBox.alert(`该文本分类为：positive`, '目标模型分类', {
          confirmButtonText: '确定',
        })
      }, 2000);
    }

    return { targetModel, data, attack, advModel, ruleFormRef }
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
    width: 700px;
    height: 500px;
    margin: 100px auto;
    padding: 30px;
    background-color: rgba($color: #f1eded, $alpha: 0.6);
    border-radius: 20px;
  }

  .login-btn {
    width: 30%;
  }

  .input_text {
    margin-top: 25px;
  }

  .btn {
    margin-top: 25px;
  }

  .knocktxt {
    animation: move 1s linear 1 alternate forwards
  }
  @keyframes move {
    from {top:100px;opacity:100;}
    to {top:0px;opacity:0;}
  }

  img {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 360px;
    top: 115px;
  }
}
</style>