const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    original_url:{
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      uniqie: true
    },
    short_url: {
      type: Number,
      required: true,
      unique: true
    }
});


const Url = mongoose.model('Url', UrlSchema);
module.exports = {Url}