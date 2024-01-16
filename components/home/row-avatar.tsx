"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import CircleAvatar from "../ui/circle-avatar";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ReactEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppSelector } from "@/hooks/redux/useStore";

function RowAvatar() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const followings = useAppSelector((state) => state.users.followings);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "users", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const userArray = Object.values(res.data) as User[];
      setUsers(userArray);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex overflow-hidden overflow-x-scroll gap-4 w-full no-scrollbar p-4">
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
        {users.length &&
          users
            // filter the array
            .filter((user) =>
              user.username
                .toLowerCase()
                .includes(searchInput.trim().toLowerCase())
            )
            // randomize the array
            .sort(() => Math.random() - 0.5)

            .map((user, i) => (
              <div
                key={i}
                className="bg-gradient-instagram rounded-full p-1 inline-block "
              >
                <Link href={`/user/${user.id}`} className="text-sm">
                  <div className="bg-white rounded-full p-1 relative cursor-pointer">
                    {/* JSX content */}
                    <CircleAvatar
                      src={user.imageUrl}
                      alt={user.username}
                      size="md"
                    />
                    <div className="text-center absolute -bottom-6 w-full">
                      {user.username.slice(0, 6)}
                    </div>
                    {followings.find((f) => f.id === user.id) ? null : (
                      <PlusIcon className="border-2 border-primary rounded-lg size-6 p-1 absolute bottom-0 right-0 bg-white" />
                    )}
                  </div>
                </Link>
              </div>
            ))}
      </div>
      {/* SearchInput */}
      {showSearchInput && (
        <div className="flex w-full gap-2 items-center">
          <Input
            type="text"
            placeholder="Nom d'utilisateur ..."
            onInput={(e) => setSearchInput(e.currentTarget.value)}
          />
          <MagnifyingGlassIcon className="size-6" />
        </div>
      )}
    </>
  );
}

export default RowAvatar;
