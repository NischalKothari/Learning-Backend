var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.banned = true;
  res.render('index', { title: 'Express' });
});

router.get("/checkban", (req,res)=>{
  if(req.session.banned === true){
      res.send("Sorry, you are banned")
  }
  else{
    res.send("You are not banned")
  }
})

router.get("/removeban", (req,res)=>{
  req.session.destroy((err)=>{
    res.send("You are unbanned")
  })
})

module.exports = router;
