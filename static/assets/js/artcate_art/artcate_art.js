$(function () {
    //layui自定义规则
    let form = layui.form
    let layer = layui.layer
    initARt()
    //获取文章分类的数据
    function initARt() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                rander(res.data)
                return
            }
        })
    }
    //点击编辑按钮出现的表单进行渲染
    let btnEditCate = null
    let starId = null
    $('tbody').on('click', '.btnEditCate', function (e) {
        starId = e.target.dataset.id
        // 弹出层
        // let dialogadd =template('dialog-add')
        btnEditCate = layer.open({
            type: 1,
            title: '编辑'
            , content: $('#dialog-edit').html(),
            area: ['500px', '250px']
        })
        //加载默认获取父亲的值
        let alias = $(this).parent().parent().find('.aliass').html()
        let names = $(this).parent().parent().find('.namess').html()
        $('#form-edit').find('[name= name]').val(names)
        $('#form-edit').find('[name=alias]').val(alias)
    })
    //修改文章分类的数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        let data = { Id: starId, name: $(this).find('[name= name]').val(), alias: $(this).find('[name= alias]').val() }
        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data: {
                ...data,
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initARt()
                layer.close(btnEditCate)
                return layer.msg('修改成功')

            }
        })
    })
    // 渲染文章分类的数据
    function rander(data) {
        let htmls = template('tpl-table', data)
        $('tbody').html(htmls)
    }
    //点击文章分类
    let index = null
    $('.btnAddCate').on('click', function () {

        // let dialogadd =template('dialog-add')
        index = layer.open({
            type: 1,
            title: '添加'
            , content: $('#dialog-add').html(),
            area: ['500px', '250px']
        })
        console.log(index);
    })
    //添加文章分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        var data = {};
        var t = $(this).serializeArray();
        $.each(t, function () {
            data[this.name] = this.value;
        });
        console.log(data);
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: {
                ...data,
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initARt()
                layer.close(index)
                return layer.msg('添加成功')

            }
        })
    })
    //删除按钮
    $('tbody').on('click', '.btnDelCate', function (e) {
        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            let Id = e.target.dataset.id
            // console.log(Id);
            btnDelCate(Id)
            layer.close(index);
        });
    })
    //删除功能
    function btnDelCate(Id) {
        $.ajax({
            url: `/my/article/deletecate/${Id}`,
            type: 'GET',
            success: function (res) {
                initARt()
                if (res.status != 0) {
                   return layer.msg(res.message)
                } 
                return layer.msg(res.message)
            }
        })
    }


})