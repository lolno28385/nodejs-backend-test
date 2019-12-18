import { Router } from 'express';
import eventsHandlers from '../controllers/events';

export default (deps) => {
	let router = Router();
	const { create, list } = eventsHandlers(deps);

	// mount the facets resource
	router.post('/:ownerEmail', create);
	router.get('/', list);
	
	return router;
};
