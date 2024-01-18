"use client";
import { useAppSelector } from "@/hooks/redux/useStore";
import { getTimeAgo } from "@/lib/utils";
import { ApiService } from "@/services/api.service";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  HeartFilledIcon,
  HeartIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import React, { use, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import ListComment from "./list-comment";
import autoAnimate from "@formkit/auto-animate";
import { ShareButton } from "./ShareButton";

export default function PostActions({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const me = useAppSelector((state) => state.users.user);
  const api = new ApiService(Cookies.get("token")!);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const parent = useRef(null);

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
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    setLikes(post.likeds?.length);
    if (me) {
      if (post.likeds?.find((l) => l.user.id === me!.id)) {
        setIsLiked(true);
      }
    }
  }, [post, me]);

  useEffect(() => {
    setComments(post.comments!);
  }, [post]);

  return (
    <div ref={parent}>
      <div className="flex justify-between mt-6 w-full">
        {/* Icons */}
        <div className="flex gap-4 border px-2  rounded-xl border-primary items-center">
          <div
            className="relative transition-all hover:scale-125 cursor-pointer"
            onClick={() => {
              setShowComments(!showComments);
            }}
          >
            <ChatBubbleIcon className="size-6 " />
            {post.comments?.length > 0 && (
              <span className="absolute -top-1 -right-2 text-xs font-bold text-primary">
                {post.comments?.length}
              </span>
            )}
          </div>
          {isLiked ? (
            <HeartFilledIcon
              className="size-8  -translate-y-4 border-2 rounded-full p-1 border-primary bg-slate-100 transition-all hover:scale-125 cursor-pointer"
              onClick={() => handleLike()}
            />
          ) : (
            <HeartIcon
              className="size-8  -translate-y-4 border-2 rounded-full p-1 border-primary bg-slate-100 transition-all hover:scale-125 cursor-pointer"
              onClick={() => handleLike()}
            />
          )}
          <ShareButton post={post} />
        </div>
        {/* Bookmark */}
        <BookmarkIcon className="size-8" />
      </div>
      {/* post likes */}
      <div className="mt-2 flex justify-between w-full">
        <span className="">{likes} Likes</span>
        <span className="text-primary">
          {getTimeAgo(post.createdAt.timestamp)}
        </span>
      </div>
      {/* Comment */}
      {/* Add animation slide slowly when show comment */}

      {showComments && (
        <ListComment
          comments={comments!}
          postId={post.id}
          setComments={setComments}
        />
      )}
    </div>
  );
}
