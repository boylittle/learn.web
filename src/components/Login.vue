<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码填对就行。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { UserAPI } from '@/api'

export default {
  data: function () {
    return {
      ruleForm: {
        userId: '',
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      const params = {
        userName: this.ruleForm.username,
        password: this.ruleForm.password
      }
      UserAPI.toLogin(params).then((res) => {
        if (res.data.code.code === 2000) {
          localStorage.userId = res.data.data.id
          localStorage.userName = res.data.data.userName
          localStorage.password = res.data.data.password
          localStorage.nickName = res.data.data.nickName
          localStorage.role = res.data.data.role
          localStorage.type = res.data.data.type
          setTimeout(() => {
            let expireDays = 1000 * 60 * 60 * 24 * 15
            this.setCookie('session', 'blablablablabla...', expireDays)
            this.$router.push({name: 'readme'})
          }, 1000)
        } else {
          alert(res.data.code.message)
        }
      })
    }
  }
}
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
