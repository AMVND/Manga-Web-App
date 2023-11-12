import React, { useState, useEffect } from "react";
import axios from "axios";
import read from '../assests/svg/Manga/book.svg';

require("dotenv").config(); // Load environment variables

const MangaDetails = () => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get("https://api.mangadex.org/manga", {
          params: {
            limit: 1, // Adjust the limit as needed
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
      <div className="container px-4">
        {mangaList.map((manga) => (
          <div key={manga.id} className="h-48">
            <br />
            <img src={read} alt="Manga_cover"/>
            <br />
            <h2>{manga.attributes.title.en}</h2>
             {/* Add more details as needed */}
            <div className="w-full text-xs text-justify text-eclisie">
              <div>
              {manga.attributes.description.en}
              </div>
                <a
                  className="flex items-center justify-center py-2 w-28 sm:px-0 mt-2 mb-4 text-sm 
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
            <div>
              {/* Convert tags object to a comma-separated string */}
              <p>
                Thể loại:{" "}
                {manga.attributes.tags
                  .map((tag) => tag.attributes.name.en)
                  .join(", ")}
              </p>
              <p>
                Chapter mới nhất: {manga.attributes.lastChapter} <br />
                Cập nhật lúc: {manga.attributes.updatedAt}
              </p>
              <p>Trạng thái: {manga.attributes.state}</p>
              <p>Năm: {manga.attributes.year}</p>
            </div>
            <br />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaDetails;
