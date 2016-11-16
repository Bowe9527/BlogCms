<template>
    <div>
        <h2 class="sub-header">文章列表 </h2>
        <form class="form-inline form-filter">
            <div class="form-group">
                <label>分类</label>
                <select class="form-control" name="categroy">
                    <option>Javascript</option>
                </select>
            </div>
            <div class="form-group">
                <label>作者</label>
                <select class="form-control" name="author">
                    <option>admin</option>
                </select>
            </div>
            <div class="form-group">
                <label>关键词</label>
                <input class="form-control" name="keyword" type="text" />
            </div>
            <button class="btn btn-info">筛选</button>
        </form>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th width="30%">标题</th>
                    <th>分类</th>
                    <th>作者</th>
                    <th>添加时间</th>
                    <th>被赞</th>
                    <th>评论</th>
                    <th>状态</th>
                    <th>管理</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(article,index) in articles">
                    <td>{{article.title}}</td>
                    <td>{{article.category}}</td>
                    <td>{{article.author}}</td>
                    <td>{{article.created}}</td>
                    <td>0</td>
                    <td>3</td>
                    <td>已发布</td>
                    <td>
                        <router-link class="btn btn-sm btn-success" :to="{path:'/userArticle', query:{id:article._id}}">查看</router-link>
                        <router-link class="btn btn-sm btn-info" :to="{path:'/adminAddArticle', query:{id:article._id}}">编辑</router-link>
                        <a href="javascript:;" class="btn btn-sm btn-danger" @click="deleteArticle(article._id, index)">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <nav>
            <ul class="pagination">
                <li><a href="#" class="active">1</a></li>
                <li><a href="#">2</a></li>
            </ul>
        </nav>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                articles:[],
            }
        },
        methods:{
            //获取所有文章
            getArticleList(){
                this.$http.get('/article').then(function(res){
                    this.articles=eval('('+ res.body +')');
                },function(res){
                    alert('获取文章列表失败： '+ res.status);
                });
            },
            //删除文章
            deleteArticle(id, index){
                this.$http.delete('/article/' + id).then(function(res){
                    if(res.status==200) this.articles.splice(index,1);
                }, function(res){
                    alert('删除文章列表： '+ res.status);
                });
            }
        },
        components:{

        },
        created(){
            this.getArticleList();
        }
    }
</script>
