import React from 'react'
import FeaturedBar from './featured/FeaturedBar';
import LastestBar from './lastest/LastestBar';
import FollowSideBar from './followed/FollowSideBar';
import BreadCrumbs from './breadcrumbs/BreadCrumbs';
import MangaDetails from '../manga/MangaDetails';

export default function Home() {
  return (
    <div className="h-full bg-gray-200 p-2">
      {/* <BreadCums/> */}
      <BreadCrumbs/>
      <div className="bg-white rounded-lg shadow-xl pb-4">
        {/* <FollowSideBar/> */}
        <FollowSideBar/>
        <div>
          <FeaturedBar/>
          {/* <FeaturedBar/> */}
          <LastestBar/>
          {/* <LastestBar/> */}
          {/* TRUYỆN ĐỂ Ở ĐÂY */}
          <MangaDetails />
        </div>
      </div>
    </div>
  )
}