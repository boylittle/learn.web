<template>
 <div class="header">
  <div class="logo">后台管理系统</div>
  <div class="user-info">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
      <img class="user-icon" :src="user.icon">
      {{nickName}}
      </span>
      <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="loginout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
 </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        userName: localStorage.getItem('userName'),
        icon: localStorage.getItem('icon'),
        nickName: localStorage.getItem('nickName')
      }
    }
  },
  computed: {
    nickName () {
      let nickName = localStorage.getItem('nickName')
      return nickName
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        localStorage.removeItem('nickName')
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped>
 .header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
 }
 .header .logo{
  float: left;
  width:250px;
  text-align: center;
 }
 .user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
 }
 .user-info .el-dropdown-link{
  display: inline-block;
  padding-left: 50px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
 }
 .user-info .user-icon{
  position: absolute;
  left:0;
  top:15px;
  width:40px;
  height:40px;
  border-radius: 50%;
 }
 .el-dropdown-menu__item{
  text-align: center;
 }
</style>
