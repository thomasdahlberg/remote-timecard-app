$(document).ready(function(){
    $('select').formSelect();
});


let crds
var x = document.getElementById('location');
function success(pos){
lat = pos.coords.latitude;
long = pos.coords.longitude;
$('form').append(`<input type="text" name="latitude" value="${pos.coords.latitude}" readonly><br>
                <label>Latitude</label><br>
                <input type="text" name="longitude" value="${pos.coords.longitude}" readonly><br>
                <label>Longitude</label>`);
console.log(`${lat}, ${long}`);
}

navigator.geolocation.getCurrentPosition(success);     
