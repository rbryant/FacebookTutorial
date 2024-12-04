import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const CreatePrayerList = ({ userId }) => {
  const [listName, setListName] = useState("");

  const handleCreateList = async () => {
    try {
      await addDoc(collection(db, "prayerLists"), {
        userId,
        listName,
        createdAt: new Date(),
      });
      setListName("");
    } catch (error) {
      console.error("Error creating prayer list:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Prayer List</h2>
      <input
        type="text"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button onClick={handleCreateList}>Create List</button>
    </div>
  );
};

export default CreatePrayerList;
