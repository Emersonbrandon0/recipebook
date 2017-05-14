var express = require('express');
var session=require('express-session');
var path = require('path');
var router = express.Router();
var User = require('../models/user');
var multer=require('multer');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

router.use(session({ secret: 'my super secret',name: 'my-id', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());


/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../','views','index.html'));
});

router.get('/register',function(req, res, next){
	res.render('register',{title:'Register'});
});

router.get('/login',function(req,res,next){
	res.render('login',{title:'Login'});
});

router.post('/register', multer({ dest: './uploads/'}).single('upl'), function(req, res, next) {
	//Get form values
	console.log(req.body);
	var name=req.body.name;
	var email=req.body.email;
	var username=req.body.username;
	var password=req.body.password;
	var password2=req.body.password2;

	//Check for image field
	if(req.file){
		console.log('Uploading file');

		//File info
		var profileImageOriginalName=req.files.profileImage.originalname;
		var profileImageName=req.files.profileImage.name;
		var profileImageMime=req.files.profileImage.mimeType;
		var profileImagePath=req.files.profileImage.path;
		var profileImageExtension=req.files.profileImage.extension;
		var profileImageSize=req.files.profileImage.size;
	} else{
		//Set default image
		var profileImageName='noImage.jpg';
	}

	//Form validation
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email is required').isEmail();
	req.checkBody('username','Username is required').notEmpty();
	req.checkBody('password','Password is required').notEmpty();
	req.checkBody('password2','Passwords do not match').equals(password);

	var errors=req.validationErrors()
	console.log(errors);
	if(errors){
		res.render('register',{
			errors:errors,
			name:name,
			email:email,
			username:username,
			password:password,
			password2:password2
		});
	} else {
		var newUser = new User({
			name:name,
			email:email,
			username:username,
			password:password,
			profileImage:profileImageName
		});

		//Create user
		User.createUser(newUser, function(error,user){
			if(error) throw error;
			console.log(user);
		});

		//Success message
		req.flash('success','You are now registered and may log in');
		res.location('/');
		res.redirect('/');
	}	
});

passport.use(new LocalStrategy(
function(username, password, done) {
     User.getUserByUsername(username, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
               return done(null, false, { message: 'Incorrect username.' });
          }
          User.comparePassword(password,user.password,function(err,isMatch){
          	if (err) {return done(err);}
          	if (isMatch) {
          		return done(null,user);
          	} else{
          		console.log('Invalid password');
          		return done(null,false, {message: 'Invalid password.'});
          	}
          });
       });
    }

));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



module.exports = router;