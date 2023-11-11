import React, { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config(); // Load environment variables

const MangaDetails = () => {
    const apiKey = process.env.REACT_APP_MANGADEX_API_KEY; // Use environment variable
    const apiUrl = 'https://api.mangadex.org/manga';

  const [mangaList, setMangaList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: { 'Authorization': `Bearer ${apiKey}` },
        });
        setMangaList(response.data.data);
      } catch (error) {
        console.error('Error fetching manga list:', error);
      }
    };

    fetchData();
  }, [apiUrl, apiKey]);

  if (!mangaList) {
    return <p>Loading...</p>;
  }

  // Display the list of manga or use it as needed
  return (
    <div>
      <h1>Manga List</h1>
      <ul>
        {mangaList.map(manga => (
          <li key={manga.id}>
            {manga.attributes.title.en}
            {/* Add more details or links to individual manga pages */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaDetails;
