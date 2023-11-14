import React, { useState, useEffect } from "react";
import axios from "axios";
import read from "../../assests/svg/Manga/book.svg";

require("dotenv").config(); // Load environment variables

const FollowSideBar = () => {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get("https://api.mangadex.org/manga", {
          params: {
            limit: 3, // Adjust the limit as needed
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
    <div className="h-auto rounded-lg bg-gray-200 px-0 lg:px-4">
      <div className="px-0 pt-2 lg:py-4">
        <div className="flex flex-col space-y-4">
          {mangaList.map((manga) => (
            <div key={manga.id} className="  py-1 rounded-lg shadow-xl  min-w-full bg-white">
              <div className="flex flex-row space-x-3 pl-2">
                <img src={read} alt="read" className="h-4 lg:h-12 w-4 lg:w-12 my-5 " />
                <div className="flex flex-col space-y-1 truncate">
                  <h3 className="mt-1 lg:mt-4 truncate hover:text-blue-600">
                    <a
                      href="/"
                      className="font-semibold text-dark hover:text-primary dark:text-white text-sm lg:text-lg truncate "
                    >
                      {manga.attributes.title.en}
                    </a>
                  </h3>
                  <span className="flex flex-row">
                    <p className="flex items-center justify-start w-28 sm:px-0 mb-4 mt-1 text-sm 
                font-medium">
                      Chap: <>{manga.attributes.lastChapter}</>
                    </p>
                    <a
                      className="flex items-center justify-center w-24 sm:px-0 mb-4 mt-1 text-sm 
                font-medium transition duration-100  hover:text-purple-700"
                      href={manga.attributes.links.raw}
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