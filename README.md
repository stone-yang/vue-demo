# Javascript Fullstack Demo

> 这个项目尝试用js全栈技术搭建一个完整的web应用(google keep高仿版)。仅用于技术演练以及学习参考，不涉及任何商业用途。
> 
> This demo aims for building a complete web application via javascript fullstack techniques. It is used only for studying and practising purpose, and is not supposed to be involved in any commercial activities.

## 技术栈 Tech Stack
**浏览器端 Browser**
> 
> * vue
> * vuex
> * axios
> * less

**服务器端 Server**
> 
> * koa
> * mongodb

**构建工具 Build Tools**
> 
> * webpack
> * babel
> * eslint

## 运行方式 Build Setup

**安装配置 Install Mongodb**   
安装指导 instruction <https://docs.mongodb.com/manual/administration/install-community/>  
在项目目录下的`config/index.js`文件找到mongodb配置并修改

```
// find config/index.js and set mongodb connection url
mongo: { 
  url: 'mongodb://' + MONGO_HOST + ':27017/noteskeep', 
},
...
```
**运行开发环境 Run Development Environment**

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev
```  
**运行生产环境 Run Production Environment**

``` bash
# build for production with minification
npm run build

# serve for production at localhost:3000
npm run prod
```
## 预览 Preview

