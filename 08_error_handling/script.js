const express = require("express");
const app = express();

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/error", (req,res,next)=>{
    throw Error("ATMKBFJG")
})

app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err.message });
});

app.listen(3000);

console.log(`App running on http://localhost:3000`);

