$(function () {
    getUserInfo()
    let layer = layui.layer
    //获取用户基本信息
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: function (res) {
                if (res.status == 1) {
                    layer.msg(res.message);
                    //强制性清空token
                    localStorage.removeItem('token')
                    return location.href = '/static/login.html'
                }
                renderAvatar(res.data)
                return layer.msg('欢迎你' + res.data.username)
            },
        })
    }
    //渲染用户头像
    function renderAvatar(data) {
        let name = data.nikename || data.username
        //渲染名字
        $('.welcome').html(`欢迎${name}`)
        if (data.user_pic) {
            // console.log('有头像');
            $('.layui-nav-img').attr('src', data.user_pic)
            $('.text_avatar').hide()
        } else {//没有头像
            // console.log('没有头像');
            $('.layui-nav-img').hide()
            //首字母转成大写
            let fisttxt = name[0].toUpperCase()
            $('.text_avatar')
                .html(fisttxt)
                .show()
        }

    }
    //实现退出功能
    $('.loginout').on('click', function () {
        //弹出层
        //eg2
        layer.confirm('确定退出?', function (index) {
            //do something
            //清空
            localStorage.removeItem('token')
            //跳转
            location.href = '/static/login.html'
            layer.close(index);
        });

    })

})