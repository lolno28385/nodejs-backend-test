import { Router } from 'express';
import eventsHandlers from '../controllers/events';

export default ({ asyncHandler, db }) => {
	let router = Router();
	const {getAllEvents, addEvent } = eventsHandlers({asyncHandler, db})

	// mount the facets resource
	router.post('/', addEvent);
	router.get('/', getAllEvents)
	
	return router;
}
