var mongoose = require('mongoose');

var clueSchema = new mongoose.Schema({ 
  coords: { type: [Number], index: '2dsphere', required: true },
  text: { type: String, required: true },
  imageURL: String
});

mongoose.model('Clue', clueSchema);