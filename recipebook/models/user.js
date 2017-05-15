var mongoose=require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect('mongodb://localhost/recipebook');
var db=mongoose.connection;

//Define schema
var UserSchema=mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	password:{
		type:String,
		required:true,
		bcrypt:true
	},
	email:{
		type:String
	},
	name:{
		type:String
	},
	profileImage:{
		type:String
	}
});

var User=module.exports=mongoose.model('User',UserSchema);

module.exports.getUserByUsername=function(username,callback){
	var query = {username:username};
	User.findOne(query,callback);
	console.log("Checked username");
}
module.exports.comparePassword=function(candidatePassword,hash,callback){
	bcrypt.compare(candidatePassword,hash,function(err,isMatch){
		console.log('Checked password');
		if (err) return callback(err);
		callback(null,isMatch);
	});
}

module.exports.createUser=function(newUser,callback){
	bcrypt.hash(newUser.password,8,function(err,hash){
		if(err) throw err;
		//Set hashed password
		newUser.password=hash;
		newUser.save(callback);
	});
}
