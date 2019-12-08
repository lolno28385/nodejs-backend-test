import { version } from '../../package.json';
import { Router } from 'express';
import eventsHandlers from '../controllers/events';

export default ({ asyncHandler, db }) => {
	let router = Router();
	const {getAllEvents, addEvent } = eventsHandlers({asyncHandler, db})

	// mount the facets resource
	api.post('/', addEvent);
	api.get('/', getAllEvents)
	
	return api;
}
