//TUTO:文章内容 处理函数
// 导入处理路径的 path 核心模块
const path = require('path')
const db = require("../db/index")
const sqladdArticle = `insert into ev_articles set ?`
// 5.2 发布新文章
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
    // TODO：表单数据合法，继续后面的处理流程...
    let articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }
    db.query(sqladdArticle, [articleInfo], (err, result) => {
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')

        // 发布文章成功
        res.cc('发布文章成功', 0)
    })
}