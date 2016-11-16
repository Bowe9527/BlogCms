<template>
    <div>
        <div class="blog-post">
            <h2 class="blog-post-title">{{article.title}}</h2>
            <p class="blog-post-meta">时间：{{article.created}} 作者：{{article.author}} 分类：<a href="#">{{article.category}}</a>  评论：0  被赞：0</p>
            <div>{{article.content}}</div>
        </div><!-- /.blog-post -->

        <div class="post-comment">
            <h3>用户评论</h3>
            <div class="post-comment-list">
                <h5 class="post-comment-email">2324234@qq.com</h5>
                <p class="post-comment-content">sdlfkjsdlfksdfkl</p>
            </div>

            <p class="alert alert-info">还没有评论</p>

            <form class="post-comment-form">
                <h3>添加评论</h3>
                <div class="form-group">
                    <label>邮箱</label>
                    <input class="form-control" name="email" type="text" placeholder="请输入邮箱..." />
                </div>
                <div class="form-group">
                    <label>内容</label>
                    <textarea class="form-control" name="content"></textarea>
                </div>
                <button class="btn btn-primary">提交</button>
            </form>
        </div>

    </div>
</template>
<script>
export default{
    data(){
        return{
            article:{},
            id:''
        }
    },
    methods:{
        //显示文章
        getArticle(id){
            this.$http.get('/article/'+ id).then(function(res){
                this.article=eval('('+res.body+')');
            },function(res){
                alert('获取这篇文章失败： '+ res.status);
            });
        }
    },
    created(){
        this.id=window.location.search.split('=')[1];
        this.getArticle(this.id);
    }
}
</script>
<style>
.post-comments,
.post-comment-form {
    margin-top: 30px;
}

.post-comment-item {
    border: 1px dotted #DDDDDD;
    padding: 10px;
    margin-bottom: 10px;
}

.post-comment-email {
    border-bottom: 1px dotted #DDDDDD;
}
</style>
