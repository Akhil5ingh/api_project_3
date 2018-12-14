'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {Url} = require('./url.js');
const {Counter} = require('./counter.js');
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

const saveCounter = (count) => {
  // create counter
   let counter = {
     countOf: 'url',
     count
   };
  // save counter
   Counter.save(counter).then((c) => {
    console.log('Counter saved');
  }).catch((e) => {

  });
}

const updateCounter = (count, callback) => {
   Counter.findOneAndUpdate({countOf: 'url'}, {count}).then((c) => {
    console.log('Counter saved');
     callback();
  }).catch((e) => {
    console.log('Error:',e);
  });
}

app.post('/api/shorturl/new', (req, res) => {
  let original_url = req.body.original_url;
  
  // check if URL is valid

  // get url count
  Counter.find({countOf: 'url'}).then((docs) => {
        let count = docs.length;
        count++;
    
        // create new URL
        let url = new Url({
          original_url,
          short_url: count
        });
    
        // save new URL
        Url.save(url).then((url) => {
          // update counter and return url object
          updateCounter(count, () => {            
            res.send(url);
          });
        }).catch((e) => {
          res.status(400).send(e);
        });
      
    }).catch((e) => {
        res.status(400).send(e);
    });

});

app.get('/api/urls', (req, res) => {
  Url.find().then((docs) => { 
    res.send({docs});
  }).cathc((e) => res.status(400).send(e));
});



app.listen(port, function () {
  console.log('Node.js listening ...');
});