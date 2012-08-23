var request = require('request'),
	fs = require('fs'),
	routes = require('../routes');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// Async Tests to local nodejs server running
describe('geocode route', function(){
	it('can make post requests', function(done){
		var rawAddress = '235 Whitehorse Lane, Kennett Square, PA 19348';
		var address = encodeURIComponent(rawAddress),
		addr;
		request.post('http://localhost:3000/geocode/' + address, function(err, res, body){
			var result  = JSON.parse(body);
			done();
			expect(result.formatted_address).toEqual("Whitehorse Ln, Kennett Square, PA 19348, USA");
		});
	});
});

describe('propertydetail route', function(){
	it('can call zillow to get property details', function(done){
		var rawAddress = '5 Kaolin Place, Chadds Ford, PA 19317';
		var address = encodeURIComponent(rawAddress);
		request.post('http://localhost:3000/property/' + address, function(err, res, body){
			if(!err){
				var result  = JSON.parse(body);
				//console.dir(result.response.results.result);
				done();
				var zipId = result.response.results.result.zpid;
				expected = '66902099';
				expect(zipId).toEqual(expected);
			}
		});
	});
});