const mongoose = require('mongoose');

const { Schema, Schema: {Types: {ObjectId}} } = mongoose;

const eventSchema = new Schema(
	{
		end: { type: Date, required: true },
		start: { type: Date, required: true },
		title: { type: String, required: true },
		details: { type: String, required: true },
		owner: { type: ObjectId, required: true },
		location: {
			address: { type: String, required: true },
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
	},
	{
		timestamps: true,
	},
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
