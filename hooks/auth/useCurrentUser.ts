import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "../redux/useStore";
import { fetchMe } from "@/lib/features/users/usersSlice";

export const useCurrentUser = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = Cookies.get("token");
    const expires = Cookies.get("expires");
    if (currentToken && expires && new Date(expires) > new Date()) {
      setToken(currentToken);
    }
  }, []);
  // Using the token, you can now make authenticated requests to the API.
  // For example, you can fetch the current user:
  // using redux toolkit

  return { token };
};
