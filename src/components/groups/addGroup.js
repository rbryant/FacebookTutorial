import React, { useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddGroup = ({ userId }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleAddGroup = async () => {
    try {
      await addDoc(collection(db, "groups"), {
        groupName,
        groupDescription,
        createdBy: userId,
        createdAt: new Date(),
      });
      setGroupName("");
      setGroupDescription("");
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <textarea
        placeholder="Group Description"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
      />
      <button onClick={handleAddGroup}>Add Group</button>
    </div>
  );
};

export default AddGroup;
