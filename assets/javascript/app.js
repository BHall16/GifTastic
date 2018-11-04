var topics = ["Russell Westbrook", "Jimmy Butler", "LeBron James", "Stephen Curry", "Kevin Durant", "Draymond Green", "Blake Griffin", "Michael Jordan", "Shaq", "Kobe Bryant", "Blake Griffin", "Charles Barkley", "Kyrie Irving",
"Chris Paul", "Anthony Davis", ];

$(document).ready(function() {
    for (var i = 0; i < topics.length; i++) {
        $("#buttons").append("<button type='button' onclick='searchGif(\"" + topics[i] + "\")' class='btn btn-primary' value=' " + topics[i] + "'> " + topics[i] + " </button>");
    }
});

function playerButtonClicked() {
    var userInput = $('#newAdd').val().trim();
    searchGif(userInput);
    topics.push(userInput);
}

function submitButtonClicked() {
    var userInput = $('#newAdd').val().trim();
    topics.push(userInput);

    if (userInput) {
        $('#buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dM6kjBMOxm9W5dQsu3UglEIzp0tvVTyK&limit=10',
            method: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#players').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#players').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
};