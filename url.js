const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    original_url:{
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      uniqie: true,
      validate:{
         validator: 
      }
    }
});


const Url = mongoose.model('Url', UrlSchema);
module.exports = {Url}