<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-d-arrow-right"></i> 自述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <h3>README.md</h3>
            <article>
                <h1>manage-system</h1>
                <p>基于Vue + Element UI 的后台管理系统</p>
                <h2>前言</h2>
                <p>该后台为练习使用，功能尚不完善，后面会抽时间慢慢完善的。
                    如果有想要加功能的同学，可在博客上留言，看到就回复，谢谢。</p>
                <p>对应的前台地址：<a href="http://www.5iwyx.xyz:8888/#/index" target="_blank">http://www.5iwyx.xyz:8888/#/index</a></p>
                <p>个人博客地址：<a href="http://blog.csdn.net/u012888052" target="_blank">http://blog.csdn.net/u012888052</a>
                   谢谢大家的支持!
                </p>
                <h2>作者</h2>
                <p>Happy王子乐</p>
                <h2>联系方式</h2>
                <p>QQ：820155406</p>
                <br>
            </article>
        </div>

    </div>
</template>

<script>
export default {
  data: function () {
    return {}
  }
}
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>
