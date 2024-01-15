import Cookies from "js-cookie";
import { authService } from "@/services";

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const token = await authService.login(username, password);
    if (token) {
      Cookies.set("token", token);
      // token expire on 1 hour
      Cookies.set("expires", new Date(Date.now() + 3600000).toString());
    }
    return token;
  };

  return { login };
};
