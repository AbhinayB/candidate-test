const mongoose = require('mongoose');
const config = require('../config/database');
var fs = require('fs');
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

module.exports.getRugs = function(callback){
  Rug.find({}, callback);
}

module.exports.getpageRugs = function(pagenum,callback){
  Rug.find().limit(4)
    .skip(4 * (pagenum-1)).exec(callback);
}

module.exports.removeRug = function(id, callback){
  Rug.findByIdAndRemove(id, callback);
}


module.exports.addRug = function(newRug, callback){
      newRug.save(callback);
}

module.exports.totalRugs = function(callback){

  Rug.count({}, callback);
}

module.exports.updateRug = function(idvs,newRug, callback){
  Rug.findOne({_id: idvs}, function (err, doc) {
    doc.name = newRug.name;
    doc.design = newRug.design;
    doc.pattern = newRug.pattern;
    doc.color = newRug.color;
    doc.style = newRug.style;
    doc.country = newRug.country;
    doc.save(callback);
  });
}



module.exports.updateRugwithfile = function(idvs,newRug, callback){
  Rug.findOne({_id: idvs}, function (err, doc) {
    fs.unlink('./public_files/'+doc.image, function(error) {
        if (error) {
            throw error;
        }
    });
    fs.unlink('./public_files/compress/'+doc.image, function(error) {
        if (error) {
            throw error;
        }
    });
    doc.name = newRug.name;
    doc.design = newRug.design;
    doc.pattern = newRug.pattern;
    doc.color = newRug.color;
    doc.style = newRug.style;
    doc.country = newRug.country;
    doc.image = newRug.image;
    doc.save(callback);
  });
}
