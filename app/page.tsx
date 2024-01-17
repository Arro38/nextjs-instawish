import HomePosts from "@/components/home/home-posts";
import RowAvatar from "@/components/home/row-avatar";
import NavBar from "@/components/main-nav";

export default async function Home() {
  return (
    <>
      <NavBar />
      {/* CircleAvatars to Follow */}
      <RowAvatar />
      {/* Posts */}
      <HomePosts />
    </>
  );
}
