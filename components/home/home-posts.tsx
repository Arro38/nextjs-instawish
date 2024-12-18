"use client";
import React from "react";
import { ApiService } from "@/services/api.service";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Post from "@/components/post";
import { useAppSelector } from "@/hooks/redux/useStore";
export default function HomePosts() {
  const token = Cookies.get("token");

  const [posts, setPosts] = useState<Post[]>([]);
  const followings = useAppSelector((state) => state.users.followings);
  useEffect(() => {
    const api = new ApiService(token!);
    api.getHomePosts().then((posts) => {
      setPosts(posts!);
    });
  }, [followings, token]);
  return (
    <>
      {posts &&
        posts.map((post, i) => (
          <div key={i}>
            {/* JSX content */}
            <Post post={post} />
          </div>
        ))}
    </>
  );
}
