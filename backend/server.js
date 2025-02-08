/**The server is the main place, whih serves the clients with their requests. 
 * Everything can be in the server. The controllers, routes and
 * services, but to make the server code more modular for scalability 
 * and better maintanability things are put inside their 
 * respective files such as controllers, routes and services.
 * 
 */
require("dotenv").config();
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser'); 
const path = require('path');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
// process.env.DATABASE_URL

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Define your route here
app.use('/api/forms', formRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});