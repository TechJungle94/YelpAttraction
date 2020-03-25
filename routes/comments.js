var express = require('express');
var router = express.Router();
var Attraction = require('../models/attraction');
var Comment = require('../models/comment');
var middleware = require('../middleware/index.js');

router.get('/attractions/:id/comments/new', middleware.isLoggedIn, function(req, res) {
	Attraction.findById(req.params.id, function(err, attraction) {
		if (err) {
			console.log('adding new comment fail')
		} else {
			res.render('newComment', {attraction: attraction});
		}
	})
})

router.post('/attractions/:id/comments', middleware.isLoggedIn, function(req, res) {
	Attraction.findById(req.params.id, function(err, attraction) {
		if (err) {
			console.log('posting a comment fail');
			res.redirect('/attractions')
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.log(err);
				} else {
					// add username and id to the comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					attraction.comments.push(comment);
					attraction.save();
					req.flash('success', 'Comment Added');
					res.redirect(`/attractions/${attraction._id}`);
				}
			})
		}
	})
})

//comment edit route
router.get('/attractions/:id/comments/:commentId/edit', middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.commentId, function(err, theComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.render('editComment', {attractionId: req.params.id, comment: theComment});
		}
	})
})
router.put('/attractions/:id/comments/:commentId', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect('back');
		} else {
			res.redirect(`/attractions/${req.params.id}`);
		}
	})
}) 

// comment delete route
router.delete('/attractions/:id/comments/:commentId', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.commentId, function(err) {
		if(err) {
			console.log(err);
			res.redirect('back');
		} else {
			req.flash('success', 'Comment Deletion Success');
			res.redirect(`/attractions/${req.params.id}`)
		}
	})
})

module.exports = router;