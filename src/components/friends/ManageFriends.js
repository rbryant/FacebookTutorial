import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

const ManageFriends = ({ userId }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const requestsQuery = query(
      collection(db, "friends"),
      where("user2", "==", userId),
      where("status", "==", "pending")
    );
    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      setFriendRequests(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    const friendsQuery = query(
      collection(db, "friends"),
      where("user1", "==", userId),
      where("status", "==", "accepted")
    );
    const unsubscribeFriends = onSnapshot(friendsQuery, (snapshot) => {
      setFriends(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeRequests();
      unsubscribeFriends();
    };
  }, [userId]);

  const handleAcceptRequest = async (requestId) => {
    try {
      const requestDoc = doc(db, "friends", requestId);
      await updateDoc(requestDoc, { status: "accepted" });
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <div>
      <h2>Manage Friends</h2>
      <h3>Friend Requests</h3>
      <ul>
        {friendRequests.map((request) => (
          <li key={request.id}>
            <p>{request.user1}</p>
            <button onClick={() => handleAcceptRequest(request.id)}>
              Accept
            </button>
          </li>
        ))}
      </ul>
      <h3>Current Friends</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <p>{friend.user2}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFriends;
