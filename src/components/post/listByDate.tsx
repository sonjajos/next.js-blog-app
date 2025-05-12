import { db } from "@/db";
import PostDisplay from "./display";

export default async function PostListByDate() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      topic: {
        select: {
          slug: true,
        }
      }
    }
  });

  return (
    <div className="flex-1 w-full flex flex-col items-start justify-between gap-4 pt-6">
      {posts?.map((post) => (
        <PostDisplay key={post.id} post={post} slug={post.topic.slug} />
      ))}
    </div>
  )
}
