//TODO ：初始化路由处理函数模块
// 导入数据库操作模块
const db = require('../db/index')
//导入解密和加密模块
const passwordcontaiter = require('./user')
// 定义 SQL 语句：
const mysqlgetUserInfo = 'select id, username, nikename, emeail, user_pic from ev_users where id=?'
const mysqlupdateUserInfo = `update ev_users set ? where id=?`
const mysqlupdatePassword = 'update ev_users set password=? where id=?'
const mysqlupdateAvatar = 'update ev_users set user_pic=? where id=?'
// 定义根据 id 查询用户数据的 SQL 语句
const mysqlsqlid = 'select * from ev_users where id=?'


// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    //调用 db.query() 执行 SQL 语句：
    // req 对象上的 user 属性，是 Token 解析成功，express - jwt 中间件帮我们挂载上去的
    db.query(mysqlgetUserInfo, req.user.id, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.length == 0) {
            return res.cc('获取用户信息失败')
        }
        return res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}
// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    db.query(mysqlupdateUserInfo, [req.body, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) {
            return res.cc('更新失败')
        }
        console.log(results);
        return res.cc('修改用户基本信息成功！', 0)
    })
}



//重置密码 的路由处理函数：
exports.updatePassword = (req, res) => {
    new Promise((resolve, reject) => {
        // 判断id是否存在
        db.query(mysqlsqlid, req.user.id, (err, results) => {
            if (err) return res.cc(err)
            if (results.length != 1) return res.cc('用户不存在')
            console.log(results);

            //旧密码与服务器密码比较 是否输入正确
            let flgb = passwordcontaiter.CompareSyn(req.body.oldp, results[0].password)
            if (!flgb) return res.cc('旧密码错误')
            // 新密码与服务器密码比较
            let flgo = passwordcontaiter.CompareSyn(req.body.newp, results[0].password)
            if (flgo) {
                return res.cc('不能设置近期密码')
            }
            resolve(passwordcontaiter.HashSync(req.body.newp))
            // console.log(passwordcontaiter.HashSync(req.body.newp));
            // return res.cc('修改成功')
        })
    }).then(reso => {  //reso 加密后的密码
        db.query(mysqlupdatePassword, [reso, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新失败')
            console.log(results);
            return res.cc('更新成功', 0)
        })
    })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    db.query(mysqlupdateAvatar, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1)
            return res.cc('更新失败')
        return res.cc('更新成功', 0)
    })
}
// 3.4 更新用户头像的处理函数

