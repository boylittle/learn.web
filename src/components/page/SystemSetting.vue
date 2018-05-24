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
import { ArticleAPI } from '@/api'

export default {
  data () {
    return {
      user: {
        userName: localStorage.getItem('userName'),
        icon: localStorage.getItem('icon'),
        nickName: localStorage.getItem('nickName'),
      }
    }
  },
  mounted () {
    
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>
