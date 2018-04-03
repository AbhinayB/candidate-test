const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Rug = require('../node/rug');
crypto = require('crypto');
////design,pattern,color,style,country,image
let multer  = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: './public_files/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })

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
    }
  });
});

router.delete('/deleterug', (req, res, next) => {
  const rugid = req.body.rugid;

  Rug.removeRug(rugid, (err, rug) => {
    if(err) throw err;
    if(!rug){
      return res.json({success: false, msg: 'Rug not Deleted'});
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
