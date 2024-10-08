import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebaseConfig";
import Image from "next/image";
import "./page.css";
import Link from "next/link";

export async function generateMetadata({ params }) {
  let data = [];
  try {
    // Fetch document from Firestore
    const docRef = doc(db, "hentai", params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      data = docData;

      // Fetch image URL from Storage
      if (docData.poster) {
        const storageRef = ref(storage, docData.poster);
        const url = await getDownloadURL(storageRef);
        imageURL = url;
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }

  // const localStorageWrapper = () => {
  //   if (typeof window !== "undefined" && window.localStorage) {
  //     return {
  //       getItem: (key) => localStorage.getItem(key),
  //       setItem: (key, value) => localStorage.setItem(key, value),
  //       removeItem: (key) => localStorage.removeItem(key),
  //       clear: () => localStorage.clear(),
  //     };
  //   } else {
  //     // Handle the case when localStorage is not available
  //     return {
  //       getItem: () => null,
  //       setItem: () => {},
  //       removeItem: () => {},
  //       clear: () => {},
  //     };
  //   }
  // };

  // // Usage
  // const ls = localStorageWrapper();

  return {
    title: `Watch ${data.title} Hentai Video Streams Online in 720p , 1080p HD - henpro`,
    description: `Enjoy your unlimited hentai & anime
          collection. We are the definitive source for the best curated 720p /
          1080p HD hentai videos, viewable by mobile phone and tablet, for free.`,
  };
}

export default async function page({ params }) {
  let imageURL = "";
  let data = [];
  let datal = [];
  try {
    // Fetch document from Firestore
    const docRef = doc(db, "hentai", params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      data = docData;

      // Fetch image URL from Storage
      if (docData.poster) {
        const storageRef = ref(storage, docData.poster);
        const url = await getDownloadURL(storageRef);
        imageURL = url;
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
  // Fetch data from API
  const apiResponse = await fetch(
    `https://vimalking.vercel.app/api/hen-random`,
    { cache: "no-store" }
  );
  const newResponse = await apiResponse.json();
  const apiData = newResponse.results.data;

  // Extract IDs from API data

  // Fetch data from Firestore based on IDs

  datal = apiData;
  return (
    <div className="compli">
      <div className="watc">
        <div>
          <div>
            <iframe
              src={data.url}
              frameBorder="0"
              className="ifro"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div>
            <div className="slab1">
              <div className="titleD">{data.title}</div>
              <div className="viewD">{data.views}</div>
            </div>
            <div className="slab2">
              <div className="fourCon">
                <div className="postCon">
                  <img src={data.poster} alt="" className="posterD" />
                </div>
                <div className="fourA">
                  <div className="flex four1">
                    <div className="four11">
                      <div>
                        <div className="teamA">Brand</div>
                        <div className="brando">{data.info?.brand}</div>
                      </div>
                    </div>
                    <div className="four12">
                      {data.cencored ? (
                        <div className="cencored">{data.cencored}</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="four2">
                    <div className="teamA">Brand Uploads</div>
                    <div className="restInfo">{data.info?.brandUploads}</div>
                  </div>
                  <div className="flex four3">
                    <div className="four31">
                      <div>
                        <div className="teamA">Release Date</div>
                        <div className="restInfo">
                          {data.info?.releasedDate}
                        </div>
                      </div>
                    </div>
                    <div className="four32">
                      <div>
                        <div className="teamA">Upload Date</div>
                        <div className="restInfo">{data.info?.uploadDate}</div>
                      </div>
                    </div>
                  </div>
                  <div className="four4">
                    <div className="teamA">Alternate Title</div>
                    <div className="restInfo">{data.info?.alternateTitle}</div>
                  </div>
                </div>
              </div>
              <div className="descSlab">
                <div className="tagG">
                  {data.moreInfo.tags.map((i) => (
                    <Link
                      className="tags"
                      href={`/tags/genre?item=${i
                        .replace(" ", "-")
                        .toLowerCase()}`}
                    >
                      {i}
                    </Link>
                  ))}
                </div>
                <div className="desc1">{data.moreInfo.descripOne}</div>
                <div className="desc2">
                  {data.moreInfo.descripOne !== data.moreInfo.descripTwo
                    ? data.moreInfo.descripTwo
                    : ""}
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div>
          <div className="kalu">
            {datal.map((i) => (
              <Link className="alliu" href={i.id}>
                <div className="fixed-size-container">
                  <img
                    src={i.banner}
                    alt={i.title}
                    className="fixed-size-img"
                  />
                </div>
                <div className="iopu">
                  <div className="titleo">{i.title}</div>
                  <div className="lopi">{i.views}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
