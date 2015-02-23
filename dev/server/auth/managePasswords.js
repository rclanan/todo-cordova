'use strict';

var bcrypt = require('bcrypt');

module.exports.cryptPassword = function(password, callback) {
  bcrypt.genSalt(10, function(error, salt) {
    if(error) {
      return callback(error);
    }

    bcrypt.hash(password, salt, function(error, hash) {
      return callback(error, hash);
    });
  });
};

module.exports.comparePassword = function(password, userPassword, callback) {
  bcrypt.compare(password, userPassword, function(error, isPasswordMatch) {
    if(error) {
      return callback(error);
    }

    return callback(null, isPasswordMatch);
  });
};
