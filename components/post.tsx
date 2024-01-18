import React from "react";
import CircleAvatar from "./ui/circle-avatar";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  HeartIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getTimeAgo } from "@/lib/utils";
import FollowButton from "./user/FollowButton";
import PostActions from "./post/post-action";

// Instagram post
export default function Post({ post }: { post: Post }) {
  return (
    <div>
      {/* user row */}
      <div className="flex items-center">
        <Link href={`/user/${post.createdBy.id}`} className=" w-full">
          <div className=" flex items-center bg-primary-foreground relative shadow-lg rounded-3xl  p-2">
            <div className="absolute left-0">
              <CircleAvatar
                src={post.createdBy.imageUrl}
                alt={post.createdBy.username}
                size="md"
              />
            </div>
            <span className="mx-16">{post.createdBy.username}</span>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsVerticalIcon className="size-10 p-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{post.createdBy.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/user/${post.createdBy.id}`}>
              <DropdownMenuItem className=" cursor-pointer">
                Voir le profil
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className=" cursor-pointer">
              <FollowButton user={post.createdBy} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* post image */}
      <div className="mt-3">
        <img
          className="rounded-3xl w-full object-cover"
          src={process.env.NEXT_PUBLIC_BASE_URL! + post.imageUrl}
          alt="post"
        />
        {/* post description */}
        <div className="flex items-center mt-2 w-full">
          <span className="mx-2 font-bold">{post.createdBy.username}</span>
          {/* fix post description overflow x */}
          <span className=" overflow-clip">{post.description}</span>
        </div>
      </div>

      {/* post actions */}
      <PostActions post={post} />
    </div>
  );
}
