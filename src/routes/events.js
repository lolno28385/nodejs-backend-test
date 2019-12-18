import { Router } from 'express';
import eventsHandlers from '../controllers/events';

export default (deps) => {
	let router = Router();
	const { create, list, listForUser, listPerUser} = eventsHandlers(deps);

	router.post('/:ownerEmail', create);
	router.get('/', list);
	router.get('/user', listPerUser);
	router.get('/user/:ownerEmail', listForUser);

	
	return router;
};
