// Used for routing 

// import express from 'express'

const express = require('express')
const app = express()

app.use(function (req,res,next) {
    console.log("Hello");
    next()
})

app.use(function(req,res,next){
    console.log("World");
    next();
})


app.get('/', (req, res) => {
  res.send('Backend')
})

app.get('/profile', (req, res) => {
  res.send('Route')
})

app.get('/contact', (req, res) => {
  res.send('Contact')
})



app.listen(3000)