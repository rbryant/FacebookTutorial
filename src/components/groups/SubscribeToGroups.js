import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

const SubscribeToGroups = ({ userId }) => {
  const [groups, setGroups] = useState([]);
  const [subscribedGroups, setSubscribedGroups] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "groups"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGroups(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribe = async (groupId) => {
    try {
      await addDoc(collection(db, "groupMembers"), {
        groupId,
        userId,
        joinedAt: new Date(),
      });
      setSubscribedGroups([...subscribedGroups, groupId]);
    } catch (error) {
      console.error("Error subscribing to group:", error);
    }
  };

  return (
    <div>
      <h2>Subscribe to Groups</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <h3>{group.groupName}</h3>
            <p>{group.groupDescription}</p>
            <button
              onClick={() => handleSubscribe(group.id)}
              disabled={subscribedGroups.includes(group.id)}
            >
              {subscribedGroups.includes(group.id) ? "Subscribed" : "Subscribe"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubscribeToGroups;
