import createError from 'http-errors';

export default {
	generalError: (context) => (createError(
		500,
		'an error has happened',
		{
			description: 'an unforseen error has happened',
			expose: (process.env.NODE_ENV !== 'development'),
			context
		}
	)),
	alreadyRegistered: (context) => (createError(
		409,
		'Conflict',
		{
			description: 'user already exists',
			expose: (process.env.NODE_ENV !== 'development'),
			context
		}
	)),
	errorhashing: (context) => (createError(
		500,
		'InternalError',
		{
			description: 'user already exists',
			expose: (process.env.NODE_ENV !== 'development'),
			context
		}
	)),
};