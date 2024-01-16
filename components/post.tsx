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

// Instagram post
export default function Post({ post }: { post: Post }) {
  const getTimeAgo = (timestamp: number): string => {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp * 1000);
    const timeDiff = Math.abs(currentDate.getTime() - createdAtDate.getTime());
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (daysDiff > 0) {
      return `${daysDiff} days ago`;
    }
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    if (hoursDiff > 0) {
      return `${hoursDiff} hours ago`;
    }
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    if (minutesDiff > 0) {
      return `${minutesDiff} minutes ago`;
    }
    const secondsDiff = Math.floor(timeDiff / 1000);
    return `${secondsDiff} seconds ago`;
  };
  return (
    <div>
      {/* user row */}
      <div className="flex items-center">
        <div className=" flex items-center bg-primary-foreground relative shadow-lg rounded-3xl w-72 p-2">
          <div className="absolute left-0">
            <CircleAvatar
              src={post.createdBy.imageUrl}
              alt={post.createdBy.username}
              size="md"
            />
          </div>
          <span className="mx-16">{post.createdBy.username}</span>
        </div>
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
              Ne plus suivre
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* post image */}
      <div className="mt-3">
        <img
          className="rounded-3xl w-72 h-72 object-cover"
          src={process.env.NEXT_PUBLIC_BASE_URL! + post.imageUrl}
          alt="post"
        />
      </div>

      {/* post actions */}
      <div className="flex justify-between mt-6 w-72">
        {/* Icons */}
        <div className="flex gap-2 border px-2  rounded-xl border-primary items-center">
          <ChatBubbleIcon className="size-6" />
          <HeartIcon className="size-8  -translate-y-4 border-2 rounded-full p-1 border-primary bg-slate-100" />
          <PaperPlaneIcon className="size-6" />
        </div>
        {/* Bookmark */}
        <BookmarkIcon className="size-8" />
      </div>

      {/* post likes */}
      <div className="mt-2 flex justify-between w-72">
        <span className="">{post.likeds?.length} Likes</span>
        <span className="text-primary">
          {getTimeAgo(post.createdAt.timestamp)}
        </span>
      </div>
    </div>
  );
}
