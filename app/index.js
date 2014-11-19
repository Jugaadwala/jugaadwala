/**
 * Created by manusis on 20/11/14.
 */

var express = require('express');
//var FSStore = require('ms-session')(express);
//var session = require('express-session')
//var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})




var app = module.exports = express();





var domain = require('domain');

app.use(function (req, res, next) {
    var requestDomain = domain.create();
    requestDomain.add(req);
    requestDomain.add(res);
    requestDomain.on('error', next);
    requestDomain.run(next);
});

// settings
// map .renderFile to ".html" files
app.engine('html', require('ejs').renderFile);

// make ".html" the default
app.set('view engine', 'html');

// set views for error and 404 pages
app.set('views', __dirname + '/views');

// log

app.use(express.bodyParser());

app.use(function (req, res, next) {
    if (req.headers._allowlargerfile == 'true' || req.headers._allowlargerfile == true) {
        next();
    }
    else {
        express.limit('15mb')(req, res, next);
    }
});

//app.use(express.limit('15mb'));



app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    // Following headers are needed for CORS
    res.setHeader('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, ajax');
    res.setHeader('access-control-allow-methods', 'POST,HEAD,GET,PUT,DELETE,OPTIONS');
    res.setHeader('access-control-allow-origin', '*');
    res.removeHeader("X-Powered-By");
   next();
});

// serve static files
//app.use(express.static(__dirname + '/frontend'));

// This should always come before the middleware for static files

//var logger = require('ms-logger');


// support _method (PUT in forms etc)
app.use(express.methodOverride());

app.use(express.cookieParser());



//app.use(mystore.serverCrawlers());

/*app.use(function (req, res, next) {
 // return;

 var stream = fs.createWriteStream(__dirname+'/logs/log.json', {flags: 'a',encoding: 'utf8',mode: 0666});


 // var startAt = process.hrtime()
 res.on('finish', function () {
 var diff = process.hrtime(req.startTime)
 // var duration = new Date - start;
 // console.log('response>>>>>nanosec:',(diff[0] * 1e9 + diff[1])*1e-6)
 var line="Store: "+req.store.name+" with serverGroup: "+req.store.server_group+" request url: "+req.url+" is taking: "+(diff[0] * 1e9 + diff[1])*1e-6+"ms with status: "
 var obj={
 store:req.store.name,
 serverGroup: req.store.server_group,
 request_url: req.url,
 response_time:(diff[0] * 1e9 + diff[1])*1e-6,
 host:req.headers.host
 }
 //console.log(line);
 obj=JSON.stringify(obj)
 stream.write(obj+'\n', function(err) {
 if(err) {
 console.log(err);

 } else {
 //console.log("written in to file!");

 }
 });


 });
 next()

 });*/





//require('./backend/services/mystoreTools')(app);


//require('./backend/services/google-analytics');
//app.use('/deploy',deploy)


// Function common for all services
/*;*/

app.options('*', function (req, res, next) {
    res.send();
});

// handle the entities
// handle the entities
//require('./backend/lib/entity')(app);

//require('./backend/test/mongodb_query_analyzer')(app);


//require('./backend/test/paypal')(app);
// handle the services

//latency.measure(app,{setHeaders: true});

app.use(function (req, res, next) {
    if (res._output) {
        if (typeof res._output == "number") {
            res._output += "";
        }
        res.send(res._output);
    }
    else {
        next();
    }
});
//app.get('/tools', express.basicAuth('shobhi', 'sho'));

//app.listen();
//require('./backend/services/mail')(app);
//require('./scripts/backup');

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
// assume 404 since no middleware responded



var server = express();
server.use(express.vhost('*', app));
var port = 3002;
var httpServer = server.listen(port);
console.log('\n  listening on port ' + port + '\n');
httpServer.on('close', function () {
    console.log("SERVER EVENT: CLOSE");
});

httpServer.on('clientError', function (arguments) {
    console.log("SERVER EVENT: clientError", arguments);
});

httpServer.on('timeout', function () {
    console.log("SERVER EVENT: timeout");
});

/*if(process.env.NODE_PORT){
 console.log(process.env.NODE_PORT);
 var httpServer1 = server.listen(process.env.NODE_PORT);
 console.log('\n  listening on port ' + process.env.NODE_PORT + '\n');
 }

 httpServer1.on('close', function () {
 console.log("SERVER EVENT: CLOSE");
 });

 httpServer1.on('clientError', function (arguments) {
 console.log("SERVER EVENT: clientError", arguments);
 });

 httpServer1.on('timeout', function () {
 console.log("SERVER EVENT: timeout");
 });
 if(process.env.NODE_PORT){
 var httpServer2 = server.listen(process.env.NODE_PORT);
 console.log('\n  listening on port ' + process.env.NODE_PORT + '\n');
 httpServer2.on('close', function () {
 console.log("SERVER EVENT: CLOSE");
 });
 httpServer2.on('clientError', function (arguments) {
 console.log("SERVER EVENT: clientError", arguments);
 });
 httpServer2.on('timeout', function () {
 console.log("SERVER EVENT: timeout");
 });
 }*/


