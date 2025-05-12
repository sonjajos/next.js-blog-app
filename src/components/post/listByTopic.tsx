import { db } from "@/db";
import PostDisplay from "./display";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";

interface PostListByTopicProps {
  slug: string;
}

export default async function PostListByTopic({
  slug,
}: PostListByTopicProps) {
  const posts = await db.post.findMany({
    where: { topic: { slug } },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      }
    }
  });

  return (
    <div className="flex-1 w-full flex flex-col items-start justify-between gap-4 pt-6 h-full">
      {posts?.map((post) => (
        <PostDisplay key={post.id} post={post} slug={slug} />
      ))}
      {!posts?.length && (
        <div className="flex-1 w-full flex flex-col items-center justify-center mt-[20%]">
          <ChatBubbleLeftRightIcon width={100} />
          <h2>Nobody has posted about this topic yet.</h2>
          <p>Be the first on to post here!</p>
        </div>
      )}
    </div>
  )
}
