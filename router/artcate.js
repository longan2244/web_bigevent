// 导入 express
const express = require('express')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
//// 2. 导入需要的验证规则对象 
const { add_cate_schema } = require("../schema/user")
//导入文章处理模块函数
const { delete_cate_schema } = require("../schema/user")
//导入文章处理模块函数
const artcate_handler = require("../router_handler/artcate")
//导入根据id修改文章类别
const { update_cate_schema } = require("../schema/user")
const router = express.Router()
//获取文章分类 
router.get('/cates', artcate_handler.getArticleCates)
//添加文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
//删除文章分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
//撤回文章分类
router.get('/deletecatechehui/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateByIdchehui)
//根据id获取文章分类
router.get('/cates/:id', expressJoi(delete_cate_schema), artcate_handler.getArtCateById)
// 4.6 根据 Id 更新文章分类数据
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

module.exports = router
