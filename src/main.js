import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import login from './components/Login.vue'
import reg from './components/Reg.vue'
import user from './components/User.vue'
import userArticleList from './components/UserArticleList.vue'
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
  {path:'/login', component: login},
  {path:'/reg', component: reg},
  {path: '/user', component: user,
    children:[
      {path:'/userArticleList', component:userArticleList},
      {path:'/userArticle', component:userArticle},
      {path:'/userAbout', component:userAbout}

    ]
  },
  {path: '/admin', component:admin,
    children:[
      {path:'/adminArticleList', component:adminArticleList},
      {path:'/adminAddArticle', component:adminAddArticle},
      {path:'/adminCategroy', component:adminCategroy},
      {path:'/adminAddCategroy', component:adminAddCategroy}
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





