// 导入 express 模块
const express = require('express')
//导入跨域模块
const cors = require('cors')
//导入路由模块
const userRouter = require('./router/user')
// 导入并使用个人中心的路由模块：
const userinfoRouter = require('./router/userinfo')
// 导入文章分类模块
const artCateRouter = require('./router/artcate')
// 导入文章模块
const articleRouter = require('./router/article')
//创建app实例
const app = express()
//数据审核
const joi = require('joi')
//配置跨域中间件
app.use(cors())
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
//配置解析JSon的中间件
// app.use(express.json())
//配置send中间件
app.use((req, res, next) => {

    res.cc = function (err, status = 1) {
        res.send(
            {
                status,
                message: err instanceof Error ? err.message : err,
            }
        )
    }

    next()
})
//一定要在路由之前配置token解析中间件 已及config配置文件
const expjwt = require('express-jwt')
const config = require('./router_handler/config')
//({密码，排除不需要身份认证的地址})
app.use(expjwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api|static\//] }))
//使用用户登录注册路由模块
app.use('/api', userRouter)
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
app.use('/my/article', artCateRouter)
app.use('/my/article', articleRouter)
//代码
// 托管静态资源
app.use('/uploads', express.static("./uploads"))
app.use('/static',express.static("./static"))



//监听
app.listen(5139, () => {
    console.log('监听')
})


//定义错误中间件
app.use((err, req, res, next) => {
    //登录—_注册 正则表达式数据验证失败
    if (err instanceof joi.ValidationError) {
        console.log(666);
        return res.cc(err)
    }
    if (err.name == 'UnauthorizedError')
        return res.cc('身份验证失败')
    // 未知错误
    res.cc(err)
})