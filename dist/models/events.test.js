'use strict';

var _chai = require('chai');

var _events = require('../models/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('event', function () {
    it('should be invalid if end is empty', function (done) {
        var event = new _events2.default();
        event.validate(function (err) {
            (0, _chai.expect)(err.errors.end).to.exist;
            done();
        });
    });

    it('should be invalid if start is empty', function (done) {
        var event = new _events2.default();
        event.validate(function (err) {
            (0, _chai.expect)(err.errors.start).to.exist;
            done();
        });
    });

    it('should be invalid if title is empty', function (done) {
        var event = new _events2.default();
        event.validate(function (err) {
            (0, _chai.expect)(err.errors.title).to.exist;
            done();
        });
    });

    it('should be invalid if details is empty', function (done) {
        var event = new _events2.default();
        event.validate(function (err) {
            (0, _chai.expect)(err.errors.details).to.exist;
            done();
        });
    });

    it('should be invalid if location.address is empty', function (done) {
        var event = new _events2.default();
        event.validate(function (err) {
            (0, _chai.expect)(err.errors['location.address']).to.exist;
            done();
        });
    });

    it('should be invalid if location.lat and location.lng is empty', function (done) {
        var event = new _events2.default();
        event.validate(function (err) {
            (0, _chai.expect)(err.errors['location.latLng.lat']).to.exist;
            (0, _chai.expect)(err.errors['location.latLng.lng']).to.exist;
            done();
        });
    });
});
//# sourceMappingURL=events.test.js.map