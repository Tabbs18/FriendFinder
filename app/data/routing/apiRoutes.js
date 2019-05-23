const friends = require('../friends');

module.exports = (app) => {
	app.get('/api/friends', (req, res) => {
		res.json(friends);
	});

	app.post('/api/friends', (req, res) => {
        var userInput = req.body;
        var userResponses = userInput.scores;
        var matchName = '';
        var matchImage = '';
        var totalDifference = 500;

        
        for (var i = 0; i < friends.length; i++) {
            var diff = 0;
            for (var ctr = 0; ctr < userResponses.length; ctr++) {
                diff += Math.abs(friends[i].scores[ctr] - userResponses[ctr]);
            }
            if (diff < totalDifference) {
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }
        friends.push(userInput);
        res.json({ status: 'OK', matchName: matchName, matchImage: matchImage });
    });
};