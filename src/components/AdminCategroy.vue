<template>
    <div>
        <h2 class="sub-header">分类列表 </h2>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th width="30%">名称</th>
                    <th>别名</th>
                    <th>创建时间</th>
                    <th>管理</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Javascript</td>
                    <td>Javascript</td>
                    <td>2016-12-12 00:00:00</td>
                    <td><a href="#" class="btn btn-sm btn-success">查看</a> <a href="#" class="btn btn-sm btn-info">编辑</a> <a href="#" class="btn btn-sm btn-danger">删除</a></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style>

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
