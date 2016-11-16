<template>
    <div>
        <h2 class="sub-header">添加文章 </h2>
        <form class="vertical-form" method="post">
            <div class="form-group">
                <label>标题</label>
                <input class="form-control input-lg" type="text" v-model="title" placeholder="请输入标题..." />
            </div>
            <div class="form-group">
                <label>分类</label>
                <select class="form-control input-lg" v-model="category">
                    <option value="0">Javascript</option>
                    <option value="1">css</option>
                    <option value="2">html</option>
                    <option value="3">tools</option>
                </select>
            </div>
            <div class="form-group">
                <label>内容</label>
                <textarea class="form-control" v-model="content"></textarea>
            </div>
            <a class="btn btn-primary" @click="add">{{submit}}</a>
        </form>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                title:'',
                category:'',
                content:'',
                submit:'',
                id:''
            }
        },
        methods:{
            add(){
                //改
                if(this.id!=''){
                    this.$http.put('/article/'+ this.id,{
                        title:this.title,
                        content: this.content,
                        author: 'admin',
                        category:this.category,
                        created: new Date
                    }).then(function(res){
                        if(res.status==200) console.log('修改文章成功');
                        window.location.href='adminArticleList';
                    },function(res){
                        console.log('添加文章失败： '+ res.status);
                    });
                //增
                }else{
                    this.$http.post('/article',{
                        title:this.title,
                        content: this.content,
                        author: 'admin',
                        category:this.category,
                        created: new Date
                    }).then(function(res){
                        if(res.status==200) console.log('添加文章成功');
                        this.title='';
                        this.category='';
                        this.content='';
                    },function(res){
                        alert('添加文章失败： '+ res.status);
                    });
                }
            },

            //显示要修改的文章
            getModifyArticle(id){
                this.$http.get('/article/'+ id).then(function(res){
                    const article=eval('('+res.body+')');

                    this.title=article.title;
                    this.category=article.category;
                    this.content=article.content;
                },function(res){
                    alert('获取文章失败： '+ res.status);
                });
            }
        },
        created(){
            this.submit='添加';
            this.id=window.location.search.split('=')[1];
            if(this.id){
                this.submit='修改';
                this.getModifyArticle(this.id);
            }else{
                this.id='';
            }
        }
    }
</script>
