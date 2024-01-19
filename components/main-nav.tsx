"use client";
import React, { useEffect, useState } from "react";
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
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/useStore";
import { reset } from "@/lib/features/users/usersSlice";
import Link from "next/link";
import { EditProfile } from "./home/edit-profile";
import { AddPost } from "./post/add-post";

const dancing_script = Dancing_Script({ subsets: ["latin"], weight: "700" });
function NavBar() {
  const { logout } = useLogout();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);
  // const [user, setUser] = useState(me);

  // useEffect(() => {
  //   setUser(me);
  // }, [me]);

  return (
    <nav className="flex justify-between items-center w-full ">
      {/* Icon Add */}
      <AddPost />

      {/* Title of App */}
      <h1 className={`${dancing_script.className} text-2xl`}>Instawish</h1>
      {/* Icon Messages */}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleAvatar src={user?.imageUrl} alt={"EV"} size="sm" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>EV</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/user/${user?.id}`}>
            <DropdownMenuItem className="cursor-pointer">
              Mon profil
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <EditProfile />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onClick={() => {
              logout();
              // reset the store
              dispatch(reset());

              router.push("/login");
            }}
          >
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default NavBar;
