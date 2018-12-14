const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    countOf:{
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    count: {
      type: Number,
      required: true
    }
});


const Url = mongoose.model('Counter', counterSchema);
module.exports = {Url}