const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true, // ensures MongoDB index enforces uniqueness
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  collection: 'main_notes'
}
);

module.exports = mongoose.model('Note', noteSchema);
