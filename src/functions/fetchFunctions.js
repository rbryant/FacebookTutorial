// fetchFunctions.js
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const fetchFriendsRequests = async (userId) => {
  console.log("in fetchFriendsRequests");
  const friendsQuery = query(
    collection(db, "friends"),
    where("user1", "==", userId)
  );
  const friendsSnapshot = await getDocs(friendsQuery);
  const friendsIds = friendsSnapshot.docs.map((doc) => doc.data().user2);

  if (friendsIds.length === 0) {
    return [];
  }

  const friendsRequestsQuery = query(
    collection(db, "prayerRequests"),
    where("uid", "in", friendsIds)
  );
  const friendsRequestsSnapshot = await getDocs(friendsRequestsQuery);
  return friendsRequestsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchSharedRequests = async (userId) => {
  console.log("in fetchSharedRequests");
  const sharedRequestsQuery = query(
    collection(db, "sharedRequests"),
    where("friendId", "==", userId)
  );
  const sharedRequestsSnapshot = await getDocs(sharedRequestsQuery);

  const sharedRequests = await Promise.all(
    sharedRequestsSnapshot.docs.map(async (doc) => {
      const sharedRequestData = doc.data();
      const originalRequestDoc = await getDoc(
        doc(db, "prayerRequests", sharedRequestData.postId)
      );
      return {
        id: originalPostDoc.id,
        ...originalPostDoc.data(),
        sharedBy: sharedRequestData.sharedBy,
      };
    })
  );

  return sharedRequests;
};

export const fetchGroupRequests = async (userId) => {
  console.log("in fetchGroupRequests");
  const groupsQuery = query(
    collection(db, "groupMembers"),
    where("userId", "==", userId)
  );
  const groupsSnapshot = await getDocs(groupsQuery);
  const groupIds = groupsSnapshot.docs.map((doc) => doc.data().groupId);

  if (groupIds.length === 0) {
    return [];
  }

  const groupRequestsQuery = query(
    collection(db, "prayerRequests"),
    where("groupId", "in", groupIds)
  );
  const groupRequestsSnapshot = await getDocs(groupRequestsQuery);
  return groupRequestsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const fetchUserRequests = async (userId) => {
  console.log("in fetchUserRequests");
  const userRequestsQuery = query(
    collection(db, "prayerRequests"),
    where("userId", "==", userId)
  );
  const userRequestsSnapshot = await getDocs(userRequestsQuery);
  return userRequestsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
