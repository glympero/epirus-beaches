var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash")
;

var indexRoutes     = require("./routes/index"),
    beachRoutes     = require("./routes/beaches"),
    commentRoutes   = require("./routes/comments"),
    authRoutes      = require("./routes/auth");

var app = express();

var dbURI = 'mongodb://localhost/beaches_epirus';
//mongoose.connect("mongodb://localhost/beaches_epirus");
mongoose.connect(dbURI);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
//Serve contents of public directory



app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//Use connect-flash for displaying messages
app.use(flash());
//seedDB();

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

// ====================
// PASSPORT CONFIG
// ====================

app.use(require("express-session")({
    secret: "Again this can be anything we want",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    //Middleware which passes current user to every route
    res.locals.currentUser = req.user;
    //Passing message to eveyr page
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//Using Routes
app.use(indexRoutes);
app.use(authRoutes);
app.use("/beaches", beachRoutes);
app.use("/beaches/:id/comments", commentRoutes);


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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