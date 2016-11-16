<template>
    <div>
        <h2 class="sub-header">添加分类 </h2>
        <form class="vertical-form" method="post">
            <div class="form-group">
                <label>分类名称</label>
                <input class="form-control input-lg" type="text" v-model="categroyName" />
            </div>
            <button class="btn btn-primary" type="submit" @click="addCategroy">发布</button>
        </form>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                categroyName: String
            }
        },
        methods:{
            addCategroy(){

            }
        },
        components:{

        }
    }
</script>
