var GeoStats = require('../geostats.js').GeoStats,
	geo;

describe('A geostats obj', function(){
	beforeEach(function(){
		geo = new GeoStats({name:"Keith's search"});
		geo.addPOI({name:'Work', coord:{lat:50.80, lon: 20.22}});
	});
	
	it('can add a point of interest', function(){
		expect(geo.prefs.poiList[0].coord.lat).toEqual(50.80);
		geo.addPOI({name:'Work', coord:{lat:45.80, lon: 20.22}});
		expect(geo.prefs.poiList[0].coord.lat).toEqual(45.80);
	});
	
	it('can remove a point of interest', function(){
		geo.removePOI({name:'Work',coord:{lat:45.80, lon: 20.22}});
		expect(geo.prefs.poiList.length).toEqual(0);
	});
	
	it('can find a POI by name', function(){
		var poi;
		geo.addPOI({name:'Work2', coord:{lat:45.80, lon: 20.22}});
		geo.addPOI({name:'Work3', coord:{lat:45.80, lon: 20.22}});
		geo.addPOI({name:'Work4', coord:{lat:45.80, lon: 20.22}});
		
		poi = geo.findPOI({name:'Work2'});
		expect(poi).toBeDefined();
		expect(poi.name).toEqual('Work2');
	});
});