import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import login from './components/Login.vue'
import reg from './components/Reg.vue'
import user from './components/User.vue'
import userArticleList from './components/UserArticleList.vue'
import userCategoryArticleList from './components/UserCategoryArticleList.vue'
import userAbout from './components/UserAbout.vue'
import userArticle from './components/UserArticle.vue'
import admin from './components/Admin.vue'
import adminArticleList from './components/AdminArticleList.vue'
import adminAddArticle from './components/AdminAddArticle.vue'
import adminCategroy from './components/AdminCategroy.vue'
import adminAddCategroy from './components/AdminAddCategroy.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

//routes config
const routes=[
  {path:'/', redirect:'/userArticleList'},
  {path:'/login', component: login, name:'login'},
  {path:'/reg', component: reg, name:'reg'},
  {path: '/user', component: user,
    children:[
      {path:'/userArticleList', component:userArticleList, name:'userArticleList'},
      {path:'/userCategoryArticleList', component:userCategoryArticleList, name:'userCategoryArticleList'},
      {path:'/userArticle', component:userArticle, name:'userArticle'},
      //{path:'/userFavorite', component:userFavorite, name:'userFavorite'},
      {path:'/userAbout', component:userAbout, name:'userAbout'}

    ]
  },
  {path: '/admin', component:admin,
    children:[
      {path:'/adminArticleList', component:adminArticleList, name:'adminArticleList'},
      {path:'/adminAddArticle', component:adminAddArticle, name:'adminAddArticle'},
      {path:'/adminCategroy', component:adminCategroy, name:'adminCategroy'},
      {path:'/adminAddCategroy', component:adminAddCategroy, name:'adminAddCategroy'}
    ]
  }
];

//genartor VueRouter object
const router=new VueRouter({
    mode: 'history',
  routes
});

//bind and render
const app=new Vue({
  router,
  render: h=>h(App)
}).$mount('#app');





