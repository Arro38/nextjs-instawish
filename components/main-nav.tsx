import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Dancing_Script } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const dancing_script = Dancing_Script({ subsets: ["latin"], weight: "700" });
function NavBar() {
  return (
    <nav className="flex justify-between items-center w-full bg-red-600">
      {/* Icon Add */}

      <PlusIcon
        className="border-2 border-primary rounded-lg size-7 p-1"
        scale={3}
      />
      {/* Title of App */}
      <h1 className={`${dancing_script.className} text-2xl`}>Instawish</h1>
      {/* Icon Messages */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
}

export default NavBar;
