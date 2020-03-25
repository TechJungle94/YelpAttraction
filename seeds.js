var mongoose = require('mongoose');
var Attraction = require('./models/attraction.js');
var Comment = require('./models/comment.js');

var seedData = [
	{name: 'Mountain', 
	 image: 'https://images.unsplash.com/photo-1565098735462-5db3412ac4cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
	description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
	{name: 'Snow Mountain', 
	 image: 'https://images.unsplash.com/photo-1550871425-dae11d7024c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80',
	description: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'},
	{name: 'Rock at the beach', 
	 image: 'https://images.unsplash.com/photo-1496347646636-ea47f7d6b37b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
	description: 'ccccccccccccccccccccccccccccccccccccccccc'}
];



function seedDB() {
	Attraction.remove({}, function(err) {
		// if (err) {
		// 	console.log('something wrong with the  seed');
		// } else {
		// 	console.log('attractions removed');
		// 	// add some attracrtions 
		// 	seedData.forEach(function(seed) {
		// 		Attraction.create(seed, function(err, attraction) {
		// 			if (err) {
		// 				console.log('something wrong add seed attraction');
		// 			} else {
		// 				console.log('add an attraction success');
		// 				// add one commment for each attraction
		// 				Comment.create({
		// 					text: 'San Francisco, officially the City and County of San Francisco and colloquially known as SF, San Fran, Frisco, or The City,[19][20] is the cultural, commercial, and financial center of Northern California. San Francisco is the 15th most populous city in the United States, and the fourth most populous in California, with 883,305 residents as of 2018.[14] It covers an area of about 46.89 square miles (121.4 km2),[21] mostly at the north end of the San Francisco Peninsula in the San Francisco Bay Area, making it the second most densely populated large U.S. city, and the fifth most densely populated U.S. county, behind only four of the five New York City boroughs.',
		// 					author: 'Kevin'
		// 				}, function(err, comment) {
		// 					if (err) {
		// 						console.log('comment create fail');
		// 					} else {
		// 						attraction.comments.push(comment);
		// 						attraction.save();
		// 						console.log('comment create success');
		// 					}
		// 				})
		// 			}
		// 		})
		// 	})
		// }
	});
}
module.exports = seedDB;