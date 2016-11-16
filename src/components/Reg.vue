<template>
    <div class="container">

        <form class="form-signin">
            <h2 class="form-signin-heading">
                注册
                <small><router-link class="pull-right" to="/login">登录</router-link></small>
            </h2>
            <label class="sr-only">邮箱</label>
            <input type="email" class="form-control" placeholder="Email address" />
            <label class="sr-only">密码</label>
            <input type="password" class="form-control noradius" placeholder="Password" />
            <label class="sr-only">重复密码</label>
            <input type="password" class="form-control" placeholder="Repeat password" />
            <button class="btn btn-lg btn-primary btn-block" type="submit">注册</button>
        </form>

    </div> <!-- /container -->
</template>

<style scoped src="../css/signin.css">
</style>