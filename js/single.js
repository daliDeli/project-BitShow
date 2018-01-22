var id = localStorage.getItem('key');
var singleShow = $.ajax({
    url: 'http://api.tvmaze.com/shows/' + id,
    method: 'GET',
    data: {
        embed: ['seasons', 'cast']
    }
});

singleShow.done(e => {

    console.log(e);
    let title = $("<h1>");
    let img = $("<img>");

    let titleMovie = e.name;
    let imageLink = e.image.original;
    title.text(titleMovie);
    img.attr('src', imageLink);

    let season = $("<ul>");
    let numberOfSeasons = e._embedded.seasons.length;
    e._embedded.seasons.forEach(function (element) {
        let seasonItem = $("<li>");
        seasonItem.text(`${element.premiereDate} ${element.endDate}`);
        season.append(seasonItem);

    }, this);

    let cast = $('<ul>');
    e._embedded.cast.forEach(function (element) {
        let castItem = $("<li>");
        castItem.text(`${element.character.name}`);
        cast.append(castItem);
    }, this);

    let summaryDiv = $('<div>');
    let summary = e.summary;

    summaryDiv.append(summary);

    $('.container').append(summaryDiv);
    $('#seasons-number').append(numberOfSeasons);
    $('.seasons-div').append(season);
    $('.cast-div').append(cast);
    $('.container').prepend(title);
    $('.image-div').append(img);

});
