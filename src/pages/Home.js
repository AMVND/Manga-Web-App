import React, {useEffect} from "react";
import MangaList from "../manga/MangaList";
import Weather from "./weather/Weather";

export default function Home() {

   return (
    <div className="container my-6 mx-auto px-2 md:px-8 rounded-lg dark:bg-gray-900">
      <div className="w-full">
        {/* <TopBar/> */}
        <Weather/>
      </div>

      <div className=" flex flex-wrap flex-col lg:flex-row-reverse -mx-1 lg:-mx-1 my-1 px-2 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="w-full lg:w-1/4">
          {/* <SideBar/> */}
        Thông tin game
        </div>
        <div className="w-full lg:w-3/4 ">
          {/* TRUYỆN ĐỂ Ở ĐÂY */}
          <MangaList />
        </div>
      </div>
    </div>
  );
}
