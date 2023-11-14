import React, { useState, useEffect } from "react";
import axios from "axios";
import read from '../assests/svg/Manga/book.svg';

require("dotenv").config(); // Load environment variables

const MangaList = () => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get("https://api.mangadex.org/manga", {
          params: {
            limit: 12, // Adjust the limit as needed
          },
          
        });
        
        setMangaList(response.data.data);
      } catch (error) {
        console.error("Error fetching manga:", error);
      }
    };

    fetchManga();
  }, []);

  return (
    <div className="container my-6 mx-auto px-2 md:px-8">
      <h1>MANGA LIST</h1>
      <div className="flex flex-wrap -mx-1 lg:-mx-1 ">
        {mangaList.map((manga) => (
          <div key={manga.id} className=" my-1 px-2 w-full w-1/2 lg:my-2 lg:px-4 lg:w-1/4 overflow-hidden rounded-lg shadow-lg">
            <br />
            <img src={read} alt="Manga_cover" className="block h-32 w-full  ease-in-out duration-300 hover:scale-150"/>
            <br />
            <h2 className="flex items-center justify-between leading-tight p-2 md:p-4 text-lg truncate hover:text-blue-600" >{manga.attributes.title.en}</h2>
             {/* Add more details as needed */}
            <div className="flex items-center justify-between leading-none md:p-4 ml-0 text-sm">
                {/* Convert tags object to a comma-separated string */}
              <p className="pb-2 text-grey-darker text-sm">
                Chapter: {manga.attributes.lastChapter}
              </p>
              <p className="pb-2">
                <a
                  className="flex items-center justify-center py-1 w-24 sm:px-0 text-xs/[17px]
                font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 
                hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-grey-300"
                  href={manga.attributes.links.raw}
                  target="_blank"
                  rel="noopener noreferrer"
                > 
                  <img
                    className="h-5 pr-1"
                    src={read}
                    alt={manga.attributes.links.raw}
                  />
                  Đọc truyện
                </a>
                </p>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaList;
