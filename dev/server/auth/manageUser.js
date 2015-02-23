'use strict';

var passwordManager = require('./managePasswords');

module.exports = function(server, db) {
  db.appUsers.ensureIndex({
    email: 1
  }, {
    unique: true
  })

  server.post('/api/v1/todoList/auth/register', function(request, response, callback) {
    var user = request.params;

    passwordManager.cryptPassword(user.password, function(error, hash) {
      user.password = hash;
      db.appUsers.insert(user, function(error, dbUser) {
        if(error) {
          if(error.code === 11000) {
            response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            response.end(JSON.stringify({
              error: error,
              message: 'A user with this email already exists'
            }));
          }
        } else {
          response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          dbUser.password = '';
          response.end(JSON.stringify(dbUser));
        }
      });
    });

    return callback();
  });

  server.post('/api/v1/todoList/auth/login', function(request, response, callback) {
    var user = request.params;
    console.log("request >>", request.params);
    if(user.email.trim().length === 0 || user.password.trim().length === 0) {
      response.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Invalid Credentials' }));
    }

    db.appUsers.findOne({
      email: request.params.email
    }, function(error, dbUser) {
      if(!dbUser) {
        response.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: 'Invalid Credentials. User not found.' }));
      }

      passwordManager.comparePassword(user.password, dbUser.password, function(error, isPasswordMatch) {
        if(isPasswordMatch) {
          response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          dbUser.password = '';
          response.end(JSON.stringify(dbUser));
        } else {
          response.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
          response.end(JSON.stringify( { error: 'Invalid User' }));
        }
      });
    });

    return callback();
  });
};
