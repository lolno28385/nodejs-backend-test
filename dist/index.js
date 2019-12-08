'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _events = require('./routes/events');

var _events2 = _interopRequireDefault(_events);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _expressAsyncHandler = require('express-async-handler');

var _expressAsyncHandler2 = _interopRequireDefault(_expressAsyncHandler);

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// logger
app.use((0, _morgan2.default)('dev'));

// 3rd party middleware
app.use((0, _cors2.default)({
	exposedHeaders: _config2.default.corsHeaders
}));

app.use(_bodyParser2.default.json({
	limit: _config2.default.bodyLimit
}));

// connect to db
(0, _db2.default)(function (db) {

	var dependencies = {
		config: _config2.default,
		db: db,
		asyncHandler: _expressAsyncHandler2.default

		// internal middleware
	};app.use((0, _middleware2.default)(dependencies));

	// event router
	app.use('/', (0, _events2.default)(dependencies));

	//meta router for app info, current version etc
	app.use('/meta', function (req, res, next) {
		res.json({ version: _package.version });
	});

	app.server.listen(process.env.PORT || _config2.default.port, function () {
		console.log('Started on port ' + app.server.address().port);
	});
});

exports.default = app;
//# sourceMappingURL=index.js.map