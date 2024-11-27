import { db } from "firebase";
import { collection, addDoc } from "firebase/firestore";

// Sample users
const users = [
  { id: "user1", name: "Alice" },
  { id: "user2", name: "Bob" },
  { id: "user3", name: "Charlie" },
  { id: "user4", name: "David" },
];

// Function to create sample users
const createUsers = async () => {
  try {
    for (const user of users) {
      await addDoc(collection(db, "users"), user);
    }
    console.log("Sample users created successfully");
  } catch (error) {
    console.error("Error creating users:", error);
  }
};

// Sample friend relationships
const friends = [
  { user1: "user1", user2: "user2" },
  { user1: "user1", user2: "user3" },
  { user1: "user2", user2: "user4" },
  { user1: "user3", user2: "user4" },
];

// Function to create sample friend relationships
const createFriends = async () => {
  try {
    for (const friend of friends) {
      await addDoc(collection(db, "friends"), friend);
    }
    console.log("Sample friends created successfully");
  } catch (error) {
    console.error("Error creating friends:", error);
  }
};

// Run the functions to create sample data
const createSampleData = async () => {
  await createUsers();
  await createFriends();
};

createSampleData();
