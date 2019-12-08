const router = require('express').Router();
const EventController = require('../controllers/EventController');

router.route('/').post(EventController.addJobsEvent);
router.route('/').get(EventController.getEvents);

