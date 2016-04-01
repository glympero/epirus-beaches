var express     = require("express"),
    User        = require("../models/user"),
    passport    = require("passport");
    
var router = express.Router();

//Register
router.get("/register", function(req, res){
   res.render("register") 
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to our site, " + user.username);
            res.redirect("/beaches");
        });
    });
});

//Login

router.get("/login", function(req, res){
   res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/beaches",
    failureRedirect: "/login"
}) ,function(req, res){
    
});

//Logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/");
})

module.exports = router;