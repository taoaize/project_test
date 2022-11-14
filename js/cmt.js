$(function () {
    function getCommentList() {
        $.get('http://ajax-base-api-t.itheima.net/api/cmtlist', function (res) {
            if (res.status !== 200) {
                return ('获取数据失败');
            }
            var rows = [];
            $.each(res.data, function (i, item) {
                var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间：' + item.time + '</span><span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span>' + item.content + '</li>';
                rows.push(str);
            });
            $('#cmtlist').empty().append(rows.join(''));
        });
    };
    getCommentList();
    $('#formAddCmt').submit(function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.post('http://ajax-base-api-t.itheima.net/api/addcmt', data, function (res) {
            if (res.status !== 201) {
                return alert('发表评论失败');
            }
        });
        getCommentList();
        $('#formAddCmt')[0].reset();

    });
})