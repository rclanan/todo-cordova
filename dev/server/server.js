'use strict';

var restify = require('restify'),
  mongojs = require('mongojs'),
  morgan = require('morgan'),
  db = mongojs('todo-cordova', ['appUsers', 'todoLists']),
  server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev'));

server.use(function(request, response, callback) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type');

  callback();
});

server.listen(process.env.PORT || 9804, function() {
  console.log('Server started @ ', process.env.PORT || 9804);
});

var manageUsers = require('./auth/manageUser')(server, db);
var manageLists = require('./list/manageList')(server, db);
