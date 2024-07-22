const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 3001;

// CORS configuration - Move this before other middleware
app.use(cors({
    origin: `http://localhost:${process.env.PORT || 3000}`,
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../build')));

// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// GitHub OAuth callback route
app.get('/reviewer-signup/complete', async (req, res) => {
    // ... (keep the existing code for this route)
});

async function fetchGitHubData(accessToken) {
    // ... (keep the existing code for this function)
}

async function fetchContributions(username) {
    // ... (keep the existing code for this function)
}

// New endpoint for handling reviewer signup
app.post('/api/reviewer-signup', async (req, res) => {
    try {
        console.log('Received reviewer signup:', req.body);
        
        // Convert top_languages string to an array
        const topLanguagesArray = req.body.top_languages ? req.body.top_languages.split(',') : [];

        // Insert the data into the database
        const query = `
            INSERT INTO reviewers (
                name, github, skills, availability, email, discord_handle, 
                github_username, github_url, top_languages, total_contributions, public_repositories
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        
        const values = [
            req.body.name,
            req.body.github_username, // Using github_username for the 'github' column
            req.body.top_languages,   // This will be used for 'skills' (text column)
            req.body.availability,
            req.body.email,
            req.body.discordHandle,
            req.body.github_username,
            req.body.github_url,
            topLanguagesArray,        // This is now an array for top_languages
            req.body.total_contributions,
            req.body.public_repositories
        ];

        console.log('Executing query with values:', values);

        const result = await pool.query(query, values);
        
        console.log('Inserted new reviewer:', result.rows[0]);
        
        res.status(200).json({ message: 'Signup successful', reviewer: result.rows[0] });
    } catch (error) {
        console.error('Error processing reviewer signup:', error);
        console.error('Error details:', error.message);
        if (error.stack) console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});