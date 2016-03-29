//Middleware
var Beaches     = require("../models/beaches"),
    Comment     = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkOwnership = function (req, res, next){
    //if user is logged in - built in method
     if(req.isAuthenticated()){
        Beaches.findById(req.params.id, function(err, beach){
           if(err){
               req.flash("error", "Cannot connecto to database");
               res.redirect("back");
           }else{
               //if user owns beach. .equals is method from mongoose for comparing id's
               if(beach.author.id.equals(req.user._id)){
                   next();
               }else{
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    //if user is logged in - built in method
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
           if(err){
               req.flash("error", "Cannot connecto to database");
               res.redirect("back");
           }else{
               //if user owns beach. .equals is method from mongoose for comparing id's
               if(comment.author.id.equals(req.user._id)){
                   next();
               }else{
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
           }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj