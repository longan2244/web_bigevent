//切换用户基本资料
$('.jbzl').on('click', function () {
    $('.taghtml').attr('src', "./user/userinf.html")
})
//切换用户修改密码
$('.xgmm').on('click', function () {
    $('.taghtml').attr('src', "./user/updatepwd.html")
})
//切换用户修改头像
$('.xgtx').on('click', function () {
    console.log('666');
    $('.taghtml').attr('src', "./user/avatar.html")
})