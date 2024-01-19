import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChapterDropdown from './ChapterDropdown';
import axios from 'axios';
import LoadinIndicator from '../common/LoadinIndicator';

const ReadManga = () => {
  const { mangaId, chapterId } = useParams();
  const [chapterList, setChapterList] = useState([]);
  const [mangaDetails, setMangaDetails] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [serverInfo, setServerInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${mangaId}`);
        console.log('Manga Response:', mangaResponse.data);

        const serverInfoResponse = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
        console.log('Server Info Response:', serverInfoResponse.data);

        const chapterResponse = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
        console.log('Chapter Response:', chapterResponse.data);

        setMangaDetails(mangaResponse.data.data);
        setServerInfo(serverInfoResponse.data);
        setChapterContent(chapterResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().then(() => {
      console.log('Final Chapter Content:', chapterContent);
      console.log('Data Saver Array:', chapterContent?.attributes?.dataSaver);
    });
  }, [mangaId, chapterId]);


  // Fetch chapter content based on mangaId and chapterId
  useEffect(() => {
    const fetchChapterContent = async () => {
      try {
        const response = await axios.get(`https://api.mangadex.org/chapter/${chapterId}`);
        console.log('Chapter API Response:', response.data);

        const chapterData = response.data.data;
        setChapterContent(chapterData);
      } catch (error) {
        console.error('Error fetching chapter content:', error.response?.data || error.message);
        setChapterContent(null);
      }
    };

    fetchChapterContent();
  }, [chapterId]);

  if (!chapterContent || !mangaDetails || !serverInfo) {
    return <LoadinIndicator />;
  }

  return (
    <div className="container mt-4 flex flex-col lg:flex-row items-center mx-auto">
      {/* Chapter Dropdown */}
      <div className="my-4 w-full lg:w-1/3 mx-0 lg:mx-24">
        <ChapterDropdown chapterList={chapterList} mangaId={mangaId} />
      </div>
      <div className="mt-4">
        <h1>{`Chương ${chapterContent.attributes.chapter} - ${chapterContent.attributes.title}`}</h1>
        {/* Display chapter images */}
        {chapterContent && chapterContent.attributes ? (
          <div className="mt-8">
            {/* Log the entire chapterContent object */}
            {console.log('Final Chapter Content:', chapterContent)}

            {/* Check if dataSaver is present within attributes */}
            {chapterContent.attributes.dataSaver && chapterContent.attributes.dataSaver.length > 0 ? (
              <div>
                {/* Log the length of the dataSaver array */}
                {console.log('Data Saver Array Length:', chapterContent.attributes.dataSaver.length)}

                {/* Loop through each page in the chapter and display the images */}
                {chapterContent.attributes.dataSaver.map((page, index) => {
                  // Log the entire page object to inspect its structure
                  console.log('Page:', page);

                  // Confirm that the loop is being reached
                  console.log('Loop Index:', index);

                  // Construct the image URLs using the server information
                  const imageUrl = `${serverInfo}/data-saver/${page.attributes.hash}`;
                  console.log('Image URL:', imageUrl);

                  return (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Page ${index + 1}`}
                      className="max-w-full mt-4"
                    />
                  );
                })}
              </div>
            ) : (
              <div>No dataSaver information available.</div>
            )}
          </div>
        ) : (
          <div>Loading chapter content...</div>
        )}

      </div>
    </div>
  );
};

export default ReadManga;
