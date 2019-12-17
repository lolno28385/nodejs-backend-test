import createError from 'http-errors';

export default {
	generalError: (context) => (createError(
		500,
		'an internal error has happened',
		{
			description: 'an unforseen error has happened',
			expose: (process.env.NODE_ENV !== 'development'),
			context
		}
	)),
	alreadyRegistered: (context) => (createError(
		409,
		'can not process request',
		{
			description: 'this user has already registered',
			expose: (process.env.NODE_ENV !== 'development'),
			context
		}
	)),
	errorhashing: (context) => (createError(
		500,
		'an internal error has happened',
		{
			description: 'user already exists',
			expose: (process.env.NODE_ENV !== 'development'),
			context
		}
	)),
	userNotFound: (context) => (createError(
		404,
		'can not process request',
		{
			description: 'user does not exist',
			expose: (process.env.NODE_ENV !== 'development'),
			context
		}
	)),
};