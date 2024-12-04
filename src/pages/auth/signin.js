import React from "react";
import { useRouter } from "next/router";
import signInWithGoogle from "../../functions/signInWithGoogle";

const SignInButton = () => {
  const router = useRouter();

  const handleSignIn = () => {
    signInWithGoogle(router);
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default SignInButton;
