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
    <div className="container px-2 md:px-4">
      <h1>MANGA LIST</h1>
      <div className="container grid grid-cols-2 md:grid-cols-4 grid-flow-dense px-2 md:px-4 gap-4 md:gap-12 justify-evenly content-evenly inline-block align-middle  ">
        {mangaList.map((manga) => (
          <div key={manga.id} className="m-2 max-h-48 md:max-h-96">
            <br />
            <img src={read} alt="Manga_cover" className="justify-evenly content-evenly"/>
            <br />
            <h2 className="text-sm/[17px] font-bold truncate line-clamp-3" >{manga.attributes.title.en}</h2>
             {/* Add more details as needed */}
            <div className="w-96 text-xs text-justify pt-2">
                {/* Convert tags object to a comma-separated string */}
              <p className="pb-4">
                Chapter: {manga.attributes.lastChapter}
              </p>
                <a
                  className="flex items-center justify-center py-1 w-28 sm:px-0 text-xs/[17px]
                font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 
                hover:bg-blue-500 hover:text-white focus:ring-4 focus:ring-grey-300"
                  href={manga.attributes.links.raw}
                  target="_blank"
                  rel="noopener noreferrer"
                > 
                  <img
                    className="h-5 pr-2"
                    src={read}
                    alt={manga.attributes.links.raw}
                  />
                  Đọc truyện
                </a>
            </div>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaList;
