import axios, { AxiosInstance } from "axios";
export class ApiService {
  protected readonly instance: AxiosInstance;
  public constructor(token: string) {
    this.instance = axios.create({
      baseURL: process.env["NEXT_PUBLIC_API_URL"]!,
      timeout: 3000,
      timeoutErrorMessage: "The request timed out.",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getPosts = async (id: string) => {
    try {
      const res = await this.instance.get("home/" + id);
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.data as Post[];
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async (id: string) => {
    try {
      //   const url = process.env.NEXT_PUBLIC_API_URL + "user/" + id;
      const res = await this.instance.get("user/" + id);
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.data as User;
    } catch (error) {
      console.log(error);
    }
  };

  getFollowers = async (idUser: string) => {
    try {
      //   const url =
      //     process.env.NEXT_PUBLIC_API_URL + "follow/followers/" + idUser;
      const res = await this.instance.get("follow/followers/" + idUser);
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  getFollowing = async (idUser: string) => {
    try {
      //   const url =
      //     process.env.NEXT_PUBLIC_API_URL + "follow/followings/" + idUser;
      const res = await this.instance.get("follow/followings/" + idUser);
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  getHomePosts = async () => {
    try {
      // const url = process.env.NEXT_PUBLIC_API_URL + "home";
      const res = await this.instance.get("home");
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.data as Post[];
    } catch (error) {
      console.log(error);
    }
  };

  likePost = async (idPost: string) => {
    try {
      // const url = process.env.NEXT_PUBLIC_API_URL + "like/" + idPost;
      const res = await this.instance.post("liked/" + idPost);
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}
