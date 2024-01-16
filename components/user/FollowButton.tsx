"use client";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/useStore";
import Cookies from "js-cookie";
import {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
} from "@/lib/features/users/usersSlice";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { set } from "react-hook-form";

export default function FollowButton({ idUser }: { idUser: number }) {
  const followings = useAppSelector((state) => state.users.followings);
  const me = useAppSelector((state) => state.users.user);
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const loading = useAppSelector((state) => state.users.loading);

  const handleUnFollow = async () => {
    try {
      await dispatch(
        unfollowUser({
          id: idUser,
          token: token!,
        })
      );
      setIsFollowing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      await dispatch(
        followUser({
          id: idUser,
          token: token!,
        })
      );
      setIsFollowing(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (followings!.find((following) => following.id === idUser))
      setIsFollowing(true);
    else setIsFollowing(false);
  }, [followings]);

  return (
    <>
      {me?.id === idUser ? (
        <Button variant={"secondary"} disabled={loading}>
          Edit Profile
        </Button>
      ) : isFollowing ? (
        <Button
          variant={"secondary"}
          disabled={loading}
          onClick={() => {
            handleUnFollow();
          }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          disabled={loading}
          onClick={(e) => {
            handleFollow();
          }}
        >
          Follow
        </Button>
      )}
    </>
  );
}
