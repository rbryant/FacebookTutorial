import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase.js";
import Request from "./Request.js";
import {
  fetchFriendsRequests,
  fetchSharedRequests,
  fetchGroupRequests,
  fetchUserRequests,
} from "../../functions/fetchFunctions.js";
import { useSessionContext } from "../context/SessionContext.js";

const Timeline = () => {
  const [requests, setRequests] = useState([]);
  const { session, loading } = useSessionContext();

  useEffect(() => {
    const loadRequests = async () => {
      if (session && session.user) {
        const userId = session;
        console.log("userId is ", userId);

        const [friendsRequests, sharedRequests, groupRequests, userRequests] =
          await Promise.all([
            fetchFriendsRequests(userId),
            fetchSharedRequests(userId),
            fetchGroupRequests(userId),
            fetchUserRequests(userId),
          ]);
        const allRequests = [
          ...friendsRequests,
          ...sharedRequests,
          ...groupRequests,
          ...userRequests,
        ];
        setRequests(allRequests);
      }
    };
    loadRequests();
  }, [session]);

  return (
    <div className="w-screen sm:w-full">
      <div className="my-6 max-w-[25rem] sm:max-w-[33rem] mx-auto">
        {requests.map((request) => (
          <Request
            key={request.id}
            id={request.id}
            username={request.username}
            userImg={request.profileImg}
            img={request.image}
            caption={request.caption}
            sharedby={request.sharedBy}
            timestamp={request.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
