import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { BsXCircle } from "react-icons/bs";
import { useSessionContext } from "../components/context/SessionContext";

const ShareModal = ({ isOpen, onClose, postId, content, userId }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const { session } = useSessionContext();

  useEffect(() => {
    if (isOpen) {
      const q = query(
        collection(db, "friends"),
        where("user1", "==", session.user.uid)
      );
      onSnapshot(q, async (snapshot) => {
        const friendsData = await Promise.all(
          snapshot.docs.map(async (docSnapshot) => {
            const friendId = docSnapshot.data().user2;
            const friendDoc = await getDoc(doc(db, "users", friendId));
            if (friendDoc.exists()) {
              const friendData = friendDoc.data();
              return { id: friendId, name: friendData.userName };
            } else {
              console.error(`No user found for ID: ${friendId}`);
              return null;
            }
          })
        );
        setFriends(friendsData.filter((friend) => friend !== null));
      });
    }
  }, [isOpen, userId, session.user.uid]);

  const handleShare = async () => {
    try {
      // Add your logic to share the post with selected friends
      console.log("Shared with:", selectedFriends);
      // Example: Add a shared post to each selected friend's collection
      selectedFriends.forEach(async (friendId) => {
        await addDoc(collection(db, "sharedRequests"), {
          requestId: postId,
          friendId,
          sharedBy: session.user.uid,
          timestamp: new Date(),
        });
      });
      // Reset selected friends list
      setSelectedFriends([]);
      onClose();
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleSelectFriend = (friendId) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.includes(friendId)
        ? prevSelectedFriends.filter((id) => id !== friendId)
        : [...prevSelectedFriends, friendId]
    );
  };

  return isOpen ? (
    <div className="modal bg-white rounded-[1rem] px-5 py-4 mt-4 cursor-pointer">
      <div className="modal-content">
        <div className="border-b w-100 flex">
          <h1 className="font-bold mb-5">Share Request</h1>
          <BsXCircle
            onClick={onClose}
            className="float-right h-5 w-5 close-icon"
          />
        </div>
        <p>{content}</p>

        <div className="friend-list">
          {friends.map((friend) => (
            <div key={friend.id}>
              <input
                type="checkbox"
                value={friend.id}
                onChange={() => handleSelectFriend(friend.id)}
                checked={selectedFriends.includes(friend.id)}
              />
              <label>{friend.name}</label>
            </div>
          ))}
        </div>
        <button
          onClick={handleShare}
          className="bg-blue-500 rounded-sm w-100 text-white"
        >
          Share
        </button>
      </div>
    </div>
  ) : null;
};

export default ShareModal;
