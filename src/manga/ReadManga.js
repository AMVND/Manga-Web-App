// ReadManga.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadManga = ({ match }) => {
  const { mangaId, chapterId } = match.params;
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        const response = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
        setChapter(response.data.data);
      } catch (error) {
        console.error('Error fetching chapter details:', error);
      }
    };

    fetchChapterDetails();
  }, [chapterId]);

  if (!chapter || !chapter.attributes || !chapter.attributes.data) {
    return <div>Loading...</div>;
  }

  // Ensure that data is available before accessing it
  const pages = chapter.attributes.data;

  return (
    <div>
      <h1>{`Reading ${mangaId}, Chapter ${chapter.attributes.chapter}`}</h1>
      {pages.map((page, index) => (
        <img key={index} src={`https://uploads.mangadex.org/data/${page}`} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default ReadManga;