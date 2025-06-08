const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const apiKey = '53897624554e4216a5f1d20114d76cb7'; 
app.use(cors());

app.get('/api/news', async (req, res) => {
    const { q } = req.query;
    let url = q
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=100&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            console.error('NewsAPI error:', data);
            return res.status(response.status).json(data);
        }
        res.json(data);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(3000, () => console.log('Backend server running on http://localhost:3000'));