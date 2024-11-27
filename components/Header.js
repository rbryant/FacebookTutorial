import Image from "next/image";
import React, { useState, useEffect } from "react";
import plead from "../assets/Plead.png";
import nouser from "../assets/nouser.png";

import { MdHome } from "react-icons/md";
import { BsCardList } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    console.log("Session data:", session);
    console.log("Session status:", status);
  }, [session, status]);

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
      <div className="flex items-center mr-2">
        <div className="w-10 h-10" onClick={() => router.push("/")}>
          <Image src={plead} alt="Logo" />
        </div>
        <div className="ml-2 ">
          <input
            type="text"
            placeholder="Search Plead"
            className="outline-0 bg-[#f2f3f7] p-2 rounded-full pl-4 hidden sm:block"
          />
        </div>
      </div>
      {/* Middle */}
      <div className="flex items-center space-x-7">
        <MdHome className="w-9 h-9" />
        <BsCardList className="w-7 h-7" />
        <GrGroup className="w-7 h-7" />
      </div>
      {/* RightSide */}
      <div className="flex space-x-6 items-center ml-0">
        <div className="md:flex space-x-6 hidden ">
          <FaBell className="w-7 h-7" />
          <AiOutlineMessage className="w-7 h-7" />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : session ? (
          <div className="flex items-center space-x-4">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
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
            <img src={nouser.src} className="rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
