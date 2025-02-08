/**Services: Independent functions that perform database queries. 
 * They are used within controllers to handle data operations. 
 * Services perform database queries.*/

const pool = require('../db');


// CREATE TABLE goals (
//     id SERIAL PRIMARY KEY,  -- Unique ID for each goal
//     name TEXT UNIQUE NOT NULL -- Goal title (e.g., "Learn JavaScript")
// );

//**Follow this pattern:
// write service
// write controller
// write route
// integrate inside server.js
// write frontend */

//service to save goals into db
// define the async function, give a good name and 
// give data as an argument, 
// this data will be given from the controller(not sure)
exports.saveGoals = async (data) => {
    // destruct the needed data from the request
    const { name } = data;
    // write a query, here we are parameterizing the query
    const query = "INSERT INTO goals (name) VALUES ($1) RETURNING *";
    // the values ($1, $2, $3) etc 
    // that we want to add into the database
    const values = [name];
    // here we execute the query, 
    try {
        // write query result, await pool query
        // send query and values as arguments
        const result = await pool.query(query, values);
        // return the inserted row, rows must be returned thru
        // the result query
        return result.rows[0];
    } catch (error) {
        // catch error if there was a problem with inserting
        // the data
        console.error("Error savign goal:", error);
        throw error; // rethrow error to be handled by the caller
        // does this mean that it will be thrown to the frontend? or is the controller? 
    }
};

// CREATE TABLE logs (
//     id SERIAL PRIMARY KEY,
//     goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE, -- Links to a goal
//     duration FLOAT NOT NULL, -- Hours spent (e.g., 1.5 for 1 hour 30 min)
//     log_date DATE DEFAULT CURRENT_DATE -- Auto-fills with today’s date
// );
/** from the frontend we will get two things, 
 * a drop down that will be populated with the goals,
 * so the selected goal 
 * + entered time (float)
 * i want the goal selected to be entered, im not sure if i need to 
 * change table schema, should i have a, how do i deal with this?  
 * then i need
 */

//service to save daily logs into db
exports.saveLogs = async (data) => {
    const { name, duration } = data;

    try {
        const goalQuery = "SELECT id FROM goals WHERE name = $1";
        const goalResult = await pool.query(goalQuery, [name]);

        if (goalResult.rows.length === 0) {
            throw new Error(`Goal with name "${name}" not found`);
        }

        const goal_id = goalResult = goalResult.rows[0].id;

        //Insert the log entry
        const logQuery = "INSERT INTO logs (goal, duration) VALUES ($1, $2) RETURNING *";
        const logValues = [goal_id, duration];
        const logResult = await pool.query(logQuery, logValues);

        return logResult.rows[0];
} catch (error) {
    console.warn("Error saving logs:", error);
    throw error;
}
};

// Service to fetch all goals from db
exports.fetchGoals = async () => {
    const query = "SELECT id, name FROM goals";
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching goals:", error);
        throw error;
    }
};

//service to fetch daily summary from db
exports.fetchDailySummary = async () => {
    const summaryQuery = `
    SELECT 
        g.name AS goal_name,
        SUM(l.duration) AS total_duration
    FROM 
        goals g
    JOIN
        logs l ON g.id = l.goal_id
    WHERE 
        l.log_date = CURRENT_DATE
    GROUP BY
        g.name;
`;
    const totalDurationQuery = `
    SELECT
        SUM(l.duration) AS total_duration
    FROM 
        logs l
    WHERE
        l.log_date = CURRENT_DATE;
`;

    try {
        const summaryResult = await pool.query(summaryQuery);
        const totalDurationResult = await pool.query(totalDurationQuery);

        return {
            summary: summaryResult.rows,
            totalDuration: totalDurationResult.rows[0].total_duration
        };
    } catch (error) {
        console.error("Error fetching daily summary:", error);
        throw error;
    }
};


/**Future services:
 * - fetch weekly and monthly data for charting purposes
 */