<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" v-bind:key="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" v-bind:key="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'el-icon-d-arrow-right',
          index: 'readme',
          title: '自述'
        },
        {
          icon: 'el-icon-edit',
          index: 'article',
          title: '文章',
          subs: [
            {
              index: 'articleList',
              title: '我的文章'
            }
          ]
        },
        {
          icon: 'el-icon-setting',
          index: 'setting',
          title: '设置',
          subs: [
            {
              index: 'userSetting',
              title: '个人设置'
            },
            {
              index: 'systemSetting',
              title: '系统设置'
            }
          ]
        },
        {
          icon: 'el-icon-star-on',
          index: 'explore',
          title: '个人探索',
          subs: [
            {
              index: 'bgManager',
              title: '背景图片管理'
            },
            {
              index: 'transition',
              title: '背景图片过渡'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
