import Event from '../models/events';
import User from '../models/users';

export default ({ asyncHandler, errors, logger }) => {
	const create = async (req, res) => {
		const {
			end,
			start,
			location,
			title,
			details,
		} = req.body;

		const { ownerEmail: email } = req.params;

		logger.info(`1 - create event - start for ${email}`, {end, start, location, title, details});


		logger.info(`2 - create event - looking for user ${email}`, {end, start, location, title, details});
		
		//get owner's id
		const user = await User.findOne({email});
		if(!user) {
			logger.info(`2.1 - create event - user not found ${email}`, {end, start, location, title, details});
			throw errors.userNotFound({email});
		}
		const {_id: owner} = user;
		
		// format dates
		const dateStart = new Date(start);
		const dateEnd = new Date(end);

		logger.info(`3 - create event - looking for existing event ${email}`, {end, start, location, title, details});
		//check if event is not duplicate
		const existingEvent = await Event.findOne({
			'location.lng': location.lng,
			'location.lat': location.lat,
			owner,
			start: { $gte: dateStart}, 
			end: { $lte: dateEnd},
		});
	
		if (existingEvent) {
			logger.info(`3.1 - create event - duplicate event ${email}`, {end, start, location, title, details});
			throw errors.eventAlreadyExists({ existingEvent });
		}

		logger.info(`4 - create event - creating event ${email}`, {end, start, location, title, details});

		const event = new Event({
			end,
			start,
			location,
			title,
			details,
			owner
		});

		await event.save();

		logger.info(`5 - create event - finished processing ${email}`, {end, start, location, title, details});
		res.status(200).json(event);
	};

	const list = async (req, res) => {
		const events = await Event.find({});

		logger.info(`get all events - returning ${events.length} records`);
		return res.status(200).json(events);
	};

	const listForUser = async (req, res) => {
		const { ownerEmail: email } = req.params;

		const user = await User.findOne({email});

		if(!user) {
			throw errors.userNotFound({email});
		}

		const {_id: owner} = user;

		const events = await Event.find({ owner });
		return res.status(200).json(events);
	};

	return {
		create: asyncHandler(create),
		list: asyncHandler(list),
		listForUser: asyncHandler(listForUser),
	};
};
