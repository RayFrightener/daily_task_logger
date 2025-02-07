/**Routes: HTTP requests made to the backend. 
 * Routes embed controllers, which handle the request logic. 
 * Routes use controllers. */
const express = require('express');
const formController = require('../controllers/formController');

const router = express.Router();

//post goal route
router.post('/submitGoal', formController.submitGoal);

//post log route
router.post('/submitLog', formController.submitLog);

//get goals route
router.get('/goals', formController.getGoals)

//get daily summary route
router.get('/dailySummary', formController.getDailySummary);

module.exports = router;