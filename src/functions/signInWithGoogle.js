import { signIn, getSession } from "next-auth/react";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const waitForSession = async (retryCount = 5, delay = 200) => {
  for (let i = 0; i < retryCount; i++) {
    const session = await getSession();
    if (session) return session;
    await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
  }
  return null;
};

const signInWithGoogle = async (router) => {
  try {
    await signIn("google", { callbackUrl: "/" });

    // Wait for session to be established
    const session = await waitForSession();

    if (!session) {
      console.error("No session found after retries.");
      return;
    }

    const { user } = session;
    const googleUserId = session.user.id;

    // Check if user already exists in the database
    const userDoc = doc(db, "users", googleUserId);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      // Add new user to the database
      await setDoc(userDoc, {
        userId: googleUserId,
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
