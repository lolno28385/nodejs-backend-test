import chaiHttp from 'chai-http';
import chai from 'chai';
import assert from 'assert';
import getUserHandlers from './users';
import getMockDependencies from '../lib/mockDependencies';
import app from '../index';

const should = chai.should();
chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

describe.skip('Users Controller', () => {
	// const dependencies = await runDB();
	it('should include an update method',  (done) => {
		getMockDependencies().then(dependencies => {
			done();
        
			const {
				update,
			} = getUserHandlers(dependencies);

			assert(typeof update, 'function');
		});		
	});

	it('should include an create method',  (done) => {
		getMockDependencies().then(dependencies => {
			done();
        
			const {
				create,
			} = getUserHandlers(dependencies);

			assert(typeof create, 'function');
		});		
	});
});

describe('Users controller - create user', () => {
	const newUserBody = {
		firstName: 'sina',
		lastName: 'montazeri',
		email:'sinamonta@gmail.com',
		password: 'pass123'
	};

	it('should return an empty 200 response on POST /user/create', (done) => {
		let requester = chai.request(app).keepOpen();

		requester.post('/user/create').send(newUserBody).end((err, res) => {
			res.should.have.status(200);
			requester.close();
			done();
		});
	});

	it('should return a 409 response for a duplicate request on POST /user/create', (done) => {
		let requester = chai.request(app).keepOpen();

		const check = (err, res) => {
			res.should.have.status(409);
			requester.close();
			done();
		};
		
		requester.post('/user/create').send(newUserBody).end(() => {
			requester.post('/user/create').send(newUserBody).end(check);
		});
	});
});