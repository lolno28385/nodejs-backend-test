import { Router } from 'express';
import eventsHandlers from '../controllers/events';

export default (deps) => {
	let router = Router();
	const {getAllEvents, addEvent } = eventsHandlers(deps);

	// mount the facets resource
	router.post('/', addEvent);
	router.get('/', getAllEvents);
	
	return router;
};
