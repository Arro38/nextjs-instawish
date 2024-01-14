import axios, { AxiosInstance } from "axios";
export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: "The request timed out.",
    });
  }

  login = async (username: string, password: string) => {
    return this.instance
      .post("/login_check", { username, password })
      .then((response) => response.data.token);
  };
}
