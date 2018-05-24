import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'login'
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      name: 'home',
      children: [
        {
          path: '/readme',
          name: 'readme',
          component: resolve => require(['../components/page/Readme.vue'], resolve)
        },
        {
          path: '/articleList',
          name: 'articleList',
          component: resolve => require(['../components/page/ArticleList.vue'], resolve)
        },
        {
          path: '/articleEdit',
          name: 'articleEdit',
          component: resolve => require(['../components/page/ArticleEdit.vue'], resolve)
        },
        {
          path: '/userSetting',
          name: 'userSetting',
          component: resolve => require(['../components/page/UserSetting.vue'], resolve)
        },
        {
          path: '/systemSetting',
          name: 'systemSetting',
          component: resolve => require(['../components/page/SystemSetting.vue'], resolve)
        },
        {
          path: '/baseCharts',
          name: 'baseCharts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve)
        },
        {
          path: '/baseForm',
          name: 'baseForm',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/ueditor',
      name: 'ueditor',
      component: resolve => require(['../components/ueditor/src/ueditor.vue'], resolve)
    }
  ]
})

Vue.prototype.setCookie = (cname, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
