import resource from 'resource-router-middleware';
import facets from '../models/facets';

export default ({asyncHandler}) => {
	const addEvent = async (req, res) => {

		dateStart.setTime(
		  dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
		);
		data.start = dateStart;
	
		const dateEnd = new Date(data.end);
		dateEnd.setTime(
		  dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
		);
	
		data.end = dateEnd;
		const existingEvent = await Event.findOne({
		  $and: [
			{
			  'location.latLng.lng': data.location.latLng.lng,
			  'location.latLng.lat': data.location.latLng.lat,
			},
			{
			  [{ start: { $gte: data.start } }, { end: { $lte: data.end } }],
			},
		  ],
		});
	
	
	
		if (existingEvent) {
		  res.status(500).json({
			success: false,
			message: 'An Event already exist at this venue on this day',
		  });
		} else {
		  Event.make(data)
			.then((event) => {
			  res.status(200).json({
				success: true,
				event,
			  });
			})
			.catch((err) => {
			  console.log(err);
			  res.status(500).json({
				success: false,
				message: 'An Error Occured, please try again later',
			  });
			});
		}
	}

	const getAllEvents = async (req, res) => {
		Event.see({})
		  .then((events) => {
			res.json({ success: true, events });
		  })
		  .catch((err) => {
			console.log(err);
			res.status(500).json({
			  success: false,
			  message: 'An Error Occured, please try again later',
			});
		  });
	}

	return {
		addEvent: asyncHandler(addEvent),
		getAllEvents: asyncHandler(getAllEvents),
	}
}
