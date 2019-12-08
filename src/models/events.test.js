import { expect } from 'chai';
import Event from '../models/events';


describe('event', function() {
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

    it('should be invalid if location.address is empty', function(done) {
        const event = new Event();
        event.validate(function(err) {
            expect(err.errors['location.address']).to.exist;
            done();
        });
    });

    it('should be invalid if location.lat and location.lng is empty', function(done) {
        const event = new Event();
        event.validate(function(err) {
            expect(err.errors['location.latLng.lat']).to.exist;
            expect(err.errors['location.latLng.lng']).to.exist;
            done();
        });
    });
});