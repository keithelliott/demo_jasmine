var GeoStats = require('../geostats.js').GeoStats,
		geo = new GeoStats({name: 'My Default Search'});
	
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

exports.pois = function(req, res){
	res.json({"success": "ok"});
};