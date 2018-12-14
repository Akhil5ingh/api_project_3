'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;
const urls = [];

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());
app.use(bodyParser.urlencoded({'extended': false}));
app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/shorturl/new', (req, res) => {
  let URL = req.body.original_url;
  
  res.send(req.body);
  // check if URL is valid
  
  let index = urls.push(URL);
  res.send({
    original_url: URL,
    short_url: index
  });  
});

app.get('/api/urls', (req, res) => {
  res.send({urls, length: urls.length});
});



app.listen(port, function () {
  console.log('Node.js listening ...');
});