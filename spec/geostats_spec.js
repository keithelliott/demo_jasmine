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
	
	// Additional Expectation Matchers
	it("the 'toContain' matcher finds an item in an array", function(){
		var geeks = ['Keith', 'Tim', 'Wil', 'Brett'];
		
		expect(geeks).toContain('Wil');
		expect(geeks).not.toContain('Patrick');
	});
	
	
	// toBeLessThan comparison
	it("can determine if less than", function(){
		var a = 300.87, b = 500;
		
		expect(a).toBeLessThan(b);
		expect(b).not.toBeLessThan(a);
	});
	
	// toBrGreaterThan comparison
	it("can determine if greater than", function(){
		var a = 300.87, b = 500;
		
		expect(b).toBeGreaterThan(a);
		expect(a).not.toBeGreaterThan(b);
	});
	
	// can use precision matchers
	it("can use precision matchers", function(){
		var sillyNum = 5.87867, sillyOtherNum = 5.879;
		
		expect(sillyNum).toBeCloseTo(sillyOtherNum,0.001);
	});
});


// using spies
describe('tests with spies!', function(){
	var geek,foundOne, geeks;
	
	beforeEach(function(){
		geek = {
			addAGeek: function(g){
				if(typeof geeks === 'undefined'){
					geeks = [];
				}
				geeks.push(g);
			},
			findAGeek: function(g){
				return 'you are it buddy!';
			}
		};
		
		afterEach(function(){
			geek = null;
			foundOne = null;
			geeks = null;
		});
		
		spyOn(geek,'addAGeek').andCallThrough();
		spyOn(geek,'findAGeek').andCallThrough();
		
		geek.addAGeek('Brett');
		foundOne = geek.findAGeek('Brett');
	});
	
	it('track that findAGeek was called', function(){
		expect(geek.addAGeek).toHaveBeenCalled();
	});
	
	it('should return a geek', function(){
		expect(geek.findAGeek).toHaveBeenCalled();
		expect(foundOne).toEqual('you are it buddy!');
	})
});