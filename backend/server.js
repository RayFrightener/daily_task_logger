require('dotenv').config();
const express = require('express');
const pool = require('db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define your routes here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});