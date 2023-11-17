import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import read from '../assests/svg/Manga/book.svg';

require("dotenv").config(); // Load environment variables

const MangaList = () => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get("https://api.mangadex.org/manga", {
          params: {
            limit: 20, // Adjust the limit as needed
          },

        });
        // Process manga details
        const mangaWithDetails = await Promise.all(
          response.data.data.map(async (manga) => {
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

            const coverData = coverResponse ? coverResponse.data.data : null;

            // Check if coverData is available before constructing the URL
            const imageSize = '256p'; // Change this to the desired size ('256p', '512p', etc.)
            const coverImageUrl = coverData
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverData.attributes.fileName}?size=${imageSize}`
              : null;

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

    fetchManga();
  }, []);

  // Helper function to get the ID from the relationships array
  const getRelationshipId = (resource, relationshipType) => {
    const relationship = resource.relationships.find((rel) => rel.type === relationshipType);
    return relationship ? relationship.id : null;
  };

  return (
    <div className="container my-6 mx-auto px-2 md:px-8">
      <h1>MANGA LIST</h1>
      <div className="flex flex-wrap -mx-1 lg:-mx-1 ">
        {mangaList.map((manga) => (
          <div key={manga.mangaId} className=" my-1 px-2 lg:my-2 lg:px-4  w-1/2 lg:w-1/5 overflow-hidden rounded-lg shadow-lg">
            <br />
            <Link to={`/manga/${manga.mangaId}`}>
              {manga.coverImageUrl && (
                <img
                  className="block h-32 w-full object-contain ease-in-out duration-300 hover:scale-150"
                  src={manga.coverImageUrl}
                  alt={`Cover for ${manga.title}`}
                />
              )}

              <br />
              <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                <h2 className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-blue-600">
                  {manga.title}
                </h2>
              </div>
              {/* Add more details as needed */}
              <p className="text-grey-darker text-sm">
                Chapter: {manga.lastChapter}
              </p>
              <div className="flex items-center justify-between leading-none md:p-4 ml-0 text-sm">
                {/* Convert tags object to a comma-separated string */}

                <p className="pb-0">
                  <a
                    className="flex items-center justify-center py-1 w-24 sm:px-0 text-xs/[17px]
                font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 
                hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-grey-300"
                    href={`manga/${manga.mangaId}`}
                    rel="noopener noreferrer"
                  >
                    <img
                      className="h-5 pr-1"
                      src={read}
                      alt="test test"
                    />
                    Đọc truyện
                  </a>
                </p>
              </div>
            </Link>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaList;
