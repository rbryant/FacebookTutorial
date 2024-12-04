import React from "react";
import CreatePost from "./prayers/CreatePrayerRequest";
import LeftSidebar from "./LeftSidebar";
import Timeline from "./prayers/Timeline";
import RightSidebar from "./RightSidebar";
import Stories from "./prayers/Stories";

const Feed = () => {
  return (
    <div className="flex bg-[#f2f3f7] ">
      {/* LeftSidebar */}
      <LeftSidebar />
      
      <div className="mx-auto">
        {/* Stories 
        <Stories />*/}
        {/* CreatePost */}
        <CreatePost />
        {/* Posts */}
        <Timeline />
      </div>

      {/* RightSidebar <RightSidebar />*/}
      
    </div>
  );
};

export default Feed;
