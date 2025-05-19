import { Comment } from "@prisma/client";
import { HeroAvatar } from "../hero-components";
import CommentList from "./list";
import CommentControls from "./comment-controls";

interface SingleCommentProps {
  data: Comment & {
    user: { name: string | null; image: string | null };
  }
  slug: string;
  comments?: (Comment & { user: { name: string | null; image: string | null } })[];
}

export default function SingleComment({
  data,
  slug,
  comments,
}: SingleCommentProps) {
  const repliesById = comments?.filter((c) => c.parentId === data.id);
 
  return (
    <div className="flex relative w-full flex-col gap-4">
      <div className="flex flex-row gap-4 items-center">
        <HeroAvatar src={data.user.image ?? ""} size="sm" />
        <div className="flex flex-col gap-1">
          <div className="font-bold text-xs">{data.user.name}</div>
          <div className="text-xs opacity-50">
            {Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(data.createdAt)}
          </div>
        </div>
        
      </div>
      <p>
        {data.content}
      </p>
      <CommentControls
        slug={slug}
        postId={data.postId}
        commentId={data.id}
      />
      {repliesById && (
        <div className="w-full pl-10">
          <CommentList
            data={comments ?? []}
            slug={slug}
            psrentId={data.id}
          />
        </div>
      )}
    </div>
  )
}
