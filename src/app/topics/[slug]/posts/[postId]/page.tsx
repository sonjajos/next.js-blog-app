import AddCommentForm from "@/components/comment/comment-input";
import CommentList from "@/components/comment/list";
import PostDisplay from "@/components/post/display";
import { db } from "@/db";
import { fetchComments } from "@/db/queries/comments";

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
      }
    }
  });

  const comments = await fetchComments();

  return (
    <div className="flex-1 pt-6 flex flex-col gap-8">
      {post && <PostDisplay post={post} slug={slug} isDisabled />}
      <AddCommentForm slug={slug} postId={postId} />
      <CommentList data={comments} />
    </div>
  )
}
  