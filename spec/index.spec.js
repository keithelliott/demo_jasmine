var request = require('request'),
	fs = require('fs');

// Async Tests to local nodejs server running
describe('index route', function(){
	it('can make post requests', function(done){
		var rawAddress = '235 Whitehorse Lane, Kennett Square, PA 19348';
		var address = encodeURIComponent(rawAddress),
		addr;
		request.post('http://localhost:3000/geocode/' + address).pipe(fs.createWriteStream('response.json'));
		done();
		
		fs.readFile('response.json', 'utf8', function(err, data){
			if(!err){
				expect(data.formatted_address).toEqual(rawAddress);
			}
		})
	});
});