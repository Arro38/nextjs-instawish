import RowAvatar from "@/components/home/row-avatar";
import NavBar from "@/components/main-nav";
import Post from "@/components/post";

export default function Home() {
  return (
    <>
      <NavBar />
      {/* CircleAvatars to Follow */}
      <RowAvatar />
      {/* Posts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          {/* JSX content */}
          <Post />
        </div>
      ))}
    </>
  );
}
