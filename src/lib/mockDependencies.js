import asyncHandler from 'express-async-handler';
import winston, { transports } from 'winston';
import errors from './errors';
import initializeDb from './db';


export default function getMockDependencies() {
	return new Promise(resolve => {

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
					)
				})
			]
		});
        
		initializeDb( db => {
			return resolve({
				asyncHandler,
				logger,
				errors,
				db,
			});
		});
	});
}
