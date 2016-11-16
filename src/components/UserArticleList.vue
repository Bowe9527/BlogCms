<template>
    <div>
        <div class="blog-post" v-for="(article, index) in articles">
            <h2 class="blog-post-title"><router-link :to="{path:'/userArticle', query:{id:article._id}}">{{article.title}}</router-link></h2>
            <p class="blog-post-meta">{{article.created}} by <a href="#">{{article.author}}</a></p>
            <div>{{article.content}}</div>
        </div>

        <nav>
            <ul class="pagination">
                <li><a href="#" class="active">1</a></li>
                <li><a href="#">2</a></li>
            </ul>
        </nav>
    </div>
</template>
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

    },
    components:{

    },
    created(){
        this.getArticleList();
    }
}
</script>

