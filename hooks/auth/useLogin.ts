import Cookies from "js-cookie";
import { authService } from "@/services";

export const useLogin = () => {
  const login = async (username: string, password: string) => {
    const token = await authService.login(username, password);
    if (token) {
      Cookies.set("token", token);
    }
    return token;
  };

  return { login };
};
