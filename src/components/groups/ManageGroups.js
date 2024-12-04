import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const ManageGroups = ({ userId }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "groups"), where("createdBy", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div>
      <h2>Manage Your Groups</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <h3>{group.groupName}</h3>
            <p>{group.groupDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageGroups;
