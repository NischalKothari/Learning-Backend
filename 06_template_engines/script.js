const express = require('express')
const app = express()

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index")
})


const colorRoutes = ['green', 'blue', 'red'];
const errorMessage = "Error 404"

app.get("/:color", (req, res) => {
    const requestedColor = req.params.color;

    if (colorRoutes.includes(requestedColor)) {
        res.render(requestedColor); 
    } else {
        res.status(404).render("pageNotFound",{err : errorMessage});
    }
});

app.listen(3000)