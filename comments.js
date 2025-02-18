// Create web server and listen to port 3000
// Load the comments.json file
// Add a new comment
// Save the comments.json file

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('Comment added');
  });
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});