<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i> 设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-box">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="头像">
          <img class="user-icon" :src="user.icon" @click="changeShow()">
          <el-select v-show="isShow" placeholder="请选择" ref="select" style="margin-left:50px;width:90px">
            <el-option
              v-for="avatar in avatars"
              :key="avatar.id"
              :value="avatar.src"
            >
              <img class="avatar" :src="avatar.src" @click="changeSelection(avatar.id,avatar.src)" style="height:33px">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-button type="danger" @click="dialogState">修改</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="saveUserInfo">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="10%"
        :before-close="handleClose">
        <el-form ref="form" :model="password" label-width="80px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="password.oldpassword" id="oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="password.newpassword" id="oldpassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="savePassWord">确 定</el-button>
          <el-button type="danger" @click="dialogState">取消</el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
    </div>
</div>
</template>

<script>
import { UserAPI } from '@/api'

export default {
  data () {
    return {
      isShow: false,
      dialogVisible: false,
      user: {
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('userName'),
        icon: localStorage.getItem('icon'),
        icon_id: 0,
        nickName: localStorage.getItem('nickName')
      },
      password: {
        oldpassword: '',
        newpassword: ''
      },
      avatars: [
        {
          src: require('../../../static/img/img.jpg'),
          id: '0'
        },
        {
          src: require('../../../static/img/img2.jpg'),
          id: '1'
        },
        {
          src: require('../../../static/img/img3.jpg'),
          id: '2'
        },
        {
          src: require('../../../static/img/img4.jpg'),
          id: '3'
        },
        {
          src: require('../../../static/img/img5.jpg'),
          id: '4'
        },
        {
          src: require('../../../static/img/img6.jpg'),
          id: '5'
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    changeSelection (id, src) {
      console.log(src)
      this.user.icon = src
      this.user.icon_id = id
      this.isShow = false
      console.log(this.user.icon)
    },
    changeShow () {
      this.isShow = !this.isShow
    },
    getData () {
      const params = {
        userName: this.user.userName
      }
      UserAPI.getAccount(params).then((res) => {
        console.log(res)
        if (res.data.code.code === 2000) {
          console.log(res)
          if (res.data.data) {
            this.user.nickName = res.data.data.nickName
            this.user.userName = res.data.data.userName
          } else {
            alert('服务忙')
          }
        } else {
          alert(res.data.code.message)
        }
      })
    },
    dialogState () {
      this.clearpassword()
      this.dialogVisible = !this.dialogVisible
    },
    handleClose (done) {
      this.clearpassword()
      done()
    },
    clearpassword () {
      this.password.oldpassword = ''
      this.password.newpassword = ''
    },
    saveUserInfo () {
      console.log(this.user.icon)
      const params = {
        id: this.user.userId,
        userName: this.user.userName,
        nickName: this.user.nickName,
        icon: this.user.icon
      }

      UserAPI.updateAccount(params).then((res) => {
        if (res.data.code.code === 2000) {
          console.log(res.data)
          localStorage.userId = res.data.data.id
          localStorage.userName = res.data.data.userName
          localStorage.password = res.data.data.password
          localStorage.nickName = res.data.data.nickName
          localStorage.icon = res.data.data.icon
          localStorage.role = res.data.data.role
          localStorage.type = res.data.data.type
          location.reload()
        } else {
          alert(res.data.code.message)
        }
      })
    },
    savePassWord () {
      console.log(this.password.newpassword)
      console.log(this.password.oldpassword)
      console.log(localStorage.password)
      if (this.password.oldpassword !== localStorage.password) {
        alert('原密码填写有误！')
        return
      }
      const params = {
        id: this.user.userId,
        password: this.password.newpassword
      }

      UserAPI.updateAccount(params).then((res) => {
        if (res.data.code.code === 2000) {
          console.log(res.data)
          localStorage.userId = res.data.data.id
          localStorage.userName = res.data.data.userName
          localStorage.password = res.data.data.password
          localStorage.nickName = res.data.data.nickName
          localStorage.icon = res.data.data.icon
          localStorage.role = res.data.data.role
          localStorage.type = res.data.data.type
          this.dialogState()
          alert('修改密码成功！')
        } else {
          alert(res.data.code.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.user-icon{
  position: absolute;
  left:0;
  width:40px;
  height:40px;
  border-radius: 50%;
}
</style>
