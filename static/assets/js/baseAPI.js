// 每次发送ajax请求之前都会先访问这个函数
$.ajaxPrefilter((options) => {
    // 发送真正的ajax 请求之前 拼接请求根路径
    options.url = 'http://localhost:5139' + options.url
    //含有/my才会执行
      if(options.url.indexOf('/my')!== -1) {
          options.headers = {
              Authorization: localStorage.getItem('token') || ''
          }
      }

})