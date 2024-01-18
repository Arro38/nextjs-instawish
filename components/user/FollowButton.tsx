"use client";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/useStore";
import Cookies from "js-cookie";
import { followUser, unfollowUser } from "@/lib/features/users/usersSlice";
import { useEffect, useState } from "react";

export default function FollowButton({ user }: { user: User }) {
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
          id: user.id,
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
          user: user,
          token: token!,
        })
      );
      // setIsFollowing(true);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (followings!.find((following) => following.id === user.id))
  //     setIsFollowing(true);
  //   else setIsFollowing(false);
  // }, [followings]);

  return (
    <>
      {me && me?.id === user.id ? (
        <Button variant={"secondary"} disabled={loading}>
          Edit Profile
        </Button>
      ) : followings!.find((following) => following.id === user.id) ? (
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
          onClick={() => {
            handleFollow();
          }}
        >
          Follow
        </Button>
      )}
    </>
  );
}
