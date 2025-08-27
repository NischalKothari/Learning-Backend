const express = require('express')
const app = express();

app.use((req,res,next) => {
   next() 
})

app.get( "/" , function (req,res){
   res.send("HOME PAGE")
})

app.get( "/profile", (req,res)=>{
   res.send("PROFILE PAGE")
} )

app.get( "/profile/:username", (req,res)=>{
   res.send(`PROFILE PAGE OF ${req.params.username}`)
   console.log(req)
} )

app.listen(3000);