'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var eventSchema = new Schema({
  end: { type: Date, required: true },
  start: { type: Date, required: true },
  title: { type: String, required: true },
  details: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    latLng: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  }
}, {
  timestamps: true
});

var Event = mongoose.model('Meme', eventSchema);

exports.default = Event;
//# sourceMappingURL=events.js.map