<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-edit"></i>文章</el-breadcrumb-item>
        <el-breadcrumb-item>我的文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-select v-model="select_cate" placeholder="筛选科目" @change="searchByClass" class="handle-select mr10">
        <el-option key="1" label="语文" value="1"></el-option>
        <el-option key="2" label="数学" value="2"></el-option>
        <el-option key="3" label="英语" value="3"></el-option>
        <el-option key="4" label="物理" value="4"></el-option>
        <el-option key="5" label="化学" value="5"></el-option>
        <el-option key="6" label="生物" value="6"></el-option>
        <el-option key="7" label="政治" value="7"></el-option>
        <el-option key="8" label="地理" value="8"></el-option>
        <el-option key="9" label="技术" value="9"></el-option>
      </el-select>
      <el-input v-model="select_word" placeholder="筛选标题" @change="searchByTitle" class="handle-input mr10"></el-input>
      <el-button @click="creatArticle">发布文章</el-button>
    </div>
    <el-table :data="this.tableData" border style="width: 100%" ref="multipleTable">
      <el-table-column prop="title" label="标题" width="200">
      </el-table-column>
      <el-table-column prop="type" :formatter="filterByType" label="所属科目">
      </el-table-column>
      <el-table-column prop="lookNumber" label="浏览数" width="80">
      </el-table-column>
      <el-table-column prop="likeNumber" label="点赞数" width="80">
      </el-table-column>
      <el-table-column prop="commentNumber" label="评论数" width="80">
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" sortable>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新日期" sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change ="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="this.tableData.size"
        :total="this.totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ArticleAPI } from '@/api'

export default {
  data () {
    return {
      tableData: [],
      totalElements: null,
      page: {
        id: null,
        teacherAccountId: localStorage.getItem('teacherAccountId'),
        teacherName: null,
        title: null,
        content: null,
        type: null,

        page: 0,
        size: 10,
        sort: 'id',
        direction: 'desc'
      },
      select_cate: '',
      select_word: '',
      is_search: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      ArticleAPI.findByPage(this.page).then((res) => {
        console.log(res)
        if (res.data.code.code === 2000) {
          this.tableData = res.data.data.content
          this.totalElements = res.data.data.totalElements
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].createTime = this.formatTime(this.tableData[i].createTime)
            this.tableData[i].updateTime = this.formatTime(this.tableData[i].updateTime)
          }
        } else {
          alert(res.data.code.message)
        }
      })
    },
    handleEdit (index, row) {
      localStorage.aticle_id = this.tableData[index].id
      localStorage.aticle_title = this.tableData[index].title
      localStorage.aticle_content = this.tableData[index].content
      this.$router.push({name: 'articleEdit'})
    },
    handleDelete (index, row) {
      const params = {
        id: this.tableData[index].id
      }
      ArticleAPI.delete(params).then((res) => {
        if (res.data.code.code === 2000) {
          this.getData()
        } else {
          alert(res.data.code.message)
        }
      })
    },
    formatNumber (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    },
    formatTime (number) {
      var formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
      var returnArr = []
      var format = 'Y-M-D h:m:s'

      var date = new Date(number)
      returnArr.push(date.getFullYear())
      returnArr.push(this.formatNumber(date.getMonth() + 1))
      returnArr.push(this.formatNumber(date.getDate()))

      returnArr.push(this.formatNumber(date.getHours()))
      returnArr.push(this.formatNumber(date.getMinutes()))
      returnArr.push(this.formatNumber(date.getSeconds()))

      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i])
      }
      return format
    },
    creatArticle () {
      localStorage.removeItem('aticle_id')
      localStorage.removeItem('aticle_title')
      localStorage.removeItem('aticle_content')
      this.$router.push({name: 'articleEdit'})
    },
    handleCurrentChange (val) {
      console.log(val)
      this.page.page = val - 1
      this.getData()
    },
    searchByClass (val) {
      this.page.type = val
      this.getData()
    },
    searchByTitle (val) {
      this.page.title = val
      this.getData()
    },
    filterByType (event) {
      const type = event.type
      switch (type) {
        case 0:
          return '全部'
        case 1:
          return '语文'
        case 2:
          return '数学'
        case 3:
          return '英语'
        case 4:
          return '物理'
        case 5:
          return '化学'
        case 6:
          return '生物'
        case 7:
          return '政治'
        case 8:
          return '地理'
        case 9:
          return '技术'
      }
    }
  }
}
</script>

<style scoped>
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
