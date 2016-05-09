require('dotenv').config();

var express = require('express');
var path = require('path');
var thirdPartyRequest = require('request');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var mongodb = require("mongodb");
var mongodbclient = mongodb.MongoClient;
var db_url = "mongodb://"+ process.env.MONGODB_USER +":"+ process.env.MONGODB_PASSWORD +"@ds013951.mlab.com:13951/fcc-challenge";

var app = express();
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('./dist'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

app.get('/search/:place/:page?', function(req,res){
	if (!req.params.place) {
		res.status(400);
		res.end("bad request");
	}
	//build url
	var url = process.env.YELLOW_API_BASEURL + 'FindBusiness/?';
	url += 'what=bars';
	url += '&where=' + req.params.place;
	url += '&pgLen=10&pg=' + (req.params.page || 1);
	url += '&dist=2';
	url += '&fmt=JSON';
	url += '&sflag=fto';//result has photo
	url += '&lang=en';
	url += '&UID=localhost';
	url += '&apikey=' + process.env.YELLOW_API_KEY;

	thirdPartyRequest.get({url: url}, function(error, response, body){
		if(!error && response.statusCode == 200) {
			res.status(200);
			res.set('Content-Type', 'application/json');

			//TODO : combine this result with query result from MongoDB
			var result = JSON.parse(body);
			result.hello = "world";
			res.end(JSON.stringify(result));
		}
		else {
			res.status(response.statusCode);
			res.end("error = " + error);
		}
	});
});

var port = process.env.PORT || 3000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});

module.exports = app;//for testing purpose