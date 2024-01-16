"use client";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/useStore";
import {
  fetchFollowers,
  fetchFollowing,
  fetchMe,
} from "@/lib/features/users/usersSlice";
import { useEffect } from "react";
import { Toaster } from "./ui/toaster";
export default function ReduxHeader() {
  const { token } = useCurrentUser();

  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.users.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe(token));
    }
  }, [token]);

  useEffect(() => {
    if (me && token) {
      dispatch(fetchFollowers({ token: token, id: me.id }));
      dispatch(fetchFollowing({ token: token, id: me.id }));
    }
  }, [me, token]);
  return (
    <>
      <Toaster />
    </>
  );
}
