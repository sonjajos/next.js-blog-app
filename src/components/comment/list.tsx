import { Comment } from "@prisma/client";
import SingleComment from "./single";

interface CommentListProps {
  psrentId?: string | null;
  data: (Comment & { user: { name: string | null; image: string | null } })[];
  slug: string;
}

export default async function CommentList({
  psrentId = null,
  data,
  slug,
}: CommentListProps) {
  return (
    <div className="flex relative flex-col gap-10">
      {data.filter((c) => c.parentId === psrentId).map((comment) => (
        <SingleComment
          key={comment.id}
          data={comment}
          slug={slug}
          comments={data}
        />
      ))}
    </div>
  )
}
