import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import events from './routes/events';
import config from './config.json';
import asyncHandler from 'express-async-handler';
import { version } from '../package.json';


let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

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
		asyncHandler
	}

	// internal middleware
	app.use(middleware(dependencies));

	// event router
	app.use('/', events(dependencies));

	//meta router for app info, current version etc
	app.use('/meta', (req, res, next) => {
		res.json({version})
	})

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
