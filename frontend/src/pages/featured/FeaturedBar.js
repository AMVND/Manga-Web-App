import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedBar = () => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        // Fetch a list of manga
        const mangaListResponse = await axios.get('https://api.mangadex.org/manga', {
          params: {
            limit: 10, // Adjust the limit as needed
          },
        });

        // Process manga details
        const mangaWithDetails = await Promise.all(
          mangaListResponse.data.data.map(async (manga) => {
            // Extract author details
            const authorId = getRelationshipId(manga, 'author');
            const authorResponse = authorId ? await axios.get(`https://api.mangadex.org/author/${authorId}`) : null;
            const author = authorResponse ? authorResponse.data.data.attributes.name : 'Unknown Author';

            // Extract artist details
            const artistId = getRelationshipId(manga, 'artist');
            const artistResponse = artistId ? await axios.get(`https://api.mangadex.org/author/${artistId}`) : null;
            const artist = artistResponse ? artistResponse.data.data.attributes.name : 'Unknown Artist';

            // Initialize cover ID to null
            let coverId = null;

            // Check relationships for different types
            manga.relationships.forEach((relationship) => {
              if (relationship.type === 'cover_art') {
                coverId = relationship.id;
              }
              // Add more conditions as needed for other relationship types
            });
            

            // Fetch cover details directly using the /cover/{coverId} endpoint
            const coverResponse = coverId
              ? await axios.get(`https://api.mangadex.org/cover/${coverId}`)
              : null;

            const coverData = coverResponse ? coverResponse.data.data[0] : null;

            // Check if coverData is available before constructing the URL
            const coverImageUrl = coverData
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverData.attributes.fileName}`
              : null;


            console.log('Cover Data:', coverData);
            console.log('Cover ID:', coverId);

            return {
              mangaId: manga.id,
              title: manga.attributes.title.en,
              author,
              artist,
              coverImageUrl,
              // Add other manga details as needed
            };
          })
        );

        setMangaList(mangaWithDetails);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      }
    };

    fetchMangaList();
  }, []);

  // Helper function to get the ID from the relationships array
  const getRelationshipId = (resource, relationshipType) => {
    const relationship = resource.relationships.find((rel) => rel.type === relationshipType);
    return relationship ? relationship.id : null;
  };

  return (
    <div>
      <h1>Manga List with Details</h1>
      <ul>
        {mangaList.map((manga) => (
          <li key={manga.mangaId}>
            <h2>{manga.title}</h2>
            <p>Author: {manga.author}</p>
            <p>Artist: {manga.artist}</p>
            {manga.coverId && (
              <img
                src={`https://uploads.mangadex.org/covers/${manga.mangaId}/${manga.coverId}.jpg`}
                alt={`Cover for ${manga.title}`}
              />
            )}
            {/* Add other manga details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedBar;
