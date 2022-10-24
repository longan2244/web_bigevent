/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 * 2.3.3 对密码进行加密处理
 * 在当前项目中，使用 bcryptjs 对用户密码进行加密，优点：
 */
//导入bcryptjs
const bcrypt = require('bcryptjs');
//导入生成token 的包
const jsonwebtoken = require('jsonwebtoken')
//导入config
const config = require('./config')
// 导入数据库
const db = require('../db/index')
//查询用户
const sqlregUser = 'select * from ev_users where username=?'
//add用户
const sqlregUseradd = 'insert into ev_users set ?'
// 注册用户的处理函数
exports.regUser = (req, res) => {
    //判断是否合法(中间件托管)
    // if (!req.body.username || !req.body.password)
    //     // return res.send({ status: 1, message: '用户名或密码不能为空！' })
    //     return res.cc("用户名或密码不能为空！")




    //2.3.2 检测用户名是否被占用
    new Promise(function (resolve, reject) {
        db.query(sqlregUser, [req.body.username], (err, results) => {
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }
            //用户名被占用 
            if (results.length > 0) {
                return res.cc('用户名被占用 ')
            }
            //可以使用的情况下
            req.body.password = HashSync(req.body.password)//加密用户密码
            // 2.3.4 插入新用户
            resolve(req.body)
        })
    }).then(resolve => {
        // 2.3.4 插入新用户
        db.query(sqlregUseradd, resolve, (err, results) => {
            if (err) {
                // return res.send({ status: 0, message: err.message })
                return res.cc(err)//SQl语句错误
            }
            if (results.affectedRows != 1) {
                // return res.send({ status: 0, message: "注册失败,稍后再试" })
                return res.cc('注册失败,稍后再试')
            }
            // return res.send({ status: 1, message: "注册成功" })
            return res.cc('注册成功', 0)
        })
    })

}

// 登录的处理函数
exports.login = (req, res) => {
    let reqobj = req.body
    new Promise(function (resolve, reject) {
        db.query(sqlregUser, reqobj.username, (err, results) => {
            //sql语句错误
            if (err) return res.cc(err)
            if (results.length == 0) return res.cc('未注册请去注册')
            console.log(reject.length);
            //用户存在
            resolve(results)
        })

    }).then(data => {
        if (!CompareSync(reqobj.password, data[0].password)) {
            return res.cc('账号或密码错误')
        }
        // return res.cc('成功登录',0)
        let user = { ...data[0], password: '', user_pic: '' }
        console.log(user);
        //对用户信息加密，生成token字符串 （用户对象   秘钥   过期时间）
        let tokenStr = jsonwebtoken.sign(user, config.jwtSecretKey, { expiresIn: config.tokentime })
        console.log(tokenStr);
        return res.send({
            status: 0,
            message: '成功登录',
            //方便前端使用
            token: 'Bearer ' + tokenStr,
        })
    })
}

// 加密
function HashSync(password) {
    return bcrypt.hashSync(password, 10)//明文密码 强度10
}
//解密
function CompareSync(userpassword, mysqlpassword) {
    // console.log(userpassword, mysqlpassword);
    console.log(bcrypt.compareSync(userpassword, mysqlpassword));
    return bcrypt.compareSync(userpassword, mysqlpassword)//明文密码 长度
}




// // 加密
exports.HashSync = password => {
    return bcrypt.hashSync(password, 10)//明文密码 强度10
}
// //解密
exports.CompareSyn = (userpassword, mysqlpassword) => {
    // console.log(userpassword, mysqlpassword);
    // console.log(bcrypt.compareSync(userpassword, mysqlpassword));
    return bcrypt.compareSync(userpassword, mysqlpassword)//明文密码 长度
}

