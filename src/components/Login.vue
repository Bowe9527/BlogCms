<template>
    <div class="container">

        <form class="form-signin">
            <h2 class="form-signin-heading">
                登录
                <small><router-link class="pull-right" to="/reg">注册</router-link></small>
            </h2>
            <label class="sr-only">邮箱</label>
            <input type="email" class="form-control" placeholder="Email address" />
            <label class="sr-only">密码</label>
            <input type="password" class="form-control" placeholder="Password" />
            <div class="checkbox">
                <label>
                    <input type="checkbox" value="remember-me"> 记住我
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
        </form>

    </div> <!-- /container -->
</template>

<style scoped src="../css/signin.css">
</style>