const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Rug = require('../node/rug');
crypto = require('crypto');
let multer  = require('multer');
var path = require('path')
var fs = require('fs');
var Jimp = require("jimp");
var storage = multer.diskStorage({
  destination: './public_files/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})


var upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.send('<h3>404 No URL Found</h3>');
});


router.post('/addrug',upload.single('file'), (req, res, next) => {

  let newRug = new Rug({
    name: req.body.name,
    design: req.body.design,
    pattern: req.body.pattern,
    color: req.body.color,
    style: req.body.style,
    country: req.body.country,
    image: req.file.filename
  });

  Rug.addRug(newRug, (err, rug) => {
    if(err){
      res.json({success: false, msg:'Failed to add Rug'});
    } else {
      res.json({success: true, msg:'Rug added'});

Jimp.read("./public_files/"+rug.image, function (err, lenna) {
    if (err) throw err;
    lenna.resize(250,Jimp.AUTO)
         .quality(100)
         .write("./public_files/compress/"+rug.image);
});
    }
      });
});

router.post('/updateRugwithFile',upload.single('file'), (req, res, next) => {
var idvs=req.body.id;
  let newRug = new Rug({
    name: req.body.name,
    design: req.body.design,
    pattern: req.body.pattern,
    color: req.body.color,
    style: req.body.style,
    country: req.body.country,
    image: req.file.filename
  });

  Rug.updateRugwithfile(idvs,newRug, (err, rug) => {
    if(err){
      res.json({success: false, msg:'Failed to update Rug'});

    } else {
      res.json({success: true, msg:'Rug Updated'});
    }
    Jimp.read("./public_files/"+rug.image, function (err, lenna) {
        if (err) throw err;
        lenna.resize(250,Jimp.AUTO)
             .quality(100)
             .write("./public_files/compress/"+rug.image);
    });
  });
});
router.post('/updateRugwithoutFile', (req, res, next) => {
var idvs=req.body.id;
  let newRug = new Rug({
    name: req.body.name,
    design: req.body.design,
    pattern: req.body.pattern,
    color: req.body.color,
    style: req.body.style,
    country: req.body.country,
    image: "none"
  });

  Rug.updateRug(idvs,newRug, (err, rug) => {
    if(err){
      res.json({success: false, msg:'Failed to add Rug'});
    } else {
      res.json({success: true, msg:'Rug added'});
    }
  });
});
router.post('/rugcount', (req, res, next) => {

  Rug.totalRugs((err, count) => {
    if(err){
      res.json({success: false, msg:'No rugs or table'});
    } else {
      res.json({
        success: true,
        count: count
      });
    }
  });
});
//----------------------
router.post('/getpagerugs', (req, res, next) => {
  Rug.getpageRugs(req.body.pagenum,(err, rugs) => {
    if(err) throw err;
    if(!rugs){
      return res.json({success: false, msg: 'Rugs not found'});
    }
      if(err) throw err;
        res.json({
          success: true,
          rugs_data:rugs
        });

  });
});
//----------------------



router.delete('/deleterug/:rugid', (req, res, next) => {
  const rugid = req.params.rugid;
  Rug.removeRug(rugid, (err, rug) => {
    if(err) throw err;
    if(!rug){
      return res.json({success: false, msg: 'Rug not Deleted'});
    }
      if(err) throw err;

        res.json({
          success: true,
          rug: {
            id: rug._id,
            name: rug.name,
            design: rug.design,
            pattern: rug.pattern,
            color: rug.color,
            style: rug.style,
            country:rug.country,
            image:rug.image
          }
        });
        fs.unlink('./public_files/'+rug.image, function(error) {
            if (error) {
                throw error;
            }
        });
        fs.unlink('./public_files/compress/'+rug.image, function(error) {
            if (error) {
                throw error;
            }
            console.log('Rug Deleted.....');
        });

  });
});


router.post('/getrugs', (req, res, next) => {

  Rug.getRugs((err, rugs) => {
    if(err) throw err;
    if(!rugs){
      return res.json({success: false, msg: 'Rugs not found'});
    }
      if(err) throw err;

        //design,pattern,color,style,country,image
        res.json({
          success: true,
          rugs_data:rugs
        });

  });
});
// getrugbyitsid
router.post('/getrug', (req, res, next) => {
  const rugid = req.body.rugid;
  Rug.getRug(rugid, (err, rug) => {
    if(err) throw err;
    if(!rug){
      return res.json({success: false, msg: 'Rug not found'});
    }
      if(err) throw err;
        //design,pattern,color,style,country,image
        res.json({
          success: true,
          rug: {
            id: rug._id,
            name: rug.name,
            design: rug.design,
            pattern: rug.pattern,
            color: rug.color,
            style: rug.style,
            country:rug.country,
            image:rug.image
          }
        });

  });
});


module.exports = router;
