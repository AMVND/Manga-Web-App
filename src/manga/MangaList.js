import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const MangaList = () => {
  const [mangaList, setMangaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMangaList = async (page) => {
    try {
      // Fetch manga list for the specified page
      const response = await axios.get('https://api.mangadex.org/manga', {
        params: {
          limit: 20,
          offset: (page - 1) * 10, // Adjust the offset based on the current page
        },
      });

      // Update state with fetched manga list and total pages
      setMangaList(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 10));

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

  useEffect(() => {
    console.log('Current Page:', currentPage); // Log the current page
    fetchMangaList(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    // Update the current page when a new page is selected
    setCurrentPage(newPage);
  };

  // Helper function to get the ID from the relationships array
  const getRelationshipId = (resource, relationshipType) => {
    const relationship = resource.relationships.find((rel) => rel.type === relationshipType);
    return relationship ? relationship.id : null;
  };

  return (
    <div className="bg-white rounded-lg px-4 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">Danh sách Manga</h2>
        <div className="mt-6 grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {mangaList.map((manga) => (
            <Link to={`/manga/${manga.mangaId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div key={manga.mangaId} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  {manga.coverImageUrl && (
                    <img
                      src={manga.coverImageUrl}
                      alt={`Cover for ${manga.title}`}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full object-contain ease-in-out duration-300 hover:scale-150"
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-between ">
                    <p className="text-gray-700 dark:text-white truncate md:text-clip ">
                      {manga.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-white truncate md:text-clip">Chapter: {manga.lastChapter || 'Unknown'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Add more items as needed */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Trước
        </button>
        <span className="text-gray-900 dark:text-white">{currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default MangaList;