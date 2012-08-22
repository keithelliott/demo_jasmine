var map,
	defaultZoom = 16;

$(document).ready(function(){
		loadMap();
		$("#geoForm").submit(function(){
			var address = $("#address").val()
			geocode(address);
			return false;
		});
});


function loadMap(){
	map = new L.Map('map');
		var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/d714b4572b0341d9a29544b1580fbbaf/997/256/{z}/{x}/{y}.png', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		    maxZoom: 18
		}); 
		map.setView([51.505, -0.09], defaultZoom).addLayer(cloudmade);
}

function geocode(address){
	$.post('geocode/'+ encodeURI(address), function(data){
			console.log(data)
			displayAddress(data);
		});
		
	$.post('property/'+ encodeURI(address), function(data){
				console.log(data)
				populatePropertyDetails(data);
		});
}

function populatePropertyDetails(data){
	var result = data.response.results.result;
	console.log(result);
	$('#street').val(result.address.street);
	$('#csz').val(result.address.city + ',' + result.address.state + ' ' + result.address.zipcode);
	$('#sf').val(result.finishedSqFt);
	$('#bdrms').val(result.bedrooms);
	$('#baths').val(result.bathrooms);
	$('#totrms').val(result.totalRooms);
	$('#lotsize').val(result.lotSizeSqFt);
}

function displayAddress(data) {
	console.log(data);
	var markerLocation = new L.LatLng(data.geometry.location.lat, data.geometry.location.lng);
	setCenter(markerLocation)
	var marker = new L.Marker(markerLocation);
	map.addLayer(marker);
	}

function setCenter(markerLocation) {
	map.setView(markerLocation, defaultZoom)
}