/**Controllers: Functions executed when an HTTP request 
 * (such as POST or GET) is made. 
 * They act as middlemen between the HTTP request and database querying, 
 * often using services to perform the actual data operations. 
 * Controllers use services. */
const formService = require('../services/formServices');

//submit goal controller
exports.submitGoal = async (req, res) => {
    try {
        const data = req.body;
        const savedGoal = await formService.saveGoals(data);
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).send('Error saving goal');
    }
};

//save log controller
exports.submitLog = async (req, res) => {
    try {
        const data = req.body;
        const savedLog = await formService.saveLogs(data);
        res.status(201).json(savedLog);
    } catch (error) {
        res.status(500).send('Error saving log');
    }
};

//fetch goals controller
exports.getGoals = async (req, res) => {
    try {
        const goals = await formService.fetchGoals();
        res.status(201).json(goals);
    } catch (error) {
        res.status(500).send('Error fetching goals');
    }
}

//fetch daily summary controller

exports.getDailySummary = async (req, res) => {
    try {
        const dailySummary = await formService.fetchDailySummary();
        res.status(201).json(dailySummary)
    } catch (error) {
        res.status(500).send('Error fetching daily summary');
    }
}

//fetch data for monthly and weekly charts 