//TODO：用户信息
//导入模块
const express = require('express')
//创建路由对象
const router = express.Router()
// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
//导入验证模块中间件
const expressJoi = require('@escook/express-joi')
//导入验证规则对象：
const { update_userinfo_schema } = require("../schema/user")
const { update_password_schema } = require("../schema/user")
const { update_avatar_schema } = require("../schema/user")
//注册路由
// 获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
// 更新用户基本信息(验证模块)
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
//重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)
//共享路由
module.exports = router