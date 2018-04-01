const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Rug = require('../node/rug');

////design,pattern,color,style,country,image

router.get('/', (req, res) => {
  res.send('<h3>404 No URL Found</h3>');
});


router.post('/addrug', (req, res, next) => {
  let newRug = new Rug({
    design: req.body.design,
    pattern: req.body.pattern,
    color: req.body.color,
    style: req.body.style,
    country: req.body.country,
    image: req.body.image
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
