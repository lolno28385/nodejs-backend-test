'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _events = require('../controllers/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var asyncHandler = _ref.asyncHandler,
	    db = _ref.db;

	var router = (0, _express.Router)();

	var _eventsHandlers = (0, _events2.default)({ asyncHandler: asyncHandler, db: db }),
	    getAllEvents = _eventsHandlers.getAllEvents,
	    addEvent = _eventsHandlers.addEvent;

	// mount the facets resource


	router.post('/', addEvent);
	router.get('/', getAllEvents);

	return router;
};
//# sourceMappingURL=events.js.map