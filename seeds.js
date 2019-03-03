var mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data =[
	{
		name: "Cloud's Rest",
		image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg",
		description: "Praesent ipsum ex, tincidunt vel tortor at, euismod ultrices tellus. Sed efficitur dictum lectus, at malesuada sem varius non. Proin sapien magna, aliquet quis molestie non, blandit non nibh. Phasellus vitae velit nisl. Sed sit amet mi vel velit laoreet placerat a in nisi. Pellentesque bibendum eros sit amet felis rhoncus rutrum. Curabitur ex arcu, ornare vel facilisis rutrum, lacinia a nunc. Morbi laoreet venenatis quam, in pretium tellus pulvinar ut. Vestibulum consequat, leo eu aliquam facilisis, metus tellus scelerisque odio, sit amet tempus elit lacus in tellus."
	},
	{
		name: "Sun Sites",
		image: "https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg",
		description: "Praesent ipsum ex, tincidunt vel tortor at, euismod ultrices tellus. Sed efficitur dictum lectus, at malesuada sem varius non. Proin sapien magna, aliquet quis molestie non, blandit non nibh. Phasellus vitae velit nisl. Sed sit amet mi vel velit laoreet placerat a in nisi. Pellentesque bibendum eros sit amet felis rhoncus rutrum. Curabitur ex arcu, ornare vel facilisis rutrum, lacinia a nunc. Morbi laoreet venenatis quam, in pretium tellus pulvinar ut. Vestibulum consequat, leo eu aliquam facilisis, metus tellus scelerisque odio, sit amet tempus elit lacus in tellus."
	},
	{
		name: "Black hornet",
		image: "https://media-cdn.tripadvisor.com/media/photo-s/09/22/fa/f5/mount-desert-campground.jpg",
		description: "Praesent ipsum ex, tincidunt vel tortor at, euismod ultrices tellus. Sed efficitur dictum lectus, at malesuada sem varius non. Proin sapien magna, aliquet quis molestie non, blandit non nibh. Phasellus vitae velit nisl. Sed sit amet mi vel velit laoreet placerat a in nisi. Pellentesque bibendum eros sit amet felis rhoncus rutrum. Curabitur ex arcu, ornare vel facilisis rutrum, lacinia a nunc. Morbi laoreet venenatis quam, in pretium tellus pulvinar ut. Vestibulum consequat, leo eu aliquam facilisis, metus tellus scelerisque odio, sit amet tempus elit lacus in tellus."
	}
	
]


function seedDB(){
	//Remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}else{
					console.log("added a campground");
					//create a comment
					Comment.create({
						text: "This place is great, but I wish there was internet",
						author: "Homer"
					},function(err, comment){
						if(err){
							console.log(err);
						}else{
							campground.comments.push(comment);
							campground.save();
							console.log("comment saved")
						}
					})
				}
			});
		});
	});
}

module.exports =seedDB;