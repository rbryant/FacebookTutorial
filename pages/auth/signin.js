import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";
import plead from "../../assets/Plead.png";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../firebase";

const auth = getAuth(app);
const db = getFirestore(app);

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Create a new user record
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
      console.log("New user record created");
    } else {
      console.log("User already exists");
    }

    // Redirect to home screen
    window.location.href = "/";
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Header />
          <div className="flex flex-col items-center mt-12">
            <div className="w-48 h-48">
              <Image src={plead} />
            </div>
            <div className="mt-8 bg-blue-500 rounded-full p-3">
              <button className="text-white" onClick={loginWithGoogle}>
                Sign in with {provider.name}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
