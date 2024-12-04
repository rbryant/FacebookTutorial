import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const SearchFriends = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const usersQuery = query(
      collection(db, "users"),
      where("userName", ">=", searchTerm),
      where("userName", "<=", searchTerm + "\uf8ff")
    );
    const usersSnapshot = await getDocs(usersQuery);
    const users = usersSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((user) => user.id !== userId);
    setSearchResults(users);
  };

  const handleSendRequest = async (friendId) => {
    try {
      await addDoc(collection(db, "friends"), {
        user1: userId,
        user2: friendId,
        status: "pending",
      });
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div>
      <h2>Search Friends</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((user) => (
          <li key={user.id}>
            <p>{user.userName}</p>
            <button onClick={() => handleSendRequest(user.id)}>
              Send Friend Request
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFriends;
