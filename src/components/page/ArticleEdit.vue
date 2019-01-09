<template>
  <div class="quill-editor">
    <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-edit"></i>文章</el-breadcrumb-item>
          <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-select v-model="article.type" placeholder="选择科目" >
        <el-option
          v-for="item in typeData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="article.title" placeholder="填写标题" class="handle-input mr10"></el-input>
      <el-button @click="saveArticle">保存文章</el-button>
      <div style="margin-top: 20px">
        <el-checkbox-group v-model="tagResult" size="small">
          <el-checkbox v-for="tag in tagData"
            :label="tag.id"
            :key="tag.id"
            :value="tag.id"
            >{{tag.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>
</template>

<script>
import { ArticleAPI, ArticleTagAPI } from '@/api'

// 引入编辑器
import _Quill from 'quill'
import defaultOptions from '../../../static/js/options'
const Quill = window.Quill || _Quill

export default {
  name: 'quill-editor',
  data () {
    return {
      ue_options: {},
      ue_content: {},
      defaultOptions,
      article: {
        id: localStorage.getItem('aticle_id'),
        title: localStorage.getItem('aticle_title'),
        content: localStorage.getItem('aticle_content'),
        userId: localStorage.getItem('userId'),
        type: localStorage.getItem('aticle_type'),
        tag: localStorage.getItem('aticle_tag')
      },
      tagData: [],
      tagResult: [],
      tagResultStr: '',
      typeData: [{
        value: '1',
        label: '语文'
      }, {
        value: '2',
        label: '数学'
      }, {
        value: '3',
        label: '英语'
      }, {
        value: '4',
        label: '物理'
      }, {
        value: '5',
        label: '化学'
      }, {
        value: '6',
        label: '生物'
      }, {
        value: '7',
        label: '政治'
      }, {
        value: '8',
        label: '地理'
      }, {
        value: '9',
        label: '技术'
      }]
    }
  },
  props: {
    content: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  mounted () {
    this.initialize()
    this.getTag()
    this.createTagResult()
  },
  beforeDestroy () {
    this.quill = null
    delete this.quill
  },
  methods: {
    // 初始化编辑器
    initialize () {
      if (this.$el) {
        // Options
        this.ue_options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options)

        // Instance
        this.quill = new Quill(this.$refs.editor, this.ue_options)
        this.quill.enable(false)

        // 给编辑器赋初始值
        this.content = localStorage.getItem('aticle_content')
        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content)
        }

        // Disabled editor
        if (!this.disabled) {
          this.quill.enable(true)
        }

        // Mark model as touched if editor lost focus
        this.quill.on('selection-change', range => {
          if (!range) {
            this.$emit('blur', this.quill)
          } else {
            this.$emit('focus', this.quill)
          }
        })

        // Update model if text changes
        this.quill.on('text-change', (delta, oldDelta, source) => {
          let html = this.$refs.editor.children[0].innerHTML
          const quill = this.quill
          const text = this.quill.getText()
          if (html === '<p><br></p>') html = ''
          this.ue_content = html
          this.$emit('input', this.ue_content)
          this.$emit('change', { html, text, quill })
        })

        // Emit ready event
        this.$emit('ready', this.quill)
      }
    },
    createTagResult () {
      var tagStr = this.article.tag
      var t = tagStr.split(',')
      t = t.map(Number)
      for (var i = 0; i < t.length; i++) {
        if (t[i] > 0) {
          this.tagResult.push(t[i])
        }
      }
    },
    getTag () {
      ArticleTagAPI.findAll().then((res) => {
        if (res.data.code.code === 2000) {
          this.tagData = res.data.data
        } else {
          alert(res.data.code.message)
        }
      })
    },
    saveArticle () {
      console.log(this.article.userId)
      console.log(this.article.id)
      console.log(this.article.title)
      console.log(this.ue_content)
      console.log(this.article.type)

      //转换多选数组为字符串
      console.log(this.tagResult)
      var tagStr = ''
      for (var i = 0; i< this.tagResult.length; i++) {
        if (i == 0) {
          tagStr = tagStr + this.tagResult[i]
        } else {
          tagStr = tagStr + "," + this.tagResult[i]
        }
      }
      this.tagResultStr = tagStr
      console.log(this.tagResultStr)

      const params = {
        userId: this.article.userId,
        id: this.article.id,
        title: this.article.title,
        content: this.ue_content,
        type: this.article.type,
        tag: this.tagResultStr
      }

      ArticleAPI.save(params).then((res) => {
        if (res.data.code.code === 2000) {
          this.$router.push({name: 'articleList'})
        } else {
          alert(res.data.code.message)
        }
      })
    }
  },
  watch: {
    // Watch content change
    content (newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.ue_content) {
          this.ue_content = newVal
          this.quill.pasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    // Watch content change
    value (newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.ue_content) {
          this.ue_content = newVal
          this.quill.pasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    // Watch disabled change
    disabled (newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal)
      }
    }
  }
}
</script>

<style>
.handle-box{
  margin-bottom: 20px;
}
.handle-select{
  width: 120px;
}
.handle-input{
  width: 300px;
  display: inline-block;
}
</style>
