var geocoder = require('geocoder'),
	xmlconverter = require('xml2js'),
	parser = new xmlconverter.Parser(),
	http = require("http"),
	ZWSID = process.env.ZILLOW_KEY;
	
exports.index = function(req, res){
	var pageVars = {};
	pageVars['title'] = "Your Module Doesn't Exist Without Tests";
	pageVars['caption'] = "Unit testing is not a new thing. There are a surprising amount of modules in NPM " +
		"that don't have any tests. Writing tests gives you and others confidence in your code, makes it easier " + 
		"to maintain and easier for others to contribute. There are plenty of unit test frameworks available for Node," +
		" but today's talk take a look at the Jasmine unit testing framework and how we can integrate this into our " + 
		"node.js development.  Jasmine is a behavior driven development framework that has no external JavaScript " +
		"dependencies.";
		
  res.render('index', pageVars);
};

exports.geocode = function(req, res){
	console.log('geocode called');
	var address = req.params.address;
	//console.log(req.params);
//	console.log(address);
	geocoder.geocode(address, function(err,data){
		if(err){
			console.log(err);
		}
		else{
			console.dir(data.results[0]);
			res.json(data.results[0]);
		}
	});
};

exports.propertyDetails = function(req, res){
	console.log('property view called');
	var address = req.params.address;
	getProperty(address, function(err,data){
		if(err){
			console.log(err);
		}
		else{
			res.json(data);
		}
	});
};

function getProperty(address, callback){
	var	addr = address.split(','), 
		citystatezip = addr.splice(1); 
		path = '/webservice/GetDeepSearchResults.htm?zws-id=' + ZWSID + '&address=' 
			+ encodeURIComponent(addr[0]) + '&citystatezip=' + encodeURIComponent(citystatezip),
		options = {
	  host: 'www.zillow.com',
	  path: path
	};
	
	http.get(options, function (http_res) {
	    // initialize the container for our data
	    var data = "";

	    // this event fires many times, each time collecting another piece of the response
	    http_res.on("data", function (chunk) {
	        // append this chunk to our growing `data` var
	        data += chunk;
	    });

	    // this event fires *one* time, after all the `data` events/chunks have been gathered
	    http_res.on("end", function () {
	        // you can use res.send instead of console.log to output via express
	       	parser.parseString(data, function(err, result){
						if(!err){
							//console.log(result);
							callback(null,result);
						}
					});
	    });
	
			http_res.on('error', function(e){
				callback(e);
			});
	});
}

function getGraphsAndData(id, callback){
	var	addr = address.split(','), 
		citystatezip = addr.splice(1); 
		path = '/webservice/GetDeepSearchResults.htm?zws-id=' + ZWSID + '&address=' 
			+ encodeURIComponent(addr[0]) + '&citystatezip=' + encodeURIComponent(citystatezip),
		options = {
	  host: 'www.zillow.com',
	  path: path
	};
	
	http.get(options, function (http_res) {
	    // initialize the container for our data
	    var data = "";

	    // this event fires many times, each time collecting another piece of the response
	    http_res.on("data", function (chunk) {
	        // append this chunk to our growing `data` var
	        data += chunk;
	    });

	    // this event fires *one* time, after all the `data` events/chunks have been gathered
	    http_res.on("end", function () {
	        // you can use res.send instead of console.log to output via express
	       	parser.parseString(data, function(err, result){
						if(!err){
							//console.log(result);
							callback(null,result);
						}
					});
	    });
	
			http_res.on('error', function(e){
				callback(e);
			});
	});
}