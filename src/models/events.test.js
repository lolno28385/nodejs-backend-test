import { expect } from 'chai';
import Event from '../models/events';


describe.skip('Events Model', function() {
	it('should be invalid if end is empty', function(done) {
		const event = new Event();
		event.validate(function(err) {
			expect(err.errors.end).to.exist;
			done();
		});
	});

	it('should be invalid if start is empty', function(done) {
		const event = new Event();
		event.validate(function(err) {
			expect(err.errors.start).to.exist;
			done();
		});
	});

	it('should be invalid if title is empty', function(done) {
		const event = new Event();
		event.validate(function(err) {
			expect(err.errors.title).to.exist;
			done();
		});
	});

	it('should be invalid if details is empty', function(done) {
		const event = new Event();
		event.validate(function(err) {
			expect(err.errors.details).to.exist;
			done();
		});
	});

	it('should be invalid if owner is empty', function(done) {
		const event = new Event();
		event.validate(function(err) {
			expect(err.errors.owner).to.exist;
			done();
		});
	});

	it('should be invalid if location.address is empty', function(done) {
		const event = new Event();
		event.validate(function(err) {
			expect(err.errors['location.address']).to.exist;
			done();
		});
	});

	it('should be invalid if either location.lat or location.lng are empty', function(done) {
		const event = new Event();
		event.validate(function(err) {
			expect(err.errors['location.lat']).to.exist;
			expect(err.errors['location.lng']).to.exist;
			done();
		});
	});
});