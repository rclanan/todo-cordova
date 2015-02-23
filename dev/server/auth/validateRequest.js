'use strict';

// Note:  This is just for demo purposes, this should be replaced with a proper oAuth system
var isEmailValid = function(db, email, callback) {
  db.appUsers.findOne({
    email: email
  }, function(error, user) {
    callback(user);
  });
};

module.exports.validate = function(request, response, db, callback) {
  if(!request.params.token) {
    request.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
    request.end(JSON.stringify({
      error:'You are not authorized to access this application',
      message: 'An Email is required as part of the header'
    }));
  }

  isEmailValid(db, request.params.token, function(user) {
    if(!user) {
      request.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      request.end(JSON.stringify({
        error: 'You are not authorized to access this application',
        message: 'Invalid User Email'
      }));
    } else {
      callback();
    }
  });
};
