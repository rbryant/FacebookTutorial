import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const AddPrayerRequestToList = ({ userId }) => {
  const [lists, setLists] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [selectedRequest, setSelectedRequest] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      const listsQuery = query(
        collection(db, "prayerLists"),
        where("userId", "==", userId)
      );
      const listsSnapshot = await getDocs(listsQuery);
      setLists(
        listsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    const fetchRequests = async () => {
      const requestsQuery = query(collection(db, "prayerRequests"));
      const requestsSnapshot = await getDocs(requestsQuery);
      setRequests(
        requestsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchLists();
    fetchRequests();
  }, [userId]);

  const handleAddRequestToList = async () => {
    try {
      await addDoc(collection(db, "prayerListItems"), {
        listId: selectedList,
        requestId: selectedRequest,
        prayedAt: [],
      });
      setSelectedList("");
      setSelectedRequest("");
    } catch (error) {
      console.error("Error adding prayer request to list:", error);
    }
  };

  return (
    <div>
      <h2>Add Prayer Request to List</h2>
      <select
        value={selectedList}
        onChange={(e) => setSelectedList(e.target.value)}
      >
        <option value="">Select List</option>
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.listName}
          </option>
        ))}
      </select>
      <select
        value={selectedRequest}
        onChange={(e) => setSelectedRequest(e.target.value)}
      >
        <option value="">Select Prayer Request</option>
        {requests.map((request) => (
          <option key={request.id} value={request.id}>
            {request.content}
          </option>
        ))}
      </select>
      <button onClick={handleAddRequestToList}>Add to List</button>
    </div>
  );
};

export default AddPrayerRequestToList;
