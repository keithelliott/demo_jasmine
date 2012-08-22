var prefs = {},
	geo = module.exports.GeoStats = GeoStats;
	
function GeoStats(preferences){
	this.prefs = preferences || {};
}

function addPointsOfInterest(poi){
	var found = false;
	
	if(typeof this.prefs.poiList === 'undefined'){
		this.prefs.poiList = [];
	}
	
	this.prefs.poiList.forEach(function(p){
		if(p.name === poi.name){
			p.coord = poi.coord;
			found = true;
		}
	});
	
	if(!found){
		this.prefs.poiList.push(poi);
	}
}

function removePointsOfInterest(poi){
	var i, found = -1;
	
	for(i = 0; i < this.prefs.poiList.length; i++){
		if(this.prefs.poiList[i].name === poi.name){
			found = i;
		}
	}
			
	if(found > -1){
		this.prefs.poiList.splice(found, 1);
	}
}

function findPointOfInterest(poi){
	var i;
	for(i = 0; i < this.prefs.poiList.length; i++){
		if(this.prefs.poiList[i].name === poi.name){
			return this.prefs.poiList[i];
		}
	}
	
	return null;
}

geo.prototype = {
	addPOI : addPointsOfInterest,
	removePOI : removePointsOfInterest,
	findPOI : findPointOfInterest
};

