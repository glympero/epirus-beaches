var express     = require("express"),
    Beaches     = require("../models/beaches"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware"); //not needing to say /index.js because index os automatically defined
    
var router = express.Router({mergeParams: true});

// - Comments Routes
router.get("/new", middleware.isLoggedIn ,function(req, res) {
    Beaches.findById(req.params.id, function(err, beach){
        if (err){
            console.log(err);
        }else{
            res.render("comments/new", {beach: beach});
        }
    });
    
});

//Create comment
router.post("/", middleware.isLoggedIn ,function(req, res){
    Beaches.findById(req.params.id, function(err, beach){
        if(err){
            console.log(err);
            res.redirect("/beaches")
        }else{
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   //adding username to comment (comment-author-id refers to the model)
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username
                   comment.save();
                   beach.comments.push(comment);
                   beach.save();
                   req.flash("success", "Comment added");
                   res.redirect('/beaches/' + beach._id);
               } 
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            res.redirect("back");
        }else{
            
            res.render("comments/edit", {beach_id: req.params.id, comment: comment});
        }
    });
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
     //Params, id to update - data to pass
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if (err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment edited");
            res.redirect("/beaches/" + req.params.id)
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       }else{
           req.flash("success", "Comment deleted");
           res.redirect("/beaches/" + req.params.id)
       }
   });
});

module.exports = router;