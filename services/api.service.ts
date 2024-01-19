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

      return res.data as User[];
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

      return res.data as User[];
    } catch (error) {
      console.log(error);
    }
  };

  getHomePosts = async () => {
    try {
      const res = await this.instance.get("home");
      if (res.status > 250 && res.statusText !== "OK") {
        throw new Error("Failed to fetch data");
      }
      return res.data as Post[];
    } catch (error) {
      console.log(error);
    }
  };

  editProfile = async (formData: FormData) => {
    try {
      const res = await this.instance.post("profile", formData);
      if (res.status > 250 && res.statusText !== "OK") {
        throw new Error("Failed to fetch data");
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
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

  addComment = async (idPost: string, comment: string) => {
    try {
      // const url = process.env.NEXT_PUBLIC_API_URL + "comment/" + idPost;
      const res = await this.instance.post("comment/add/" + idPost, {
        content: comment,
      });
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  deleteComment = async (idComment: string) => {
    try {
      // const url =
      //   process.env.NEXT_PUBLIC_API_URL + "comment/remove/" + idPost;
      const res = await this.instance.post("comment/remove/" + idComment);
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  editComment = async (idComment: string, content: string) => {
    try {
      // const url =
      //   process.env.NEXT_PUBLIC_API_URL + "comment/edit/" + idPost;
      const res = await this.instance.post("comment/edit/" + idComment, {
        content: content,
      });
      if (res.status > 250 && res.statusText !== "OK") {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  addPost = async (formData: FormData) => {
    try {
      const res = await this.instance.post("post/add", formData);
      if (res.status > 250 && res.statusText !== "OK") {
        throw new Error("Failed to fetch data");
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}
