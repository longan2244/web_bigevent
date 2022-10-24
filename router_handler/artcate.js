// 导入数据库
const db = require('../db/index')
//导入mysql直段
const mysqlgetArticleCates = 'select * from ev_article_cate where is_delete=0 order by id asc'
// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const mysqladdArticleCates = `select * from ev_article_cate where name=? or alias=?`
// 定义新增文章分类的 SQL 语句：
const mysqladdArticleCates2 = `insert into ev_article_cate set ?`
// 删除
const mysqldeleteCateById = `update ev_article_cate set is_delete=1 where id=?`
//撤回
const mysqldeleteCateById2 = `update ev_article_cate set is_delete=0 where id=?`
// 根据id查找文章分类
const mysqlgetArtCateById = `select * from ev_article_cate where id=?`
//根据id修改文章分类
const mysqlupdateCateById = `update ev_article_cate set ? where Id=?`
// 获取文章分类
exports.getArticleCates = (req, res) => {
    db.query(mysqlgetArticleCates, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('获取文章分类列表失败为空！')
        return res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })
}
// 添加文章分类
exports.addArticleCates = (req, res) => {
    //获取req.body.name
    let un = req.body.name
    //获取req.body.alias
    let ua = req.body.alias
    new Promise((resolve, reject) => {
        db.query(mysqladdArticleCates, [un, ua], (err, results) => {
            if (err) return res.cc(err)
            console.log(results);
            //数据库操作 如果leng==2 分类名称与别名被占用，请更换后重试！
            if (results.length == 2) return res.cc('分类名称被占用，请更换后重试！L2')
            //数据库操作 如果leng==1 && 用户name=服务器name&& alias=服务器alias 分类名称与别名被占用，请更换后重试！
            if (results.length == 1 && results[0].name == un && results[0].alias == ua) return res.cc('分类名称与别名被占用，请更换后重试！L1')
            //数据库操作 如果leng==1 && 用户name=服务器name 分类名称被占用，请更换后重试！
            if (results.length == 1 && results[0].name == un) return res.cc('分类名称被占用，请更换后重试！')
            //数据库操作 如果leng==1 && alias=服务器alias  分类别名被占用，请更换后重试！
            if (results.length == 1 && results[0].alias == ua) return res.cc('分类别名被占用，请更换后重试！')
            return resolve()
        })
    }).then(() => {//完成后到这l
        //TODO:添加图书
        db.query(mysqladdArticleCates2, [req.body], (err, results) => {
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            return res.cc('添加成功', 0)
        })
    })
}

// 删除文章分类
exports.deleteCateById = (req, res) => {
    //查看是否存在id1
    db.query(mysqldeleteCateById, [req.params.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('删除失败')
        return res.cc('文章删除成功', 0)
    })
}

// 撤回文章分类
exports.deleteCateByIdchehui = (req, res) => {
    //查看是否存在id1
    db.query(mysqldeleteCateById2, [req.params.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('撤回失败')
        return res.cc('文章撤回成功', 0)
    })
}
//根据id获取文章分类

exports.getArtCateById = (req, res) => {
    db.query(mysqlgetArtCateById, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 0) return res.cc('查询失败')
        return res.send({
            status: 0,
            message: '查询成功',
            data: results[0]
        })
    })
}


exports.updateCateById = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    let test = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)'
    new Promise((resolve, reject) => {
        db.query(test, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
            if (err) return res.cc(err)
            // 分类名称 和 分类别名 都被占用
            if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
            if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
            // 分类名称 或 分类别名 被占用
            if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
            if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
            //查重结束
            return resolve()
        })
    }).then(() => {
        // 查找idmysq语句
        db.query(mysqlgetArtCateById, req.body.Id, (err, results) => {
            if (err) return res.cc(err)
        })
    }).then(() => {
        db.query(mysqlupdateCateById, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('修改失败 id 可能不存在')
             //id唯一后
            return res.cc('修改成功', 0)
        })
    })
}