import React, { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config(); // Load environment variables

const MangaDetails = () => {
  const apiKey = process.env.REACT_APP_MANGADEX_API_KEY; // Replace with your MangaDex API key
  const popularNewTitlesUrl = 'https://api.mangadex.org/';

  const [popularNewTitles, setPopularNewTitles] = useState([]);

  useEffect(() => {
    const fetchPopularNewTitles = async () => {
      try {
        const response = await axios.get(popularNewTitlesUrl, {
          headers: { 'Authorization': `Bearer ${apiKey}` },
          params: {
            order: 'popularity',
            limit: 10, // You can adjust the limit based on your requirements
          },
        });
        setPopularNewTitles(response.data.data);
      } catch (error) {
        console.error('Error fetching popular new titles:', error);
      }
    };

    fetchPopularNewTitles();
  }, [popularNewTitlesUrl, apiKey]);

  if (popularNewTitles.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Popular New Titles</h1>
      <div>
        {popularNewTitles.map((manga) => (
          <div key={manga.id}>
            <h2>{manga.attributes.title.en}</h2>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaDetails;