$(window).load(function() {
    $.vegas('overlay', {
        src: 'img/ie-overlay.png',
        opacity: 0.5
    });
    $.vegas('slideshow', {
        backgrounds: [
            {src: 'img/fishing.jpg', fade: 2000},
            {src: 'img/clouds.jpg', fade: 2000},
            {src: 'img/ume.jpg', fade: 2000}
        ]
    });
    instagram.show();
});

//FIXME!!!
var instagram = {
    show: function() {
        var url = 'https://api.instagram.com/v1/users/2157886/media/recent/?client_id=816523ede91545e68dcfd0b27fd8e09f';
        var images = [];
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            data: {
                'count': 10
            },
            success: function(json) {
                images = $.map(json['data'], function(item) {
                    return item['images']['standard_resolution']['url'];
                });
                $('#instagram-photos div.item').map(function(k, dom) {
                    $('a', dom).attr('href', images[k]);
                    $('img', dom).attr('src', images[k]);
                });
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }
}
