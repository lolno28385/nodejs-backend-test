import { Router } from 'express';
import eventsHandlers from '../controllers/events';

export default (deps) => {
	let router = Router();
	const { create, list, listForUser } = eventsHandlers(deps);

	router.post('/:ownerEmail', create);
	router.get('/', list);
	router.get('/:ownerEmail', listForUser);
	
	return router;
};
