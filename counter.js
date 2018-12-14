const mongoose = require('mongoose');

const Counter = mongoose.model('Counter', {
    count: {
      type: Number,
      required: true
    },
    countOf: {
       type: String,
      required: true
    }
});

module.e