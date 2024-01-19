import { Button } from "@/components/ui/button";
import CircleAvatar from "@/components/ui/circle-avatar";
import FollowButton from "@/components/user/FollowButton";
import { ApiService } from "@/services/api.service";
import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cookies } from "next/headers";
import GridPosts from "@/components/user/GridPosts";
import CountFollower from "@/components/user/countFollowers";

export default async function UserPage({ params }: { params: { id: string } }) {
  const token = cookies().get("token")?.value;
  const api = new ApiService(token!);
  const userId = params.id;
  const posts = await api.getPosts(userId);
  const user = await api.getUser(userId);
  const followers = await api.getFollowers(userId);
  const following = await api.getFollowing(userId);

  return (
    <>
      <div className="flex flex-col  gap-4 w-full">
        <div className="flex items-center gap-3">
          <Link href="/">
            <ArrowLeftIcon className="size-10" />
          </Link>
          <h1 className="text-2xl">{user?.username}</h1>
          <CheckCircledIcon className="size-6 text-blue-400" />
        </div>
        <div className="flex items-center gap-4 justify-around">
          <CircleAvatar src={user?.imageUrl} alt={user?.username!} size="lg" />
          <div className="flex flex-col  text-center">
            <span className="text-2xl font-bold">
              {posts ? posts.length : 0}{" "}
            </span>
            <span>Posts</span>
          </div>
          <CountFollower userId={userId} />
          <div className="flex flex-col  text-center">
            <span className="text-2xl font-bold">{following?.length}</span>
            <span>Following</span>C
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl">{user?.username!}</span>
          <span className="text-gray-400">{user?.email!}</span>
        </div>
        <div className="flex items-center gap-1 mb-6">
          <FollowButton user={user!} />
          {/* <Button variant={"secondary"}>Unfollow</Button> */}
          <Link href={"mailto:" + user?.email!} passHref={true}>
            <Button variant={"outline"}>Email</Button>
          </Link>
        </div>

        {/* grid of posts */}
        {posts && <GridPosts posts={posts} />}
      </div>
    </>
  );
}
