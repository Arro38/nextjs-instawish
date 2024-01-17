import NavBar from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import CircleAvatar from "@/components/ui/circle-avatar";
import FollowButton from "@/components/user/FollowButton";
import { ApiService } from "@/services/api.service";
import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cookies } from "next/headers";

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
          <div className="flex flex-col text-center">
            <span className="text-2xl font-bold">{followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-col  text-center">
            <span className="text-2xl font-bold">{following?.length}</span>
            <span>Following</span>
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
        {/* TODO :  VIEW Post description & comment */}
        <div className="flex flex-wrap -m-6 ">
          {posts?.map((post, i) => (
            <div key={i} className="border border-white  w-1/3">
              {/* JSX content */}
              <img
                className="  object-cover cursor-pointer"
                src={process.env.NEXT_PUBLIC_BASE_URL + post.imageUrl}
                alt={post.description}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
