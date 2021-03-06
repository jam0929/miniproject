var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config');
var celery = require('node-celery');
var socketJwt = require('socketio-jwt');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http');
var socketServer
  = http.createServer(app).listen(config.socketPort, function(req,res) {
  console.log('Socket IO server has been started');
});

var io = require('socket.io').listen(socketServer);

io.set('authorization', socketJwt.authorize({
  secret: config.secret,
  handshake: true
}));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', users);

//socket server
io.on('connection', function(socket){
  console.log(socket.client.request.decoded_token.username, 'connected');

  socket.emit('connect success', {
    message: 'success'
  });

  socket.on('concat string', function(msg){
    if(socket.client.request.decoded_token.username === undefined) {
      socket.emit('connect error', {
        message: 'error'
      });
      return false;
    }

    //celery
    var client = celery.createClient({
      CELERY_BROKER_URL: config.celeryBrokerUrl,
      CELERY_RESULT_BACKEND: config.celeryResultBackend
    });

    //node-celery
    client.on('error', function(err) {
        console.log(err);
    });

    client.on('connect', function() {
      var result = client.call('tasks.concatString', [msg.str1, msg.str2]);

      result.on('ready', function(data) {
        socket.emit('result string', {
          message: data.result
        });
      });
    });
  });

  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
