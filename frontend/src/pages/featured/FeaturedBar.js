import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedBar = () => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        // Fetch a list of manga
        const mangaListResponse = await axios.get('https://api.mangadex.org/manga', {
          params: {
            limit: 8, // Adjust the limit as needed
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

            const coverData = coverResponse ? coverResponse.data.data : null;

            // Check if coverData is available before constructing the URL
            const coverImageUrl = coverData
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverData.attributes.fileName}`
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

    fetchMangaList();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Helper function to get the ID from the relationships array
  const getRelationshipId = (resource, relationshipType) => {
    const relationship = resource.relationships.find((rel) => rel.type === relationshipType);
    return relationship ? relationship.id : null;
  };

 
  return (
    <div className="container my-6 mx-auto px-2 md:px-8">
      <h1>Đọc nhiều nhất</h1>
      <Slider {...settings} className='flex flex-wrap -mx-1 lg:-mx-1'>
        {mangaList.map((manga) => (
          <div key={manga.mangaId} className=" my-1 px-2 w-1/2 lg:my-2 lg:px-4 lg:w-1/6 overflow-hidden rounded-lg shadow-lg">
            <br />
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
            <br />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedBar;
