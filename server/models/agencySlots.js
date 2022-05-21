const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const agencySlotsSchema = new Schema({
  agencyCode: {
    type: Number,
    minlength: 3,
    maxlength: 4,
    trim: true,
  },
  slotAvailable: {
    type: Number,
    trim: true,
  },
  participatedIds: [
    {
      micoId: {
        type: Number,
        trim: true,
      },
      eventName: {
        type: String,
        trim: true,
      },
      time: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    }
  ],    
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

agencySlotsSchema.virtual('slotRemained').get(function () {
  return this.slotAvailable - this.participatedIds.length;
});

const agencySlots = model('agencySlots', agencySlotsSchema);

module.exports = agencySlots;