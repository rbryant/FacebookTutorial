import Image from "next/image";
import React, { useState, useEffect } from "react";
import plead from "../assets/Plead.png";
import nouser from "../assets/nouser.png";

import { MdHome } from "react-icons/md";
import { BsCardList } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSessionContext } from "./context/SessionContext";

import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Header = () => {
  const { session, status, loading } = useSessionContext();
  const router = useRouter();
  console.log(session);
  
  useEffect(() => {
    console.log("Session data:", session);
        const saveUserToFirebase = async () => {
          if (!session) return;

          const { user } = session;
          const googleUserId = session.user.uid;

          const userDoc = doc(db, "users", googleUserId);
          const userSnapshot = await getDoc(userDoc);

          if (!userSnapshot.exists()) {
            await setDoc(userDoc, {
              userId: googleUserId,
              userName: user.name,
              email: user.email,
              profilePicture: user.image,
            });
          }
        };

        saveUserToFirebase();
  }, [session]);

  useEffect(() => {
    if (status !== "loading") {
      //setLoading(false);
    }
  }, [status]);

  useEffect(() => {   
    if (!loading && !session) {
      router.push("/auth/signin");
    }
  }, [loading, session, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="p-4 flex items-center justify-between border-b lg:px-10">
      {/* LeftSide */}
      <div className="flex items-center mr-2 cursor-pointer">
        <div className="w-10 h-10" onClick={() => router.push("/")}>
          <Image src={plead} alt="Logo" />
        </div>
        <div className="ml-2 ">
          <input
            type="text"
            placeholder="Search Plead"
            className="outline-0 bg-[#f2f3f7] p-2 rounded-full pl-4 hidden sm:block cursor-pointer"
          />
        </div>
      </div>
      {/* Middle */}
      <div className="flex items-center space-x-7">
        <MdHome
          className="w-9 h-9 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <BsCardList className="w-7 h-7 cursor-pointer" />
        <GrGroup className="w-7 h-7 cursor-pointer" />
      </div>
      {/* RightSide */}
      <div className="flex space-x-6 items-center ml-0">
        <div className="md:flex space-x-6 hidden ">
          <FaBell className="w-7 h-7 cursor-pointer" />
          <AiOutlineMessage className="w-7 h-7 cursor-pointer" />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : session ? (
          <div className="flex items-center space-x-4">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
                {getInitial(session.user.name)}
              </div>
            )}
            <span>{session.user.name}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="w-10 h-10" onClick={() => signIn()}>
            <img src={nouser.src} className="rounded-full cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
