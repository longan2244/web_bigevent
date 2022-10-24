$(function () {
    //点击去注册的连接
    $('#link_reg').on('click', function (e) {
        $('.login-box').stop().hide()
        $('.reg-box').stop().show()
        console.log('666');
    })
    //点击去登录的连接
    $('#link_login').on('click', function (e) {
        $('.reg-box').stop().hide()
        $('.login-box').stop().show()
    })
    //layui自定义规则
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if ($('.reg-box [name=password]').val() != value) {
                return '两次输入的密码不一致'
            }
        }

    })


    //监听注册表单
    $('#form_reg').on('submit', function (e) {
        //阻止默认
        e.preventDefault()
        //数据
        let data = {
            username: $(this).find('input[name=username]').val(),
            password: $(this).find('input[name=password]').val()
        }
        $.ajax({
            url: "/api/reguser",
            type: 'post',
            data,
            success: (res) => {
                if (res.status) {
                    //注册失败
                    return layer.msg(res.message);
                }
                //模拟点击行为
                $('#link_login').click()
                //注册成功
                return layer.msg(res.message);
            }
        })
    })

    //监听登录表单
    $('#form_login').on('submit', function (e) {
        //阻止默认
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                //   alert(res.token)
                if (res.status) {
                    //登录失败
                    return layer.msg(res.message);
                }
                //登录成功
                layer.msg(res.message);
                //将token存入locsto中
                localStorage.setItem('token', res.token)
                return location.href = '/index.html'
            }
        })
    })
})