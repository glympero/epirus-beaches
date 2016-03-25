var express = require("express");
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
var Beaches = require("./models/beaches");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

var app = express();
var dbURI = 'mongodb://localhost/beaches_epirus';

seedDB();
mongoose.connect(dbURI);
//mongoose.connect("mongodb://localhost/beaches_epirus");

//Serve contents of public directory
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");



// Beaches.create({
//                 name: "Sivota", 
//                 image: "http://img6.charmio.com/images/2495-ornella-beach-resort-villas-sivota-thesprotia-greece-03-600.jpg",
//                 description: "This is a great beach with crystal clear waters."
//             },function(err, beach){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log(beach);
//             } 
//     });


app.get("/", function(req, res){
    res.render("home");
});

//INDEX ROUTE - show all beaches
app.get("/beaches", function(req, res) {
    Beaches.find({}, function(err, beaches){
        if(err){
            console.log(err);
        }else {
            res.render("beaches/index", {beaches:beaches});
        }
    });
});

//CREATE ROUTE - add new beach to DB
app.post("/beaches", function(req, res){
   var beachName = req.body.name;
   var beachImg = req.body.image;
   var beachDesc = req.body.desc;
    Beaches.create({
                name: beachName, 
                image: beachImg,
                description: beachDesc
            },function(err, beach){
                if(err){
                    console.log(err)
                } else {
                    res.redirect("/beaches");
            } 
    });
});

//NEW ROUTE - show form to create new beach
app.get("/beaches/new", function(req, res){
    res.render("beaches/new");
});

//SHOW ROUTE - show details of a selected beach
// app.get("/beaches/:id", function(req, res){
    
//     var beachId = req.params.id;
    
//     Beaches.findById(beachId, function(err, beach){
//         if(err) {
//             console.log(err);
//         }else{
//             res.render("show", {beach: beach});
//         }
//     });
// });

//SHOW ROUTE - show details of a selected beach
app.get("/beaches/:id", function(req, res){
    
    var beachId = req.params.id;
    
    Beaches.findById(beachId).populate("comments").exec(function(err, beach){
        if(err) {
            console.log(err);
        }else{
            
            res.render("beaches/show", {beach: beach});
        }
    });
});


// - Comments Routes
app.get("/beaches/:id/comments/new", function(req, res) {
    Beaches.findById(req.params.id, function(err, beach){
        if (err){
            console.log(err);
        }else{
            res.render("comments/new", {beach: beach});
        }
    });
    
});

app.post("/beaches/:id/comments", function(req, res){
    Beaches.findById(req.params.id, function(err, beach){
        if(err){
            console.log(err);
            res.redirect("/beaches")
        }else{
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   beach.comments.push(comment);
                   beach.save();
                   res.redirect('/beaches/' + beach._id);
               } 
            });
        }
    });
});





//Server Running
app.listen(process.env.PORT, process.env.IP, function(){
//app.listen(8080, "127.0.0.1", function(){
   console.log("Server Running"); 
});

//Monitoring moongose
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});