import RowAvatar from "@/components/home/row-avatar";
import NavBar from "@/components/main-nav";
import Post from "@/components/post";
import axios from "axios";
import { cookies } from "next/headers";

async function getPosts() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "home";
    const res = await axios(url, {
      headers: {
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    });
    if (res.status > 250 && res.statusText !== "OK") {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.data as Post[];
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <NavBar />
      {/* CircleAvatars to Follow */}
      <RowAvatar />
      {/* Posts */}
      {posts &&
        posts.map((post, i) => (
          <div key={i}>
            {/* JSX content */}
            <Post post={post} />
          </div>
        ))}
    </>
  );
}
