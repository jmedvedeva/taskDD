var first_id = 0 // id of the last media (photo)

function LoadMore() {
    var token = "227292099.385261b.3a897cf4e2f243a585e1a8269b17d6f6";
    var num_photos = 5;

    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent',
        dataType: 'jsonp',
        type: 'GET',
        data: { access_token: token, count: num_photos, max_id: first_id },
        success: function (data) {
            $("#Content").empty()

            for (i in data.data) {
                var image_src = data.data[i].images.standard_resolution.url
                var description = ""
                if (data.data[i].caption != null) {
                    description = data.data[i].caption.text
                }
                var likes = data.data[i].likes.count
                var t = Number(data.data[i].created_time)
                var date = new Date(t * 1000)
                $("#Content").append(
                    '<div class="row post">' +
                    '<div class="col photo">' +
                    '<img src="' + image_src + '" width="100%" alt="">' +
                    '</div>' +
                    '<div class="col textPhoto">' +
                    '<p>' + description + '</p>' +
                    '<p><img src="like.png" height="30" alt="">' + likes + '</p>' +
                    '<p>' + date + '</p>'
                );
            }
            
            if (data.data.length != 0) {
                first_id = data.data[data.data.length - 1].id
            } else {
                $("#Content").append(
                    '<h1 align="center">No more photos</h1>'
                )
            }
        },
        error: function (data) {
            console.log(data);
        }
    });



}
