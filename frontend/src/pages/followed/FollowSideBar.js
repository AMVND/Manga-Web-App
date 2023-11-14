import React from "react";
import read from "../../assests/svg/Manga/book.svg";
export default function FollowSideBar() {
  return (
    <div className="h-48 lg:h-full rounded-lg bg-gray-200 px-0 lg:px-4">
      <div className="px-0 pt-1 lg:pt-4">
        <div className="flex flex-wrap">
          <div className="px-4 rounded-lg shadow-xl bg-white min-w-full lg:min-w-full">
            <div className="flex flex-row space-x-3">
              <img src={read} alt="read" className="h-6 lg:h-12 w-6 lg:w-12 my-5" />
              <div className="flex flex-col space-y-1">
                <h3 className="mt-1 lg:mt-4">
                  <a
                    href="/"
                    className="font-semibold text-dark hover:text-primary dark:text-white text-sm lg:text-lg truncate"
                  >
                    Tên của truyện dài vcl ra
                  </a>
                </h3>
                <span className="flex flex-row">
                  <p className="flex items-center justify-start w-28 sm:px-0 mb-4 mt-1 text-sm 
                font-medium">
                    Chap: <>41</>
                  </p>
                  <a
                    className="flex items-center justify-center w-24 sm:px-0 mb-4 mt-1 text-sm 
                font-medium transition duration-100  hover:text-purple-700"
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
        </div>
      </div>
    </div>
  );
}
