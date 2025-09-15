var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie("age",21)
  res.render('index', { title: 'Express' });
});

router.get("/read",(req,res,next)=>{
  console.log(req.cookies.age);
  res.send("<h1>Check</h1>") 
})

router.get("/delete", (req,res,next)=>{
  res.clearCookie("age");
  res.send("Cookie cleared")
})

module.exports = router;
