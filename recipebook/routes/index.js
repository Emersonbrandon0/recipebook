var express = require('express');
var path = require('path');
var router = express.Router();

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


module.exports = router;