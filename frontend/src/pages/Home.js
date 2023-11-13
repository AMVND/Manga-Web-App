import React from "react";
import FeaturedBar from "./featured/FeaturedBar";
import LastestBar from "./lastest/LastestBar";
import FollowSideBar from "./followed/FollowSideBar";
import BreadCrumbs from "./breadcrumbs/BreadCrumbs";
import MangaList from "../manga/MangaList";

export default function Home() {
  return (
    <div className="h-full bg-gray-200 p-2">
      <div className=" m-auto grid gap-4 grid-cols-4 flex flex-wrap bg-white rounded-lg shadow-xl pt-6 px-8 ">
        <div className="m-auto grid col-span-3">
          {/* <BreadCums/> */}
          <BreadCrumbs />

          {/* <FeaturedBar/> */}
          <FeaturedBar />

          {/* <LastestBar/> */}
          <LastestBar />

          {/* TRUYỆN ĐỂ Ở ĐÂY */}
          <MangaList />
        </div>

        <div className="grid row-span-2">
          {/* <FollowSideBar/> */}
          <FollowSideBar />
        </div>
      </div>
    </div>
  );
}
