import React, { useState, useEffect } from "react";
import axios from "axios";


require("dotenv").config(); // Load environment variables

const FollowSideBar = () => {

  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        // Determine the screen width
        const screenWidth = window.innerWidth;

        // Adjust the limit based on screen width
        const limit = screenWidth < 768 ? 3 : 6;

        // Fetch manga data with the adjusted limit
        const response = await axios.get('https://api.mangadex.org/manga', {
          params: {
            limit,
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
    <div className="h-auto rounded-lg bg-gray-200 px-0 lg:px-4 dark:bg-gray-900">
      <div className="px-0 pt-2 lg:py-4">
        <div className="flex flex-col space-y-4">
          {mangaList.map((manga) => (
            <div key={manga.mangaId} className="  py-1 rounded-lg shadow-xl  min-w-full bg-white dark:bg-gray-900">
              <div className="flex flex-row space-x-3 pl-2">
                {manga.coverImageUrl && (
                  <img
                    className="h-16 lg:h-20 w-8 lg:w-14 my-5"
                    src={manga.coverImageUrl}
                    alt={`Cover for ${manga.title}`}
                  />
                )}

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h2 className="text-md overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-blue-600 line-clamp-1 dark:text-white">
                      <a href={`manga/${manga.mangaId}`} className="truncate">
                        {manga.title}
                      </a>
                    </h2>
                  </div>
                  <span className="flex flex-row">
                    <p className="flex items-center justify-start w-28 sm:px-0 mb-4 mt-1 text-sm font-medium dark:text-white">
                      Chapter: {manga.lastChapter}
                    </p>

                    <a
                      className="flex items-center justify-center w-24 sm:px-0 mb-4 mt-1 text-sm 
                font-medium transition duration-100  hover:text-purple-700 dark:text-white"
                      href="/"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Đọc tiếp
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))
          }
          <a
            className="w-auto sm:px-0 mb-4 mt-1 text-sm flex justify-end
                      font-medium transition duration-100  hover:text-orange-400"
            href="/follow"
            rel="noopener noreferrer"
          >
            {" "}
            Xem thêm
          </a>
        </div>
      </div>
    </div>
  );
}

export default FollowSideBar;