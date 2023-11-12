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
    <div className="container px-4">
      <h1>MANGA LIST</h1>
      <div className="container grid  grid-cols-4 px-4 gap-12 justify-evenly content-evenly ">
        {mangaList.map((manga) => (
          <div key={manga.id} className="m-2 max-h-96">
            <br />
            <img src={read} alt="Manga_cover" className="justify-evenly content-evenly"/>
            <br />
            <h2>{manga.attributes.title.en}</h2>
             {/* Add more details as needed */}
            <div className="w-96 text-xs text-justify">
                {/* Convert tags object to a comma-separated string */}
              <p>
                Chapter: {manga.attributes.lastChapter}
              </p>
                <a
                  className="flex items-center justify-center py-3 w-28 sm:px-0 text-sm 
                font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 
                hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
                  href={manga.attributes.links.raw}
                  target="_blank"
                  rel="noopener noreferrer"
                > 
                  <img
                    className="h-5"
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
