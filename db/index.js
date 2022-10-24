//导入mysql
const mysql = require('mysql')
//配置
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'new_db01'
})
// db.query('select 1', (err, res) => {
//     if (err) return console.log(err.message);//如果运行这段代码说明有问题
//     console.log(res);   //[ RowDataPacket { '1': 1 } ] 说明成功
//     //共享数据库 
    module.exports = db