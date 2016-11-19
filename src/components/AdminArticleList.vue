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

        <div class="table-responsive articleList">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th width="30%">
                        <a href="javascript:;" @click="sortList(1, 'title', sortdir)">标题
                            <span v-show="showArrow=='title'">{{arrow}}</span></a>
                    </th>
                    <th>
                        <a href="javascript:;" @click="sortList(1, 'category', sortdir)">分类
                            <span v-show="showArrow=='category'">{{arrow}}</span></a></th>
                    <th>
                        <a href="javascript:;" @click="sortList(1, 'author', sortdir)">作者
                            <span v-show="showArrow=='author'">{{arrow}}</span></a></th>
                    <th>添加时间</th>
                    <th>被赞</th>
                    <th>评论</th>
                    <th>
                        <a href="javascript:;" @click="sortList(1, 'published', sortdir)">状态
                            <span v-show="showArrow=='published'">{{arrow}}</span></a></th>
                    <th>管理</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(article,index) in articles">
                    <td>{{article.title}}</td>
                    <td>{{article.category.name}}</td>
                    <td>{{article.author.name}}</td>
                    <td>{{article.created}}</td>
                    <td>{{article.meta.favorites}}</td>
                    <td>{{article.comments.length}}</td>
                    <td>{{article.published}}</td>
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
                <li v-for="n in pages" :class="{'active':n==curPage}">
                    <a href="javascript:;" @click="getArticleList(n, sortby, followPageSort)">{{n}}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<style>

</style>
<script>
import moment from 'moment'

export default{
    data(){
        return{
            articles:[],
            pages:[],
            curPage:1,
            pageCount:Number,

            sortby:'',
            sortdir:'asc',
            followPageSort:'',
            arrow:'',
            showArrow:'published'
        }
    },
    methods:{
        //获取所有文章
        getArticleList(page, sortby, sortdir){
            this.$http.get('/admin/article?page='+page+'&sortby='+sortby+'&sortdir='+sortdir).then(function(res){
                //console.log('result:'+JSON.stringify(res.body.result));

                this.pages=[];

                this.articles = res.body.result;
                this.pageCount = res.body.pageCount;
                this.curPage = res.body.curPage;
                this.showArrow = res.body.sortby;

                //the time&conent has formated
                for(let i=0; i<this.articles.length; i++){
                    this.articles[i].created=moment(this.articles[i].created).format('YYYY-MM-DD HH:MM:SS');
                }

                for(var i=0; i<this.pageCount; i++){
                    this.pages.push(i+1);
                }
            },function(res){
                alert('获取文章列表失败： '+ res.status);
            });
        },

        //删除文章
        deleteArticle(id, index){
            this.$http.delete('/article/' + id).then(function(res){
                if(res.status==200) this.articles.splice(index,1);

                if(this.articles.length<1){
                    this.getArticleList(1);
                }
            }, function(res){
                alert('删除文章列表： '+ res.status);
            });
        },

        //format: sortby(1, 'title', 'desc')
        sortList(page, sortby, sortdir){
            this.sortby=sortby;
            if(this.sortdir=='desc'){
                this.arrow='⤓';
                this.sortdir='asc';
                this.followPageSort='desc' //点击翻页和点击那个选项正好相反
            }else{
                this.arrow='⤒';
                this.sortdir='desc';
                this.followPageSort='asc'
            }
            this.getArticleList(page, sortby, sortdir);
        }
    },
    components:{

    },
    created(){
        this.getArticleList(1, 'created', 'desc');
    }
}
</script>
