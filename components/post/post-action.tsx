"use client";
import { useAppSelector } from "@/hooks/redux/useStore";
import { getTimeAgo } from "@/lib/utils";
import { ApiService } from "@/services/api.service";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  HeartIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import React, { use, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function PostActions({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const me = useAppSelector((state) => state.users.user);
  const api = new ApiService(Cookies.get("token")!);

  const handleLike = () => {
    setIsLiked(!isLiked);
    api.likePost(post.id);
    if (isLiked) {
      setLikes(likes! - 1);
    } else {
      setLikes(likes! + 1);
    }
  };

  useEffect(() => {
    setLikes(post.likeds?.length);
    if (post.likeds?.find((l) => l.user.id === me!.id)) {
      setIsLiked(true);
    }
  }, [post]);

  return (
    <>
      <div className="flex justify-between mt-6 w-72">
        {/* Icons */}
        <div className="flex gap-2 border px-2  rounded-xl border-primary items-center">
          <div className="relative">
            {/* TODO CRUD COMMENT */}
            <ChatBubbleIcon className="size-6" />
            <span className="absolute -top-1 -right-2 text-xs font-bold text-primary">
              {post.comments?.length}
            </span>
          </div>
          <HeartIcon
            className={
              "size-8  -translate-y-4 border-2 rounded-full p-1 border-primary bg-slate-100 transition-all hover:scale-125 " +
              (isLiked
                ? "text-neutral-950 hover:text-neutral-500 bg-neutral-100 "
                : "text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100    ")
            }
            onClick={() => handleLike()}
          />
          <PaperPlaneIcon className="size-6" />
        </div>
        {/* Bookmark */}
        <BookmarkIcon className="size-8" />
      </div>
      {/* post likes */}
      <div className="mt-2 flex justify-between w-72">
        <span className="">{likes} Likes</span>
        <span className="text-primary">
          {getTimeAgo(post.createdAt.timestamp)}
        </span>
      </div>
    </>
  );
}
