var mongoose = require("mongoose");
var Beach = require("./models/beaches");
var Comment = require("./models/comment")

var data = [
        {
            name: "Mpela Vraka",
            image: "http://www.hoteloriana.com/images/bg-location/beach-in-sivota-epirus-in-greece.jpg",
            description: "Lorem ipsum dolor sit amet, elit phasellus ante malesuada magna, bibendum quis quisque, id arcu ante in id luctus euismod. Rutrum sodales scelerisque. Mauris quis est enim tellus tellus, gravida aliquam, senectus lectus quis nonummy vestibulum, quis purus blandit labore nunc. Sem nisl donec pellentesque, tincidunt maecenas urna in dui dui, tempus id, sit ante, bibendum felis turpis"
        },
        {
            name: "Lichnos",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Parga_Lichnos_beach.jpg",
            description: "Lorem ipsum dolor sit amet, elit phasellus ante malesuada magna, bibendum quis quisque, id arcu ante in id luctus euismod. Rutrum sodales scelerisque. Mauris quis est enim tellus tellus, gravida aliquam, senectus lectus quis nonummy vestibulum, quis purus blandit labore nunc. Sem nisl donec pellentesque, tincidunt maecenas urna in dui dui, tempus id, sit ante, bibendum felis turpis"
        },
        {
            name: "Agios Nikitas",
            image: "http://www.beyond-villas.gr/img/gallery/katsiki/katsiki4.jpg",
            description: "Lorem ipsum dolor sit amet, elit phasellus ante malesuada magna, bibendum quis quisque, id arcu ante in id luctus euismod. Rutrum sodales scelerisque. Mauris quis est enim tellus tellus, gravida aliquam, senectus lectus quis nonummy vestibulum, quis purus blandit labore nunc. Sem nisl donec pellentesque, tincidunt maecenas urna in dui dui, tempus id, sit ante, bibendum felis turpis"
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
