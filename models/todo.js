const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new Schema({
  descreption: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Todo', todoSchema);
