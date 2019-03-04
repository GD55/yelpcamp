var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStatergy = require("passport-local"),
	flash = require("connect-flash"),
	methodOverride = require("method-override"),
    Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds"),
	commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	authRoutes = require("./routes/index");
	
mongoose.connect(process.env.DATABASEURL,{useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

//passport Config
app.use(require("express-session")({
	secret: "my favorite color is light blue",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",authRoutes);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 		image: "https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg",
// 		description: "This is a huge granite hill, no bathroom. No water. Beautiful granite"
// 		},function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log(campground);
// 		}
// 	});

// var campgrounds =[
// 		{name: "Salmon Creek",img: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png"},
// 		{name: "Granite Hill",img: "https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg"},
// 		{name: "Mountain Groot",img: "http://hillsidecampsite.co.uk/wp-content/uploads/2018/04/Webp.net-compress-image.jpg"},
// 		{name: "Salmon Creek",img: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png"},
// 		{name: "Granite Hill",img: "https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg"},
// 		{name: "Mountain Groot",img: "http://hillsidecampsite.co.uk/wp-content/uploads/2018/04/Webp.net-compress-image.jpg"},
// 		{name: "Salmon Creek",img: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png"},
// 		{name: "Granite Hill",img: "https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg"},
// 		{name: "Mountain Groot",img: "http://hillsidecampsite.co.uk/wp-content/uploads/2018/04/Webp.net-compress-image.jpg"}
// ]

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp server started on port 3000");
});