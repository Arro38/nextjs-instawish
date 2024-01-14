import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import CircleAvatar from "./ui/circle-avatar";
import { Dancing_Script } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const dancing_script = Dancing_Script({ subsets: ["latin"], weight: "700" });
function NavBar() {
  return (
    <nav className="flex justify-between items-center w-full ">
      {/* Icon Add */}
      <PlusIcon
        className="border-2 border-primary rounded-lg size-7 p-1"
        scale={3}
      />
      {/* Title of App */}
      <h1 className={`${dancing_script.className} text-2xl`}>Instawish</h1>
      {/* Icon Messages */}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleAvatar
            src={"https://github.com/shadcn.png"}
            alt={"EV"}
            size="sm"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>EV</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Mon profil</DropdownMenuItem>
          <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default NavBar;
