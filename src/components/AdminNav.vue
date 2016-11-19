<template>
    <div>
        <ul class="nav nav-sidebar">
            <router-link to="/adminArticleList" tag="li"><a href="javascript:;"><i class="fa fa-files-o"></i>&nbsp;文章列表</a></router-link>
            <router-link to="/adminAddArticle" tag="li"><a href="javascript:;"><i class="fa fa-file-o"></i>&nbsp;添加文章</a></router-link>
            <router-link to="/adminCategroy" tag="li"><a href="javascript:;"><i class="fa fa-th-list"></i>&nbsp;分类列表</a></router-link>
            <router-link to="/adminAddCategroy" tag="li"><a href="javascript:;"><i class="fa fa-plus"></i>&nbsp;分类列表</a></router-link>
        </ul>
        <ul class="nav nav-sidebar">
            <router-link to="/settingPwd" tag="li"><a href="javascript:;"><i class="fa fa-lock"></i>&nbsp;修改密码</a></router-link>
        </ul>
    </div>
</template>
<style scoped src="../css/dashboard.css">
</style>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{

        },
        components:{

        }
    }
</script>
