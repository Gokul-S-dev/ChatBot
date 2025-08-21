require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Gemini API endpoint and key from .env
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ reply: 'No message provided.' });
    }
    
    if (!GEMINI_API_KEY) {
        console.error('No Gemini API key found');
        return res.status(500).json({ reply: 'API key not configured. Please add GEMINI_API_KEY to .env file.' });
    }
    
    try {
        console.log('Sending request to Gemini API...');
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            })
        });
        
        const data = await response.json();
        console.log('Gemini API response:', JSON.stringify(data, null, 2));
        
        if (!response.ok) {
            console.error('Gemini API error:', data);
            return res.status(500).json({ reply: 'API error: ' + (data.error?.message || 'Unknown error') });
        }
        
        if (!data.candidates || data.candidates.length === 0) {
            console.error('No candidates in response:', data);
            return res.status(500).json({ reply: 'No response generated from AI.' });
        }
        
        const reply = data.candidates[0].content.parts[0].text;
        console.log('Generated reply:', reply);
        res.json({ reply });
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ reply: 'Error connecting to Gemini API: ' + err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

