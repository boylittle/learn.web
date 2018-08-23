<template>
  <div class="quill-editor">
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
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
    <button @click="saveArticle()">保存</button>
  </div>
</template>

<script>
import { ArticleAPI } from '@/api'

// 引入编辑器
import _Quill from 'quill'
import defaultOptions from '../../../static/js/options'
const Quill = window.Quill || _Quill

// // pollfill
// if (typeof Object.assign !== 'function') {
//   Object.defineProperty(Object, 'assign', {
//     value (target, varArgs) {
//       if (target == null) {
//         throw new TypeError('Cannot convert undefined or null to object')
//       }
//       const to = Object(target)
//       for (let index = 1; index < arguments.length; index++) {
//         const nextSource = arguments[index]
//         if (nextSource != null) {
//           for (const nextKey in nextSource) {
//             if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
//               to[nextKey] = nextSource[nextKey]
//             }
//           }
//         }
//       }
//       return to
//     },
//     writable: true,
//     configurable: true
//   })
// }

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
        type: localStorage.getItem('type')
      }
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
        console.log(localStorage.getItem('aticle_content'))
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
    saveArticle () {
      console.log(this.article.userId)
      const params = {
        userId: this.article.userId,
        id: this.article.id,
        title: this.article.title,
        content: this.ue_content,
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
