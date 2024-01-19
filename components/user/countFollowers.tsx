"use client";
import { useAppSelector } from "@/hooks/redux/useStore";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ApiService } from "@/services/api.service";

export default function CountFollower({ userId }: { userId: string }) {
  const [followers, setFollowers] = useState<User[] | undefined>([]);
  const me = useAppSelector((state) => state.users.user);
  const token = Cookies.get("token");
  const api = new ApiService(token!);

  useEffect(() => {
    const fetchFollowers = async () => {
      const f = await api.getFollowers(userId);
      setFollowers(f);
    };
    fetchFollowers();
  }, [userId, api]);

  return (
    <div className="flex flex-col text-center">
      <span className="text-2xl font-bold">
        {followers ? followers.length : "..."}
      </span>
      <span>Followers</span>
    </div>
  );
}
