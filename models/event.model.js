const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true ,maxlength:80},
  place: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;