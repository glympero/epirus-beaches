var express = require("express"),
    Beaches = require("../models/beaches"),
    middleware  = require("../middleware");

var router = express.Router();

//INDEX ROUTE - show all beaches
router.get("/", function(req, res) {
    Beaches.find({}, function(err, beaches){
        if(err){
            console.log(err);
        }else {
            res.render("beaches/index", {beaches:beaches});
        }
    });
});

//CREATE ROUTE - add new beach to DB
router.post("/", middleware.isLoggedIn ,function(req, res){
    
   var beachName = req.body.name;
   var beachImg = req.body.image;
   var beachDesc = req.body.desc;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
    Beaches.create({
                name: beachName, 
                image: beachImg,
                description: beachDesc,
                author: author
            },function(err, beach){
                if(err){
                    console.log(err)
                } else {
                    console.log(beach);
                    req.flash("success", "Beach created");
                    res.redirect("/beaches");
            } 
    });
});

//NEW ROUTE - show form to create new beach
router.get("/new", middleware.isLoggedIn ,function(req, res){
    res.render("beaches/new");
});

//SHOW ROUTE - show details of a selected beach
router.get("/:id", function(req, res){
    
    var beachId = req.params.id;
    
    Beaches.findById(beachId).populate("comments").exec(function(err, beach){
        if(err) {
            console.log(err);
            
        }else{
            
            res.render("beaches/show", {beach: beach});
        }
    });
});

//EDIT BEACHES
router.get("/:id/edit", middleware.checkOwnership, function(req, res){
    Beaches.findById(req.params.id, function(err, beach){
        if (err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("beaches/edit", {beach: beach});
        }
    });
});


//UPDATE BEACHES
router.put("/:id", middleware.checkOwnership, function(req, res){

    //Params, id to update - data to pass
    Beaches.findByIdAndUpdate(req.params.id, req.body.beach, function(err, beach){
        if (err){
            res.redirect("back");
        }else{
            req.flash("success", "Beach updated");
            res.redirect("/beaches/" + req.params.id)
        }
    })
});

//DESTROY BEACH
router.delete("/:id",  middleware.checkOwnership, function(req, res){
   Beaches.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("back");
       }else{
           req.flash("success", "Beach deleted");
           res.redirect("/beaches")
       }
   });
});

module.exports = router;