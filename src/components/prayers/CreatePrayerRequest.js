import Image from "next/image";
import React, { useRef, useState } from "react";
import camera from "../../assets/camera.png";
import photos from "../../assets/photos.png";
import smile from "../../assets/smile.png";
import { useSession } from "next-auth/react";
import { db, storage } from "../../../firebase";
import nouser from "../../assets/nouser.png";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CreatePrayerRequest = () => {
  const { data: session } = useSession();
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create data post and add it to the collection
  const uploadRequest = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "prayerRequests"), {
      profileImg: session?.user?.image,
      username: session?.user?.name,
      content: contentRef.current.value,
      createdAt: serverTimestamp(),
      status: "open",
    });

    if (image) {
      // Path for the image
      const imagePath = ref(storage, `prayerRequests/${docRef.id}/image`);

      // Upload image to that address
      // Then with the snapshot declare the download URL
      await uploadString(imagePath, image, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imagePath);
          await updateDoc(doc(db, "prayerRequests", docRef.id), {
            image: downloadURL,
          });
        }
      );
    }

    setImage(null);
    setLoading(false);
    contentRef.current.value = "";
  };

  // Add the image to state
  const addImageToState = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  return (
    <div className="w-screen sm:w-full ">
      <div className="max-w-[25rem] sm:max-w-[33rem] mx-auto sm:px-2 bg-white rounded-[1rem] ">
        <div className="mt-8 flex items-center w-full p-3 pt-4 ">
          <div className="w-12 h-12 shrink-0">
            <img
              src={session ? session?.user?.image : nouser.src}
              className="rounded-full "
            />
          </div>
          <div className="flex items-center ml-5 w-full  ">
            <input
              type="text"
              placeholder="What's on your heart?"
              className="outline-0 bg-[#f2f3f7] p-1 rounded-full pl-3 w-full h-12 truncate"
              ref={contentRef}
            />
          </div>

          <div
            className="flex items-center bg-blue-500 px-3 rounded-full h-10 ml-4"
            onClick={uploadRequest}
          >
            <button className="font-bold text-white">
              {loading ? "Loading" : "Plead"}
            </button>
          </div>
        </div>

        <div className="">
          {image ? (
            <div className="" onClick={() => setImage(null)}>
              <img src={image} className="p-4" alt="" />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="border-b mb-4 mt-2"></div>

        <div className="flex justify-between px-3 sm:mx-9 pb-3">
          <div
            className="flex items-center p-2 hover:bg-blue-500 
          hover:text-white hover:rounded-full cursor-pointer"
          >
            <div className="w-7 h-7">
              <Image src={camera} />
            </div>
            <p className="pl-2 whitespace-nowrap text-[14px]">Live Video</p>
          </div>

          <div
            className="flex items-center p-2 hover:bg-blue-500 
          hover:text-white hover:rounded-full cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <div className="w-7 h-7">
              <Image src={photos} />
              <input
                type="file"
                className="hidden"
                ref={imageRef}
                onChange={addImageToState}
              />
            </div>
            <p className="pl-2 text-[14px]">Photo/Video</p>
          </div>

          <div
            className="flex items-center p-2 hover:bg-blue-500 
          hover:text-white hover:rounded-full cursor-pointer"
          >
            <div className="w-7 h-7">
              <Image src={smile} />
            </div>
            <p className="pl-2 text-[14px]">Feeling/Activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePrayerRequest;
