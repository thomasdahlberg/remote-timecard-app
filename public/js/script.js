
$(document).ready(function(){
    $('select').formSelect();
    $(".dropdown-trigger").dropdown();
});


function success(pos){
$('form').append(`<input type="text" name="latitude" value="${pos.coords.latitude}" readonly><br>
                <label>Latitude</label><br>
                <input type="text" name="longitude" value="${pos.coords.longitude}" readonly><br>
                <label>Longitude</label>`);
}

function showSearchResults() {
    for(let i = 0; i < newJobsites.length; i++) {
    $('#search-results').append(`<td>${newJobsites[i].name}</td>`);
    }
}


if($('#session-submit').val() === 'Clock In'){
    navigator.geolocation.getCurrentPosition(success);  
}

if($('#session-submit').val() === 'Clock Out'){
    navigator.geolocation.getCurrentPosition(success);  
}

$('#site-search-click').on('click', (event)=> {
    event.preventDefault();
    const regex = / /gi;
    userInput = $('#site-search-data').val().replace(regex, '+');
    console.log(userInput);
    $.ajax({
        url: `http://localhost:3000/api`,
        type: "GET"
    }).then(function(data){
        let placesURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${userInput}&key=${data}`
        $.ajax({
            url: `http://cors-anywhere.herokuapp.com/${placesURL}`,
            type: "GET",
        }).then(function(data){
            newJobsites = data.results;
            showSearchResults();
            console.log(newJobsites);
        });
    });
});
