var mongoose = require('mongoose');
var Clue = mongoose.model('Clue');

module.exports.cluesListAll = function(req, res) {
  Clue.find({}, function (err, results, stats) {
    var clues = [];
    if (err) {
      sendJSONresponse(res, 404, err);
      
    } else {
      results.forEach(function(doc) {
      console.log(doc);
        clues.push({
          lat: doc.coords[1],
          lng: doc.coords[0],
          text: doc.text,
          imageURL: doc.imageURL,
          _id: doc._id
        });
      });
      sendJSONresponse(res, 200, clues);
    }
  });
};

module.exports.cluesCreate = function(req, res) {
  Clue.create({
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    text: req.body.text,
    imageURL: req.body.imageURL
  }, function(err, location) {
    if (err) {
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, location);
    }
  });
};

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};