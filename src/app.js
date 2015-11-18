var path = require('path'); //handle file system paths 
var express = require('express'); //MVC framework for Node
var compression = require('compression'); //gzips responses for smaller/faster transfer
var favicon = require('serve-favicon'); //handle favicon requests
var cookieParser = require('cookie-parser'); //parse cookies from requests
var bodyParser = require('body-parser'); //handles POST requests any information sent in an HTTP body
var mongoose = require('mongoose'); //MongoDB library for Node
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var url = require('url');
var csrf = require('csurf');

var router = require('./router.js');

var dbURL = process.env.MONGOLAB_URI || 'mongodb://localhost/Project'; //local shit might be fucked

var db = mongoose.connect(dbURL, function(err) {
  if(err){
    console.log('Could not connect to database');
    throw err;
  }
});

var redisURL = {
  hostname: 'localhost',
  port: 6379
};

var redisPASS;

if(process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCOULD_URL);
  redisPASS = redisURL.auth.split(":")[1];
}

var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();

//*******
//app.use/set stuff goes here
//*******

//pass app into the router to map routes
router(app);

//tell app ot listen to specified port
app.listen(port, function(err) {
  if(err) throw err;
  console.log('listening on port ' + port); 
});