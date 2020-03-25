// schema setup
var mongoose = require('mongoose');
var attractionSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comments: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
		}
	]
});

var Attraction = mongoose.model("Attraction", attractionSchema);
module.exports = Attraction;