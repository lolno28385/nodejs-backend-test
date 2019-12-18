import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './lib/db';
// import middleware from './middleware';
import events from './routes/events';
import users from './routes/users';
import asyncHandler from 'express-async-handler';
import { version } from '../package.json';
import winston, { transports } from 'winston';
import errors from './lib/errors';
import createAuthentication from './lib/authentication';
import passport from 'passport';
import { config } from 'dotenv';

config();

//set up logger
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'event-service' },
	transports: [
		new transports.Console({
			level: 'info',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			),
			silent: (process.env.SHOW_LOGS === 'true')
		})
	]
});


const app = express();
app.server = http.createServer(app);


// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : process.env.bodyLimit
}));

const dependencies = {
	asyncHandler,
	logger,
	errors,
	db: {},
};

//event router
app.use('/event', events(dependencies));
app.use('/user', users(dependencies));


// connect to db
initializeDb( db => {
	dependencies.db = db;

	//internal middlewares
	//app.use(middleware(dependencies));

	// initiate authentication strategies
	app.use(passport.initialize());
	createAuthentication({ passport });

	
	//meta router for app info, current version etc
	app.use('/meta', (req, res) => {
		res.json({version});
	});

	//error handler, must be after everything else
	app.use((error, req, res, next) => { //eslint-disable-line
		if(!error){
			error = errors.generalError(
				{
					comment: 'no error has reached error handler',
					data: [
						req.body, req.query, req.params
					]
				}
			);
		}
		//send response
		res.status(error.status || 500);

		// logger.error(`error has happened: ${ error.message }`);

		if (process.env.NODE_ENV === 'development'){
			return res.json({
				message: error.message,
				stack: error.stack,
				context: error.context || 'none'
			});
		}

		return res.json({
			message: error.message
		});
	});

	app.server.listen(process.env.PORT || process.env.port, () => {
		logger.info(`Started on port ${app.server.address().port}`);
	});
});

export default app;
