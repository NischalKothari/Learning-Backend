var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/failed', function(req,res) {
  req.flash("age", 12); 
  req.flash("car",'bmw')
  res.send("done");
});

router.get('/check', function(req,res){
  console.log(req.flash("age"));
  console.log(req.flash("car"));
  res.send("check log");
});

module.exports = router;
