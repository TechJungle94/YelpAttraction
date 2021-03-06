var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');

// landing page route
router.get('/', function(req, res) {
	res.render('landing');
})

// authenticate route
// register route
router.get('/register', function(req, res) {
	res.render('register');
})
router.post('/register', function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('/register');
		} else {
			passport.authenticate('local')(req, res, function() {
				req.flash('success', `Welcome to join us, ${user.username}`);
				res.redirect('/attractions');
			});
		}
	});
});

// login route
router.get('/login', function(req, res) {
	res.render('login');
});
router.post('/login', passport.authenticate('local', {
	successRedirect: '/attractions',
	failureRedirect:'/login'
}), function(req, res) {
	req.flash('success', 'Login Success');
})

// logout route
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Logout Success');
	res.redirect('/attractions');
})

module.exports = router;