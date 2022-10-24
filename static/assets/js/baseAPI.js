// 每次发送ajax请求之前都会先访问这个函数
$.ajaxPrefilter((options) => {
    // 发送真正的ajax 请求之前 拼接请求根路径
    options.url = 'http://localhost:5139' + options.url
})