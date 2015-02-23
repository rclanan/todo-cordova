module.exports = function(server, db) {
  var validateRequest = require('../auth/validateRequest');

  server.get('/api/v1/todoList/data/list', function(request, response, callback) {
    validateRequest.validate(request, response, db, function() {
      db.todoLists.find({
        user: request.params.token
      }, function(error, list) {
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify(list));
      });
    });

    return callback();
  });

  server.get('/api/v1/todoList/data/item/:id', function(request, response, callback) {
    validateRequest.validate(request, response, db, function() {
      db.todoLists.find({
        _id: db.ObjectId(request.params.id)
      }, function(error, data) {
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify(data));
      });
    });

    return callback();
  });

  server.post('/api/v1/todoList/data/item', function(request, response, callback) {
    validateRequest.validate(request, response, db, function() {
      var item = request.params;

      db.todoLists.save(item, function(error, data) {
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify(data));
      });
    });

    return callback();
  });

  server.put('/api/v1/todoList/data/item/:id', function(request, response, callback) {
    validateRequest.validate(request, response, db, function() {
      db.todoLists.findOne({
        _id: db.ObjectId(request.params.id)
      }, function(error, data) {
        var updatedItems = {};
        var item;

        for(item in data) {
          updatedItems[item] = data[item];
        }

        for(item in request.params) {
          if(item !== 'id') {
            updatedItems[item] = request.params[item];
          }
        }

        db.todoLists.update({
          _id: db.ObjectId(request.params.id)
        }, updatedItems, {
          multi: false
        }, function(error, data) {
          response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          response.end(JSON.stringify(data));
        });
      });
    });

    return callback();
  });

  server.del('/api/v1/todoList/data/item/:id', function(request, response, callback) {
    validateRequest.validate(request, response, db, function() {
      db.todoLists.remove({
        _id: db.ObjectId(request.params.id)
      }, function(error, data) {
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify(data));
      });
    });

    return callback();
  });
}
