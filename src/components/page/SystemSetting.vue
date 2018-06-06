<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-setting"></i> 设置</el-breadcrumb-item>
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      </el-breadcrumb>
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
