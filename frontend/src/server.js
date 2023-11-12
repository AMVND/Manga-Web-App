const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config(); // Load environment variables

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

const apiKey = process.env.REACT_APP_MANGADEX_API_KEY 

app.post('/manga', async (req, res) => {
  try {
    const mangaListResponse = await axios.get('https://api.mangadex.org/manga', {
      headers: {
        Authorization: apiKey // Replace with your MangaDex API key
      },
      params: {
        limit: 10,
      },
    });

    res.json(mangaListResponse.data);
  } catch (error) {
    console.error('Error fetching manga:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});