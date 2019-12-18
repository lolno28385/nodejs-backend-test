import chaiHttp from 'chai-http';
import chai from 'chai';
import assert from 'assert';
import getEventsHandler from './events';
import app from '../index';
import { mockDependencies, getRandomNumber } from '../lib/util';
import Event from '../models/events';


const should = chai.should(); //eslint-disable-line
chai.use(chaiHttp);

describe.skip('Events Controller', () => {
	// const dependencies = await runDB();
	it('should include an update method',  (done) => {
		const {
			update,
		} = getEventsHandler(mockDependencies);

		assert(typeof update, 'function');	
		done();
	});

	it('should include an create method',  (done) => {
		const {
			create,
		} = getEventsHandler(mockDependencies);

		assert(typeof create, 'function');	
		done();
	});
});

describe.skip('Events Controller - create', () => {
	const firstUser = {
		firstName: 'sina',
		lastName: 'montazeri',
		email:'sinamonta@gmail.com',
		password: 'pass123'
	};
    
	const event = {
		start: new Date('2019-01-01'),
		end: new Date('2019-02-01'),
		title: 'event title',
		details: 'event details',
		location: {
			address: 'no 13 farahani st',
			lat: 123452,
			lng: 543321
		},
	};
    
	it('should return a correct response when creating an event', (done) => {
		let requester = chai.request(app).keepOpen();

		// create user
		requester.post('/user').send(firstUser).end(() => {
			// create event
			requester.post(`/event/${firstUser.email}`).send(event).end((req, res) => {
				res.should.have.status(200);
				res.body.should.have.property('owner');
                
				const {start, end} = res.body;
				assert(new Date(start), event.start);
				assert(new Date(end), event.end);
                
				res.body.location.address.should.equal(event.location.address);
				res.body.location.lat.should.equal(event.location.lat);
				res.body.location.lng.should.equal(event.location.lng);
                
				res.body.title.should.equal(event.title);
				res.body.details.should.equal(event.details);
				requester.close();
				done();
			});
		});
	});
    
	it('should return a 409 response when creating a duplicate event', (done) => {
		let requester = chai.request(app).keepOpen();
		// create user
		requester.post('/user').send(firstUser).end(() => {
			// create event
			requester.post(`/event/${firstUser.email}`).send(event).end(() => {
				// create same event again
				requester.post(`/event/${firstUser.email}`).send(event).end((req, res) => {
					res.should.have.status(409);
					requester.close();
					done();
				});
			});
		});
	});
});


describe('Events Controller - list', () => {
	const firstUser = {
		firstName: 'sina',
		lastName: 'montazeri',
		email:'sinamonta@gmail.com',
		password: 'pass123'
	};
    
	const secondUser = {
		firstName: 'ali',
		lastName: 'gerdabi',
		email:'aligetdabi@gmail.com',
		password: 'pass123'
	};
    
	const event = {
		start: new Date('2019-01-01'),
		end: new Date('2019-02-01'),
		title: 'event title',
		details: 'event details',
	};

	it('should return all events in the system', (done) => {
		let requester = chai.request(app).keepOpen();
		// create user and some events
		requester.post('/user').send(firstUser).end(async () => {
			for(let i = 0 ; i< 10; i++){
				const location = {
					lat: getRandomNumber(100000, 900000),
					lng: getRandomNumber(100000, 900000),
					address: 'waaaat'
				};
				await requester.post(`/event/${firstUser.email}`).send({...event, location});
			}			
		});
		//create another user and some events
		requester.post('/user').send(secondUser).end(async () => {
			for(let i = 0 ; i< 10; i++){
				const location = {
					lat: getRandomNumber(100000, 900000),
					lng: getRandomNumber(100000, 900000),
					address: 'waaaat'
				};
				await requester.post(`/event/${secondUser.email}`).send({...event, location});
			}
            
			requester.get('/event').end((req, res) => {
				res.should.have.status(200);
				res.body.should.have.lengthOf(20);
				requester.close();
				done();
			});
		});

	}).timeout(30000);
    
	it('should return all events for a user and only events for user', (done) => {
		let requester = chai.request(app).keepOpen();
		// create user and some events
		requester.post('/user').send(firstUser).end(async () => {
			for(let i = 0 ; i< 10; i++){
				const location = {
					lat: getRandomNumber(100000, 900000),
					lng: getRandomNumber(100000, 900000),
					address: 'waaaat'
				};
				await requester.post(`/event/${firstUser.email}`).send({...event, location});
			}			
		});
        
		//create another user and some events
		requester.post('/user').send(secondUser).end(async () => {
			for(let i = 0 ; i< 10; i++){
				const location = {
					lat: getRandomNumber(100000, 900000),
					lng: getRandomNumber(100000, 900000),
					address: 'waaaat'
				};
				await requester.post(`/event/${secondUser.email}`).send({...event, location});
			}
            
			requester.get(`/event/${secondUser.email}`).end((req, res) => {
				res.should.have.status(200);
				const recordsBelongToUser = res.body.map(item=> item.owner).every((val, i, arr) => val === arr[0]);
				assert(recordsBelongToUser, true);
				requester.close();
				done();
			});
		});

	}).timeout(30000);
});