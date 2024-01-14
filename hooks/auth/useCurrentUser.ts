import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCurrentUser = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentToken = Cookies.get("token");
    if (currentToken) {
      setToken(currentToken);
    }
  }, []);

  //   const refetchUser = async (userId: string) => {
  //     const userInfo = await authService.getMe(userId);
  //     const currentUser = Cookies.get("currentUser");

  //     if (userInfo && currentUser) {
  //       const newUser = {
  //         ...JSON.parse(currentUser),
  //         username: userInfo.username,
  //         avatar: userInfo.avatar,
  //       };
  //       Cookies.set("currentUser", JSON.stringify(newUser));
  //       setUser(newUser);
  //     }
  //   };

  return { token };
};
