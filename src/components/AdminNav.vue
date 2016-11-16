<template>
    <div>
        <ul class="nav nav-sidebar">
            <li class="active"><router-link to="/adminArticleList">文章列表 <span class="sr-only">(current)</span></router-link></li>
            <li><router-link to="/adminAddArticle">添加文章</router-link></li>
            <li><router-link to="/adminCategroy">分类列表</router-link></li>
            <li><router-link to="/adminAddCategroy">分类列表</router-link></li>
        </ul>
        <ul class="nav nav-sidebar">
            <li><a href="">修改密码</a></li>
        </ul>
    </div>
</template>
<style scoped src="../css/dashboard.css">
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>
