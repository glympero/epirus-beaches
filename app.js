var express = require("express");
var bodyParser = require("body-parser")
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("home");
});

app.get("/beaches", function(req, res) {
    var beaches = [
            {
                name: "Menidi", image: "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e15/11410430_1643890539185282_1517816764_n.jpg"
            },
            {
                name: "Koronisia", image: "http://1.bp.blogspot.com/-3m94WEX25Bs/Ug8nms2QKGI/AAAAAAAAiNA/pSe-nD6krB0/s1600/%25CE%25BA%25CE%25BF%25CF%2581%25CF%2589%25CE%25BD%25CE%25B7%25CF%2583%25CE%25AF%25CE%25B1.jpg"
            },
            {
                name: "Kastrosykia", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/bd/6c/b8/preveza-beach-hotel.jpg"
            }
        ];
        
    res.render("beaches", {beaches:beaches})
});






//Server Running
app.listen(process.env.PORT, process.env.IP, function(){
//app.listen(8080, "127.0.0.1", function(){
   console.log("Server Running"); 
});