"use client";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/useStore";
import Cookies from "js-cookie";
import {
  fetchFollowers,
  followUser,
  unfollowUser,
} from "@/lib/features/users/usersSlice";

export default function FollowButton({ idUser }: { idUser: number }) {
  const followings = useAppSelector((state) => state.users.followings);
  const me = useAppSelector((state) => state.users.user);
  const token = Cookies.get("token");
  const dispatch = useAppDispatch();
  // TODO UPDATE FOLLOWINGS AND FOLLOWERS WHEN FOLLOWING OR UNFOLLOWING
  return (
    <>
      {me?.id === idUser ? (
        <Button variant={"secondary"}>Edit Profile</Button>
      ) : followings!.find((following) => following.id === idUser) ? (
        <Button
          variant={"secondary"}
          onClick={() => {
            dispatch(
              unfollowUser({
                id: idUser,
                token: token!,
              })
            );
          }}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            dispatch(followUser({ id: idUser, token: token! }));
          }}
        >
          Follow
        </Button>
      )}
    </>
  );
}
