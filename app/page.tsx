import RowAvatar from "@/components/home/row-avatar";
import Post from "@/components/post";

export default function Home() {
  return (
    <>
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
