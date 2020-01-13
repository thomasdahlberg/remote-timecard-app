class Site {
    constructor(siteName, address, latitude, longitude) {
        this.siteName = siteName;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

let newJobsites = [];

$(document).ready(function(){
    $('select').formSelect();
    $(".dropdown-trigger").dropdown();
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
});


function success(pos){
$('form').append(`<input type="text" name="latitude" value="${pos.coords.latitude}" readonly><br>
                <label>Latitude</label><br>
                <input type="text" name="longitude" value="${pos.coords.longitude}" readonly><br>
                <label>Longitude</label>`);
}

function showSearchResults(results) {
    for(let i = 0; i < results.length; i++) {
        searchedSite = new Site(results[i].name, results[i].formatted_address, results[i].geometry.location.lat, results[i].geometry.location.lng);
        newJobsites.push(searchedSite);
    }
    for(let i = 0; i < newJobsites.length; i++) {
        $('#search-results').append(`<li class="sites" value="${i}">
                                        <div class="collapsible-header"><strong>${newJobsites[i].siteName}</strong></div>
                                            <div class="collapsible-body"><span><strong>${newJobsites[i].address}</strong>
                                                <br><br>
                                                <form>
                                                    <button class="btn waves-effect waves-light" type="submit" name="action">Add Jobsite
                                                        <i class="material-icons right">add</i>
                                                    </button>
                                                    <input type="hidden" name="site-name" value="${newJobsites[i].siteName}">
                                                    <input type="hidden" name="address" value="${newJobsites[i].address}">
                                                    <input type="hidden" name="latitude" value="${newJobsites[i].latitude}">
                                                    <input type="hidden" name="longitude" value="${newJobsites[i].longitude}">
                                                </form>
                                            </span>
                                        </div>
                                    </li>`
                                    );
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
    $('li.sites').remove();
    newJobsites = [];
    const regex = / /gi;
    userInput = $('#site-search-data').val().replace(regex, '+');
    $.ajax({
        url: `http://localhost:3000/api`,
        type: "GET"
    }).then(function(data){
        let placesURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${userInput}&key=${data}`
        $.ajax({
            url: `http://cors-anywhere.herokuapp.com/${placesURL}`,
            type: "GET",
        }).then(function(data){
            console.log(data.results);
            showSearchResults(data.results);
        });
    });
});
