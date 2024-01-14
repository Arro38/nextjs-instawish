"use client";

import NavBar from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import CircleAvatar from "@/components/ui/circle-avatar";
import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function UserPage({ params }: { params: { id: string } }) {
  //   return <div>My Post: {params.id}</div>;
  return (
    <>
      <div className="flex flex-col  gap-4 w-full">
        <div className="flex items-center gap-3">
          <Link href="/">
            <ArrowLeftIcon className="size-10" />
          </Link>
          <h1 className="text-2xl">Username</h1>
          <CheckCircledIcon className="size-6 text-blue-400" />
        </div>
        <div className="flex items-center gap-4 justify-around">
          <CircleAvatar
            src={"https://github.com/shadcn.png"}
            alt={"EV"}
            size="lg"
          />
          <div className="flex flex-col  text-center">
            <span className="text-2xl font-bold">1,122</span>
            <span>Posts</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-2xl font-bold">1M</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-col  text-center">
            <span className="text-2xl font-bold">100</span>
            <span>Following</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl">Username</span>
          <span className="text-gray-400">Email</span>
        </div>
        <div className="flex items-center gap-1 mb-6">
          <Button>Follow</Button>
          {/* <Button variant={"secondary"}>Unfollow</Button> */}
          <Button variant={"outline"}>Email</Button>
        </div>

        {/* grid of posts */}
        {/* TODO :  VIEW Post description & comment */}
        <div className="flex flex-wrap -m-6 ">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="border border-white  w-1/3">
              {/* JSX content */}
              <img
                className="  object-cover cursor-pointer"
                src="https://placekitten.com/640/640"
                alt="post"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
