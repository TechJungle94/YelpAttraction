var Attraction = require('../models/attraction');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkAttractionOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Attraction.findById(req.params.id, function(err, attraction) {
			if (err) {
				console.log(err);
				req.flash('error', 'Internal Error');
				res.redirect('back');
			} else {
				if (attraction.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'Action Not Authorized');
					res.redirect('back');
				}
			}
		})		
	} else {
		req.flash('error', 'Plese login first');
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.commentId, function(err, comment) {
			if (err) {
				console.log(err);
				req.flash('error', 'Internal Error');
				res.redirect('back');
			} else {
				if (comment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'Action Not Authorized');
					res.redirect('back');
				}
			}
		})		
	} else {
		req.flash('error', 'Plese login first');
		res.redirect('back');
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'Plese login first');
	res.redirect('/login');
}

module.exports = middlewareObj