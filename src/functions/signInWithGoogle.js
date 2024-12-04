import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const signInWithGoogle = async (router) => {
  try {
    const result = await signIn("google", { callbackUrl: "/" });
    const user = result.user;

    // Check if user already exists in the database
    const userDoc = doc(db, "users", user.id);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      // Add new user to the database
      await setDoc(userDoc, {
        userId: user.id,
        userName: user.name,
        email: user.email,
        profilePicture: user.image,
      });
    }

    // Redirect to the home page
    router.push("/");
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export default signInWithGoogle;
