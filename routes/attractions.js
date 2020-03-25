var express = require('express');
var router = express.Router();
var Attraction = require('../models/attraction.js');
var middleware = require('../middleware/index.js');

router.get('/attractions', function(req, res) {
	// get all the attractions from the database
	Attraction.find({}, function(err, attractions) {
		if (err) {
			console.log("something goes wrong");
		} else {
			res.render('index', {attractions: attractions, currentUser: req.user});
		}
	})
})

// create attraction route
router.get('/attractions/new', middleware.isLoggedIn, function(req, res) {
	res.render('new');
})
router.post('/attractions', middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	
	Attraction.create({name: name, image: image, description: description, author: author}, function(err, newAttraction) {
		if (err) {
			console.log('new attraction creation fails');
		} else {
			console.log(newAttraction);
			res.redirect('/attractions');
		}
	})
})

// show one of the attraction route
router.get('/attractions/:id', function(req, res) {
	// find the attraction specified by the id
	Attraction.findById(req.params.id).populate('comments').exec(function(err, theAttraction) {
		if (err) {
			console.log('something wrong showing more info')
		} else {
			res.render('show', {attraction: theAttraction});
		}
	})
	//res.send('to be worked on');
})

// edit the attraction route
router.get('/attractions/:id/edit', middleware.checkAttractionOwnership, function(req, res) {
	Attraction.findById(req.params.id, function(err, attraction) {
		if (err) {
			req.flash('error', 'Internal Error');
			res.redirect('/attractions');
		} else {
			res.render('editAttraction', {theAttraction: attraction});	
		}
	})
})

// update the attraction route
router.put('/attractions/:id', middleware.checkAttractionOwnership, function(req, res) {
	Attraction.findByIdAndUpdate(req.params.id, req.body.attraction, function(err, updatedAttraction) {
		if (err) {
			res.redirect('/attractions');
		} else {
			res.redirect(`/attractions/${req.params.id}`);
		}
	})
})

router.delete('/attractions/:id', middleware.checkAttractionOwnership, function(req, res) {
	Attraction.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			console.log(err);
		}
		req.flash('success', 'Attraction Deletion Success');
		res.redirect('/attractions');
	})
})

module.exports = router;