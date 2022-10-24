// 导入包
const joi = require('joi')
/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则 
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// 定义 id, nikename, emeail 的验证规则
// const id = joi.number().integer().min(1).required()
const nikename = joi.string().required()
const emeail = joi.string().email().required()
//定义用户头像规则
const avatar = joi.string().dataUri().required()
//文章规则
const name = joi.string().required()
//别名规则
const alias = joi.string().alphanum().required()
//删除id规则
const id = joi.number().integer().min(1).required()


//添加文章对象
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}
//删除文章对象
exports.delete_cate_schema = {
    params: {
        id,
    },
}
// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body: {
        nikename,
        emeail,
    },
}


exports.update_password_schema = {
    body: {
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
        // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        oldp: password,
        newp: joi.not(joi.ref('oldp')).concat(password)
    },
}

exports.update_avatar_schema = {
    body: {
        avatar,
    }
}


// 根据 Id 更新文章分类数据
// 校验规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}