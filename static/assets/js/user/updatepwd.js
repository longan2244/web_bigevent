$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        oldp:
            [
                /^[\S]{6,12}$/,
                '密码必须6到12位，且不能出现空格',
            ],
        newp: function (value) {
            if ($('.updatepwd [name=newp]').val() != value) {
                return '两次输入的密码不一致'
            }
        },
        samepass: function (value) {
            if ($('.updatepwd [name=oldp]').val() == value) {
                return '不能设置近期密码'
            }
        }

    })

    $('.updatepwd').on('submit', function (e) {
        e.preventDefault();
        let oldp = $('[name=oldp]').val()
        let newp = $('[name=newp]').val()
        let nextnewp = $('[name=nextnewp]').val()
        if (newp != nextnewp) {
            return layer.msg('两处输入不一致')
        }
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: {
                oldp,
                newp,
            },
            success: function (res) {
                if (res.status == 1)
                    return layer.msg(res.message)
                layer.msg(res.message)
            }
        })

    })
}) 