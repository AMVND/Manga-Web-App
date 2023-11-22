import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MangaDetails = ({ match }) => {
  const [mangaDetails, setMangaDetails] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [chapterList, setChapterList] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English

  const fetchCoverImage = async (manga) => {
    const coverId = getRelationshipId(manga, 'cover_art');

    if (coverId) {
      try {
        const coverResponse = await axios.get(`https://api.mangadex.org/cover/${coverId}`);
        const coverData = coverResponse.data.data;

        const imageSize = '256p'; // Change this to the desired size ('256p', '512p', etc.)
        const imageUrl = coverData
          ? `https://uploads.mangadex.org/covers/${manga.id}/${coverData.attributes.fileName}?size=${imageSize}`
          : null;

        setCoverImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching cover details:', error);
      }
    }
  };

  const getRelationshipId = (resource, relationshipType) => {
    const relationships = resource.relationships || [];
    const relationship = relationships.find((rel) => rel.type === relationshipType);
    return relationship ? relationship.id : null;

  };

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const mangaId = match.params.mangaId;
        const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
        const manga = mangaResponse.data.data;

        setMangaDetails(manga);

        fetchCoverImage(manga);

        // Fetch chapter list
        const chapterResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`);
        const chapters = chapterResponse.data.data;

        // Extract available languages from the chapter list
        const languages = Array.from(
          new Set(chapters.map((chapter) => chapter.attributes.translatedLanguage))
        );

        setAvailableLanguages(languages);

        // Filter chapters based on selected language
        const filteredChapters = chapters.filter(
          (chapter) => chapter.attributes.translatedLanguage === selectedLanguage
        );

        // Sort filtered chapters in descending order based on chapter number
        filteredChapters.sort((a, b) => b.attributes.chapter - a.attributes.chapter);

        setChapterList(filteredChapters);
      } catch (error) {
        // Handle errors
      }
    };

    fetchMangaDetails();
  }, [match.params.mangaId, selectedLanguage]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="relative">
      {/* Blurry background image */}
      <img
        src={coverImageUrl}
        alt={`Cover for ${mangaDetails?.attributes?.title?.en || 'No Title'}`}
        className="w-full h-10vh sm:h-full object-cover blur-sm absolute inset-0 z-0"
      />

      <div className="container mx-auto mt-8 flex flex-col sm:flex-row relative z-10">
        {/* Left side with medium-sized cover image */}
        <div className=" w-1/2 lg:w-full h-400 sm:h-auto relative mb-0 lg:mb-4">
          <img
            src={coverImageUrl}
            alt={`Cover for ${mangaDetails?.attributes?.title?.en || 'No Title'}`}
            className="w-full object-cover"
          />
        </div>

        {/* Right side with details and overlay */}
        <div className=" container w-full mt-4 lg:mt-48 ml-0 text-blue-800 relative">
          {/* Semi-transparent overlay */}
          <h1 className="text-4xl font-bold mb-4">
            {mangaDetails?.attributes?.title?.en || 'No Title'}
          </h1>
          <p className="text-lg mb-4">
            {mangaDetails?.attributes?.description?.en || 'No description available'}
          </p>

          {/* Additional Information */}
          {mangaDetails?.attributes && (
            <>
              {/* Additional Information */}
              <div className="mb-4">
                <p className="text-black font-bold">Original Language:</p>
                <p>{mangaDetails.attributes.originalLanguage || 'Unknown'}</p>
              </div>

              <div className="mb-4">
                <p className="text-black font-bold">Last Volume:</p>
                <p>{mangaDetails.attributes.lastVolume || 'Unknown'}</p>
              </div>

              <div className="mb-4">
                <p className="text-black font-bold">Last Chapter:</p>
                <p>{mangaDetails.attributes.lastChapter || 'Unknown'}</p>
              </div>

              <div className="mb-4">
                <p className="text-black font-bold">Publication Demographic:</p>
                <p>{mangaDetails.attributes.publicationDemographic || 'Unknown'}</p>
              </div>

              <div className="mb-4">
                <p className="text-black font-bold">Status:</p>
                <p>{mangaDetails.attributes.status || 'Unknown'}</p>
              </div>

              <div className="mb-4">
                <p className="text-black font-bold">Year:</p>
                <p>{mangaDetails.attributes.year || 'Unknown'}</p>
              </div>

              <div className="mb-4">
                <p className="text-black font-bold">Content Rating:</p>
                <p>{mangaDetails.attributes.contentRating || 'Unknown'}</p>
              </div>

              <div className="mb-4">
                <p className="text-black font-bold">Chapter Numbers Reset on New Volume:</p>
                <p>{mangaDetails.attributes.chapterNumbersResetOnNewVolume ? 'Yes' : 'No'}</p>
              </div>

              {/* Button to read the latest chapter */}
              {mangaDetails?.attributes?.latestUploadedChapter && (
                <a
                  href={`/chapter/${mangaDetails.attributes.latestUploadedChapter}`}
                  className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md inline-block"
                  rel="noopener noreferrer"
                >
                  Read Latest Chapter
                </a>
              )}
            </>
          )}

          {/* Tags */}
          {mangaDetails?.attributes?.tags && (
            <div className="mb-4">
              <p className="text-white font-semibold">Tags:</p>
              <div className="flex flex-wrap">
                {mangaDetails.attributes.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-white bg-gray-600 p-2 m-1 rounded-lg text-lg"
                  >
                    {tag.attributes.name.en}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Chapter */}
          {mangaDetails?.attributes?.tags && (
            <div className="mb-4">



              {/* Language selection */}
              <div>
                <label htmlFor="language">Select Language:</label>
                <select
                  id="language"
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {/* Generate options dynamically based on available languages */}
                  {availableLanguages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>



              <p className="text-white font-semibold">Danh sách chapter:</p>
              <ul className='max-w-md divide-y divide-gray-200 dark:divide-gray-700'>
                {chapterList.map((chapter) => (
                  <li key={chapter.id} className='pb-3 sm:pb-4'>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Chapter {chapter.attributes.chapter}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {chapter.attributes.title}
                        </p>
                      </div>
                    </div>
                    {/* Add other chapter details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
        <div className="bg-white w-full absolute inset-0 -z-50 mt-48"></div>
      </div>
    </div>
  );
};

export default MangaDetails;
