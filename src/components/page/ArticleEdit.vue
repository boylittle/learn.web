<template>
  <div class="components-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-edit"></i>文章</el-breadcrumb-item>
          <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="title">
        <div class="title-left">
            <span>标题</span>
            <el-input v-model="article.title"></el-input>
        </div>
    </div>
    <div class="editor-container">
        <span>内容</span>
        <UE v-model="article.content" :defaultMsg=article.content :config=config ref="ue"></UE>
    </div>
    <button @click="saveArticle()">保存</button>
  </div>
</template>
<style>
.components-container{
    height: 100%;
    width: 100%;
    background-color: #ffffff;
}
/* .components-container span{
    font-size: 20px;
} */
.title{
    border-radius: 10px;
    line-height: 20px;
    background-color: #ffffff;
}
.title-left{
    width: 40%;
}
.editor-container{
    margin-top: 10px;
}
</style>
<script>
import { ArticleAPI } from '@/api'
import UE from '../ueditor/src/ueditor.vue'

export default {
  components: {UE},
  data () {
    return {
      defaultMsg: '',
      config: {
        initialFrameWidth: 1150,
        initialFrameHeight: 380
      },
      article: {
        id: localStorage.getItem('aticle_id'),
        title: localStorage.getItem('aticle_title'),
        content: localStorage.getItem('aticle_content'),
        teacherAccountId: localStorage.getItem('teacherAccountId'),
        type: localStorage.getItem('type')
      }
    }
  },
  methods: {
    saveArticle () {
      
      const params = {
        teacherAccountId: this.article.teacherAccountId,
        id: this.article.id,
        title: this.article.title,
        content: this.$refs.ue.getUEContent(),
        type: this.article.type
      }

      ArticleAPI.save(params).then((res) => {
        if (res.data.code.code === 2000) {
          this.$router.push({name: 'articleList'})
        } else {
          alert(res.data.code.message)
        }
      })
    }
  }
}
</script>
