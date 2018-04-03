const mongoose = require('mongoose');
const config = require('../config/database');

////design,pattern,color,style,country,image

const SchemaRug = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  design: {
    type: String,
    required: true
  },
  pattern: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Rug = module.exports = mongoose.model('Rug', SchemaRug);

module.exports.getRug = function(id, callback){
  Rug.findById(id, callback);
}

module.exports.removeRug = function(id, callback){
  Rug.findByIdAndRemove(id, callback);
}


module.exports.addRug = function(newRug, callback){
      newRug.save(callback);
}
