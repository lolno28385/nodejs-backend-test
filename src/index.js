import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import events from './routes/events';
import config from './config.json';
import asyncHandler from 'express-async-handler';
import { version } from '../package.json';
import winston, { transports } from 'winston';
import errors from './lib/errors';

//set up logger
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		new transports.Console({
			level: 'info',
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple()
			)
		})
	]
});

let app = express();
app.server = http.createServer(app);


// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {
	const dependencies = {
		config,
		db,
		asyncHandler,
		logger,
		errors
	};

	//internal middleware
	app.use(middleware(dependencies));

	//event router
	app.use('/', events(dependencies));

	//meta router for app info, current version etc
	app.use('/meta', (req, res) => {
		res.json({version})
	})



	//error handler, must be after everything else
	app.use((error, req, res) => {
		if(!error){
			error = errors.generalError(
				{
					comment: 'no error has reached error handler',
					data: [
						req.body, req.query, req.params
					]
				}
			)
		}


		//send response
		res.status(error.status);
		
		if (process.env.NODE_ENV !== 'development'){
			return res.json({
				status: error.status,
				message: error.message,
				stack: error.stack
			});
		}
		return res.json({
			status: error.status,
			message: error.message
		});
	});

	app.server.listen(process.env.PORT || config.port, () => {
		logger.info(`Started on port ${app.server.address().port}`)
	});
});

export default app;
