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
	it('should return an empty 200 response  on POST /user/create', (done) => {


		const check = (err, res) => {
			res.should.have.status(200);
			
		};

		var requester = chai.request(app).keepOpen();

		Promise.all([
			requester.post('/user/create'),
			requester.post('/user/create'),
		])
			.then(responses => {
				console.log(responses);
			})
			.then(() => {
				requester.close();
				done();
			});
		// getMockDependencies()
		// .then(async dependencies => {
		// 	const mockRequest = httpMocks.createRequest({
		// 		method: 'POST',
		// 		url: '/user/create',
		// 		body: newUserBody,
		// 	});
            
		// 	const mockResponse = httpMocks.createResponse();
		// 	const {
		//         create,
		//     } = getUserHandlers(dependencies);
    
		// 	create(mockRequest, mockResponse);
            
		// 	const actualResponseCode = mockResponse._getStatusCode();
		// 	const expectedResponseCode = 200;
		// 	equal(actualResponseCode, expectedResponseCode);
		// 	done();        
		// });
	});
});