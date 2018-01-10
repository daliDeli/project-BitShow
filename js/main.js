let input = $('#searchMovie').val();
console.log(input);

let request = $.ajax({
    url: 'http://api.tvmaze.com/schedule/?country=US',
    method: 'GET',
});

request.done(output => {
    console.log(output);
    output.forEach((e, i) => {
        let div = $('<div>');
        let image = $('<img>');
        let title = $('<h3>');
        title.text(e.show.name);
        let imageLink = e.show.image.medium || '#';
        let link = $('<a>');
        link.attr({
            'value': e.show.id,
            'href': '#'
        });

        link.append(title);
        image.attr('src', imageLink);
        div.append(image);
        div.append(link);
        div.attr('class', 'col-sm-12 col-md-6 col-lg-4 elementItem');

        $('.row').append(div);
    })
});



$(document).on('change keyup paste', '#searchMovie', function () {
    let input = $('#searchMovie').val();
    console.log(input);

    let request = $.ajax({
        url: 'http://api.tvmaze.com/search/shows',
        method: 'GET',
        data: {
            q: input
        }
    });

    request.done(output => {

        $('.searchList').html('');
        console.log(output);
        output.forEach((e, i) => {
            let title = $('<li>');
            let link = $('<a>');

            link.text(e.show.name);
            link.attr({
                'value': e.show.id,
                'href': '#'
            });

            title.append(link);
            $('.searchList').append(title);
        })
    });


});


$(document).on('click', 'a', function () {
    var id = $(this).attr('value');

    localStorage.setItem('key', id);
    location.replace('single.html');
});

