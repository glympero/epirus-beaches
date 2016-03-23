var mongoose = require("mongoose");
var Beach = require("./models/beaches");
var Comment = require("./models/comment")

var data = [
        {
            name: "Mpela Vraka",
            image: "http://www.hoteloriana.com/images/bg-location/beach-in-sivota-epirus-in-greece.jpg",
            description: "Fantastic Beach"
        },
        {
            name: "Lichnos",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Parga_Lichnos_beach.jpg",
            description: "Great View"
        },
        {
            name: "Agios Nikitas",
            image: "http://www.beyond-villas.gr/img/gallery/katsiki/katsiki4.jpg",
            description: "Too many stairs!"
        }
    ]

function seedDB(){
    //Remove beaches
    Beach.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Beaches removed")
         //Add campgrounds
         data.forEach(function(seed){
           Beach.create(seed, function(err, beach){
               if(err){
                   console.log(err);
               }else{
                    console.log("Beach Added!");  
                    Comment.create({
                        text:"Great place for relaxing",
                        author: "John"
                        
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            beach.comments.push(comment);
                            beach.save();
                            console.log("Comment Added!")
                        }
                    });
               }
           }); 
        });
    });
    
   
   
}

module.exports = seedDB;
