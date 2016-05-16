const ACCESS_TOKEN_REQUEST_URL = "https://github.com/login/oauth/access_token";
require('dotenv').config();

var express = require('express');
var path = require('path'); 
var thirdPartyRequest = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
ROUTES
*/
app.get('/', function (req, res) {
	res.sendFile(path.resolve('dist/index.html'), {user: req.user});	
});

app.get("/auth/github_callback", function(req,res){
	var _mongodbclient = mongodbclient;
	thirdPartyRequest.post(
		ACCESS_TOKEN_REQUEST_URL,
		{json : {
			client_id : process.env.GITHUB_ID,
			client_secret : process.env.GITHUB_SECRET,
			code : req.query.code
		}},
		function (err, response, body) {
			if (err){
				res.end(err);
				return;	
			} 
			
			var token = body.access_token;
			_mongodbclient.connect(db_url, function(err,db){
				if (err) throw err;
				
				var collection = db.collection("nightlife_app_user");
				collection.findAndModify(
					{ 
						token: token 
					},//query
					{}, //sort option
					{
						$setOnInsert: { 
							token: token,
							default_place: "",
							going_places: []
						}
					},//update
					{
						new: true,
						upsert: true
					}, // insert the document if it does not exist
					function(err,doc) {
						if (err) {
							console.log(err);
							res.end(err);
						}
						console.log("database operation success!");
						res.clearCookie("token");
						res.clearCookie("default_place");
						res.cookie("token", token, {maxAge : 360000000});
						res.cookie("default_place", doc.value.default_place, {maxAge : 360000000});
						res.redirect("/"); 	
				    }
				);
			});
		}
	)
});

app.get("/signout", function(req,res){
	res.clearCookie("token");
	res.redirect("/");
});

app.get('/markAsGoing/:id', function(req, res){
	if (req.cookies.token !== null) {
		mongodbclient.connect(db_url, function(err,db){
			if (err) throw err;
			
			var collection = db.collection("nightlife_app_user");
			collection.findAndModify(
				{ 
					token: req.cookies.token 
				},//query
				{}, //sort option
				{
					$push: { 
						going_places: req.params.id
					}
				},//update
				{
					new: true
				}, // insert the document if it does not exist
				function(err,doc) {
					if (err) {
						console.log(err);
						res.end(err);
					}
					incrementPlaceCounter(req,res,1);
			    }
			);
		});
	}
});

app.get('/markAsNotGoing/:id', function(req, res){
	res.end("Hello!");
});

app.get('/search/:place/:page?', function(req,res){
	//if authed
	if(req.cookies.token !== null) {
		console.log("cookie present");
		mongodbclient.connect(db_url, function(err,db){
			if (err) throw err;
			
			var collection = db.collection("nightlife_app_user");
			collection.findAndModify(
				{ 
					token: req.cookies.token 
				},//query
				{}, //sort option
				{
					$set: { 
						default_place: req.params.place
					}
				},//update
				{
					new: true
				}, // insert the document if it does not exist
				function(err,doc) {
					if (err) {
						res.end(err);
					}
					//override user's default search_query with place
					res.clearCookie("default_place");
					res.cookie("default_place", req.params.place, {maxAge : 360000000});
					//pass the user obj
					doSearch(req,res, doc.value);
			    }
			);
		});
		
	}
	else {
		console.log("cookie NOT present");
		doSearch(req,res, null);	
	}
});

app.get('*', function(req,res){
	res.end('404!');
});

var port = process.env.PORT || 3000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});

module.exports = app;//for testing purpose

function incrementPlaceCounter(req,res, mode) {
	var mode = mode || 1;//whether to increment or decrement
	mongodbclient.connect(db_url, function(err,db){
		if (err) throw err;
		
		var collection = db.collection("nightlife_app_place_counter");
		collection.findAndModify(
			{ 
				id: req.params.id
			},//query
			{}, //sort option
			{
				$setOnInsert: { 
					id: req.params.id
				},
				$inc: { 
					counter: mode
				}
			},//update
			{
				new: true,
				upsert: true
			}, // insert the document if it does not exist
			function(err,doc) {
				if (err) {
					console.log(err);
					res.end(err);
				}
				console.log("operation success!");
				res.end(JSON.stringify({message: "success!"}));
		    }
		);
	});

}

function doSearch(req,res, userObject) {
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
			//TODO : combine this result with query result from MongoDB
			var result = JSON.parse(body);
			var listingIds = [];
			for (var i = 0; i < result.listings.length; i++) {
				listingIds.push(+(result.listings[i].id));
			}

			mongodbclient.connect(db_url, function(err,db){
				if (err) throw err;
				
				var collection = db.collection("nightlife_app_place_counter");
				collection.find(
					{ 
						id: {
							$in : listingIds
						}
					}
				).toArray(function(err,docs){
					if(err) throw err;
					result.place_counter = docs;
					if(userObject) {
						result.user = userObject;
					}

					res.status(200);
					res.set('Content-Type', 'application/json');
					res.end(JSON.stringify(result));
				});
			});
			
		}
		else {
			res.end("error = " + error);
		}
	});
}