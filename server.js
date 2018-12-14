'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Url = require('./url.js');
const Counter = require('./counter.js');
var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());
app.use(bodyParser.urlencoded({'extended': false}));
app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/shorturl/new', (req, res) => {
  let original_url = req.body.original_url;
  
  // check if URL is valid

  // get url count
  Counter.find({countOf: 'url'}).then((docs) => {
        let count = docs.length;
        let url = new Url({
          original_url,
          short_url: count
        });
      
    }).catch((e) => {
        res.status(400).send(e);
    });
  
  let url = new Url({
      original_url,
  });

  // save new todo
  /*Url.save().then((doc) => {
      res.send(doc);
  }).catch((e) => {
      res.status(400).send(e);
  });*/
  
  
  /*res.send({
    original_url,
    short_url
  });  */
});

app.get('/api/urls', (req, res) => {
  //res.send({urls, length: urls.length});
});



app.listen(port, function () {
  console.log('Node.js listening ...');
});