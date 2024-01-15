"use client";
import RowAvatar from "@/components/home/row-avatar";
import NavBar from "@/components/main-nav";
import Post from "@/components/post";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

async function getPosts() {
  const res = await axios(process.env.NEXT_PUBLIC_API_URL + "home", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  if (res.status > 250 && res.statusText !== "OK") {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.data;
}

export default async function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <>
      <NavBar />
      {/* CircleAvatars to Follow */}
      <RowAvatar />
      {/* Posts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          {/* JSX content */}
          <Post />
        </div>
      ))}
    </>
  );
}
