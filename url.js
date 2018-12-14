const mongoose = require('mongoose');
const dns = require('dns');

const UrlSchema = new mongoose.Schema({
    original_url:{
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      uniqie: true
      /*validate:{
         validator: function() {
           let url = this
         },
        message: '{VALUE} is not a valid URL'
      }*/
    },
    index: {
      type: Number,
      required: true,
      unique: true
    }
});


const Url = mongoose.model('Url', UrlSchema);
module.exports = {Url}