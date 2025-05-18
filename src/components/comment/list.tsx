import { Comment } from "@prisma/client";
import SingleComment from "./single";

interface CommentListProps {
  data: (Comment & { user: { name: string | null; image: string | null } })[];
}

export default async function CommentList({
  data,
}: CommentListProps) {
  return (
    <div className="flex relative flex-col gap-10">
      {data.map((comment) => (
        <SingleComment key={comment.id} data={comment} />
      ))}
    </div>
  )
}
