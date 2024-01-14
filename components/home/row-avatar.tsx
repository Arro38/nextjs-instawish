"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import CircleAvatar from "../ui/circle-avatar";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Link from "next/link";

function RowAvatar() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  return (
    <>
      <div className="flex overflow-hidden overflow-x-scroll gap-4 w-full no-scrollbar">
        <div
          className="bg-white rounded-full p-1 relative cursor-pointer"
          onClick={(e) => {
            setShowSearchInput(!showSearchInput);
          }}
        >
          {/* JSX content */}
          <CircleAvatar
            alt={"Search"}
            size="md"
            avatarFallback={<MagnifyingGlassIcon className="size-6" />}
          />
        </div>
        {/* CircleAvatar */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-gradient-instagram rounded-full p-1 inline-block "
          >
            <Link href={`/user/${i}`} className="text-sm">
              <div className="bg-white rounded-full p-1 relative cursor-pointer">
                {/* JSX content */}
                <CircleAvatar
                  src={"https://github.com/shadcn.png"}
                  alt={"EV"}
                  size="md"
                />
                <PlusIcon className="border-2 border-primary rounded-lg size-6 p-1 absolute bottom-0 right-0 bg-white" />
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* SearchInput */}
      {showSearchInput && (
        <div className="flex w-full gap-2 items-center">
          <Input type="text" placeholder="Nom d'utilisateur ..." />{" "}
          <MagnifyingGlassIcon className="size-6" />
        </div>
      )}
    </>
  );
}

export default RowAvatar;
