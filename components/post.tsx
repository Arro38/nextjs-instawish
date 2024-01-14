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

// Instagram post
export default function Post() {
  return (
    <div>
      {/* user row */}
      <div className="flex items-center">
        <div className=" flex items-center bg-primary-foreground relative shadow-lg rounded-3xl w-72 p-2">
          <div className="absolute left-0">
            <CircleAvatar
              src={"https://github.com/shadcn.png"}
              alt={"EV"}
              size="md"
            />
          </div>
          <span className="mx-16">Username</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsVerticalIcon className="size-10 p-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Username</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Voir le profil</DropdownMenuItem>
            <DropdownMenuItem>Ne plus suivre</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* post image */}
      <div className="mt-3">
        <img
          className="rounded-3xl w-72 h-72 object-cover"
          src="https://placekitten.com/640/640"
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
        <span className="">100 Likes</span>
        <span className="text-primary">15 minutes ago</span>
      </div>
    </div>
  );
}
