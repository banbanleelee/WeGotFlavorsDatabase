const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const signUpSchema = new Schema({
  agencyCode: {
    type: Number,
    minlength: 3,
    maxlength: 4,
    trim: true,
  },
  micoId: {
    type: Number,
    minlength: 8,
    maxlength: 11,
    trim: true,
  },
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const signUp = model('signUp', signUpSchema);

module.exports = signUp;
