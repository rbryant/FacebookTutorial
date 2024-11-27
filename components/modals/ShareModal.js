import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const ShareModal = ({ isOpen, onClose, postId, caption }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const q = query(collection(db, "friends"));
      onSnapshot(q, (snapshot) => {
        setFriends(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [isOpen]);

  const handleShare = async () => {
    try {
      // Add your logic to share the post with selected friends
      console.log("Shared with:", selectedFriends);
      onClose();
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>Share Post</h2>
        <p>{caption}</p>
        <div className="friend-list">
          {friends.map((friend) => (
            <div key={friend.id}>
              <input
                type="checkbox"
                value={friend.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFriends([...selectedFriends, friend.id]);
                  } else {
                    setSelectedFriends(
                      selectedFriends.filter((id) => id !== friend.id)
                    );
                  }
                }}
              />
              <label>{friend.name}</label>
            </div>
          ))}
        </div>
        <button onClick={handleShare}>Share</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  ) : null;
};

export default ShareModal;
