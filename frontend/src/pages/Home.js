import React from "react";
import FeaturedBar from "./featured/FeaturedBar";
import LastestBar from "./lastest/LastestBar";
import FollowSideBar from "./followed/FollowSideBar";
import BreadCrumbs from "./breadcrumbs/BreadCrumbs";
import MangaList from "../manga/MangaList";

export default function Home() {
  return (
    <div className="container my-6 mx-auto px-2 md:px-8 ">
      {/* <BreadCums/> */}
      <BreadCrumbs />

      {/* <FeaturedBar/> */}
      <FeaturedBar />

      {/* <LastestBar/> */}
      <LastestBar />
      <div className=" flex flex-wrap flex-col lg:flex-row-reverse -mx-1 lg:-mx-1 my-1 px-2 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="w-full lg:w-1/4">
          {/* <FollowSideBar/> */}
          <FollowSideBar />
        </div>
        <div className="w-full lg:w-3/4">
          {/* TRUYỆN ĐỂ Ở ĐÂY */}
          <MangaList />
        </div>
      </div>
    </div>
  );
}
