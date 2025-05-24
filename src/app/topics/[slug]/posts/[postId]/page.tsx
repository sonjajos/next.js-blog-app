import { auth } from "@/auth";
import AddCommentForm from "@/components/comment/comment-input";
import CommentList from "@/components/comment/list";
import PostDisplay from "@/components/post/display";
import { db } from "@/db";
import { fetchComments } from "@/db/queries/comments";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostPage({
  params,
}: PostPageProps) {
  const { slug, postId } = await params;
  const session = await auth();
  const post = await db.post.findFirst({
    orderBy: { createdAt: "desc" },
    take: 10,
    where: {
      id: postId,
    },
    include: {
      user: {
        select: {
          id: true,
          image: true,
          name: true,
        }
      },
      _count: { select: { comments: true } }
    }
  });

  if (!post) {
    notFound();
  }

  const comments = await fetchComments();

  return (
    <div className="flex-1 pt-6 flex flex-col gap-8">
      {post && <PostDisplay post={post} slug={slug} isDisabled commentsCount={post._count?.comments ?? 0} />}
      <AddCommentForm slug={slug} postId={postId} />
      {session?.user ? (
        <CommentList data={comments} slug={slug} />
      ): (
        <div className="max-h-[400px] overflow-hidden relative">
          <div className="absolute w-full h-full backdrop-blur-md z-10">
            <div className="w-full h-full bg-gradient-to-b from-transparent to-background flex flex-col items-center justify-center gap-4">
              <h2>Sign in to join the discussion!</h2>
              <p>See comments, join any conversation or create your own topic!</p>
            </div>
          </div>
          <CommentList data={comments} slug={slug} />
        </div>
      )}
      
      
    </div>
  )
}
  