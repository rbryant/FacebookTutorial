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

const ManagePrayerLists = ({ userId }) => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const listsQuery = query(
      collection(db, "prayerLists"),
      where("userId", "==", userId)
    );
    const unsubscribeLists = onSnapshot(listsQuery, (snapshot) => {
      setLists(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribeLists();
  }, [userId]);

  useEffect(() => {
    if (selectedList) {
      const itemsQuery = query(
        collection(db, "prayerListItems"),
        where("listId", "==", selectedList.id)
      );
      const unsubscribeItems = onSnapshot(itemsQuery, (snapshot) => {
        setListItems(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });

      return () => unsubscribeItems();
    }
  }, [selectedList]);

  const handleMarkAsPrayed = async (itemId) => {
    try {
      const itemDoc = doc(db, "prayerListItems", itemId);
      await updateDoc(itemDoc, {
        prayedAt: firebase.firestore.FieldValue.arrayUnion(new Date()),
      });

      // Notify the poster (you can implement this with a notification system)
      const itemData = (await getDoc(itemDoc)).data();
      const requestDoc = doc(db, "prayerRequests", itemData.requestId);
      const requestData = (await getDoc(requestDoc)).data();
      const posterId = requestData.userId;

      // Add notification logic here
    } catch (error) {
      console.error("Error marking as prayed:", error);
    }
  };

  return (
    <div>
      <h2>Manage Prayer Lists</h2>
      <select
        onChange={(e) =>
          setSelectedList(lists.find((list) => list.id === e.target.value))
        }
      >
        <option value="">Select List</option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.listName}
          </option>
        ))}
      </select>
      {selectedList && (
        <ul>
          {listItems.map((item) => (
            <li key={item.id}>
              <p>{item.requestId}</p>
              <button onClick={() => handleMarkAsPrayed(item.id)}>
                Mark as Prayed
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagePrayerLists;
