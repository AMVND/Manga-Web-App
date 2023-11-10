import React from 'react'
import FeaturedBar from './featured/FeaturedBar';
import LastestBar from './lastest/LastestBar';
import FollowSideBar from './followed/FollowSideBar';
import BreadCums from './BreadCums';

export default function Home() {
  return (
    <div className="h-full bg-gray-200 p-8">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <BreadCums/>
        <FeaturedBar/>
        <LastestBar/>
        <FollowSideBar/>
        {/* TRUYỆN ĐỂ Ở ĐÂY */}
      </div>
    </div>
  )
}