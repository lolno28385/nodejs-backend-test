'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (_ref) {
	var asyncHandler = _ref.asyncHandler;

	var addEvent = function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
			var dateEnd, existingEvent;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:

							dateStart.setTime(dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
							data.start = dateStart;

							dateEnd = new Date(data.end);

							dateEnd.setTime(dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000);

							data.end = dateEnd;
							_context.next = 7;
							return Event.findOne({
								$and: [{
									'location.latLng.lng': data.location.latLng.lng,
									'location.latLng.lat': data.location.latLng.lat
								}, {
									$and: [{ start: { $gte: data.start } }, { end: { $lte: data.end } }]
								}]
							});

						case 7:
							existingEvent = _context.sent;


							if (existingEvent) {
								res.status(500).json({
									success: false,
									message: 'An Event already exist at this venue on this day'
								});
							} else {
								Event.make(data).then(function (event) {
									res.status(200).json({
										success: true,
										event: event
									});
								}).catch(function (err) {
									console.log(err);
									res.status(500).json({
										success: false,
										message: 'An Error Occured, please try again later'
									});
								});
							}

						case 9:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function addEvent(_x, _x2) {
			return _ref2.apply(this, arguments);
		};
	}();

	var getAllEvents = function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							Event.see({}).then(function (events) {
								res.json({ success: true, events: events });
							}).catch(function (err) {
								console.log(err);
								res.status(500).json({
									success: false,
									message: 'An Error Occured, please try again later'
								});
							});

						case 1:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined);
		}));

		return function getAllEvents(_x3, _x4) {
			return _ref3.apply(this, arguments);
		};
	}();

	return {
		addEvent: asyncHandler(addEvent),
		getAllEvents: asyncHandler(getAllEvents)
	};
};
//# sourceMappingURL=events.js.map