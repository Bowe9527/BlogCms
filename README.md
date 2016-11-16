> A Blog CMS Powered By Vuejs+Nodejs+Express+Mongodb

>  全栈开发之博客内容管理系统:一个前端基于Vuejs2.0，后端基于Nodejs，数据库基于Mongod的博客内容管理器

> 开发环境: MACpro

## Feauter

* 前后台的CURD


## 前端
* Vue.js
* Vue-Router
* Vue-resource
* Vue-loader
* Bootstrap

## 后端
* Node.js
* Express

## 数据库
* mongoDB
* mongoose

## 工具和语言
* Webpack
* ECMAScript6
* HTML5
* Chrome V8
* vue-cli



## 主要依赖包
* webpack(webpack-dev-server)
* vue-loader
* vue-html-loader css-loader vue-style-loader
* vue-html-loader css-loader vue-style-loader
* vue-hot-reload-api
* babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015 babel-runtime
* copy-webpack-plugin
* extract-text-webpack-plugin
* FontAwesome

## 本地测试
* 安装node环境, nodejs.org
* 安装mongodb数据库,mongodb.org, MAC下可以brew install mongoldb安装；使用方法http://docs.mongoing.com/manual-zh/
* 查看本地是否开启mongo进程：ps -A | grep mongo
* MAC开启服务命令：mongod --dbpath "/usr/local/var/mongodb" （前提是没有修改默认路径）


克隆远程库
```
git clone https://github.com/wangzhongjie/BlogCms.git
```
进入项目目录
```
cd BlogCms
```
安装依赖
```
npm install
```
进入服务器所在文件夹并运行服务器
```
cd server
node server
```
打开浏览器输入http://localhost:3300/

## 持续完善中
