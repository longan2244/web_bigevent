$(function () {
    let form = layui.form
    let layer = layui.layer
    //验证规则
    form.verify({
        nikename: function (value) {
            if (value.length > 6) {
                return '昵称必须在1 - 6之间'
            }
        }
    })
    //重置用户信息
    $('.layui-btn-primary').on('click', function (e) {
        getuserinfo()
    })
    getuserinfo()
    //获取用户信息
    function getuserinfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: function (res) {
                if (res.status == 1)
                    return layer.msg(res.message)
                rander(res.data)
            }
        })
    }
    //渲染用户基本资料
    function rander(res) {
        $('[name=title]').val(res.username).attr('style', 'opacity: 0.5;')
        $('[name=nikename]').val(res.nikename || '请设置')
        $('[name=emeail]').val(res.emeail || '00000000@qq.com')
    }
//  提交按钮
    $('.userf').on('submit', function (e) {
        e.preventDefault();
        postuserinfo()
    })
    // 修改
    function postuserinfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: {
                nikename: $('[name=nikename]').val(),
                emeail: $('[name=emeail]').val()
            },
            success: function (res) {
                if (res.status == 1)
                    return layer.msg(res.message)
                layer.msg(res.message)
            }
        })
    }





})