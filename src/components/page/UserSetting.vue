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
        <el-form-item label="用户名">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="user.icon"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
  }
}
</script>

<style scoped>

</style>
