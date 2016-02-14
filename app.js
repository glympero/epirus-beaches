var express = require("express");
var bodyParser = require("body-parser")

var app = express();

//Serve contents of public directory
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


var beaches = [
            {
                name: "Menidi", image: "https://sailchecker.com/wp-content/uploads/2015/06/best-greek-beaches-seychelles-beach-ikaria.jpg"
            },
            {
                name: "Koronisia", image: "http://www.beacheszone.com/wp-content/uploads/2012/10/pori_beach_isyub.jpg"
            },
            {
                name: "Kastrosykia", image: "http://www.honeysucklelife.com/wp-content/uploads/2012/05/Greek-Beaches-Zakynthos.jpg"
            }
        ];


app.get("/", function(req, res){
    res.render("home");
});

app.get("/beaches", function(req, res) {
    res.render("beaches", {beaches:beaches});
});

app.post("/beaches", function(req, res){
   var beachName = req.body.name;
   var beachImg = req.body.image;
   
   beaches.push({name: beachName, image: beachImg});
   res.redirect("/beaches");
});

app.get("/beaches/new", function(req, res){
    res.render("new.ejs");
});






//Server Running
app.listen(process.env.PORT, process.env.IP, function(){
//app.listen(8080, "127.0.0.1", function(){
   console.log("Server Running"); 
});