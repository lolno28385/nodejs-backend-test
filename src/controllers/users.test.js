import chaiHttp from 'chai-http';
import chai from 'chai';
import assert from 'assert';
import getUserHandlers from './users';
import getMockDependencies from '../lib/mockDependencies';
import app from '../index';


const should = chai.should(); //eslint-disable-line
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

describe.skip('Users controller - create user', () => {
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
			res.should.be.json;
			res.body.should.have.property('message');
			res.body.message.should.equal('can not process request');
			requester.close();
			done();
		};
		
		requester.post('/user/create').send(newUserBody).end(() => {
			requester.post('/user/create').send(newUserBody).end(check);
		});
	});
});

describe.skip('Users controller - update user', () => {
	const newUserBody = {
		firstName: 'sina',
		lastName: 'montazeri',
		email:'sinamonta@gmail.com',
		password: 'pass123'
	};


	it('should return a correct updated user object on PATCH /user/update', (done) => {
		const requester = chai.request(app).keepOpen();
		//create a user
		requester.post('/user').send(newUserBody).end(() => {
			// update the user
			requester.patch('/user').send({firstName: 'newFirstName', email: newUserBody.email}).end((req, res) => {
				res.should.have.status(200);
				res.body.should.have.property('firstName');
				res.body.should.have.property('lastName');
				res.body.should.have.property('email');
				res.body.firstName.should.equal('newFirstName');
				res.body.lastName.should.equal(newUserBody.lastName);
				res.body.email.should.equal(newUserBody.email);
				res.body.should.not.have.property('password');
				requester.close();
				done();
			});
		});
	});

	it('should return a 404 response for unknown user on PATCH /user/update', (done) => {
		const requester = chai.request(app).keepOpen();
		//create a user
		requester.post('/user').send(newUserBody).end(() => {
			// update the user
			requester.patch('/user').send({firstName: 'newFirstName', email: 'what@noemail.com'}).end((req, res) => {
				res.should.have.status(404);
				res.body.should.have.property('message');
				res.body.message.should.equal('can not process request');
				requester.close();
				done();
			});
		});
	});
});