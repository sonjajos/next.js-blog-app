import { Comment } from "@prisma/client";
import { HeroAvatar } from "../hero-components";


interface SingleCommentProps {
  data: Comment & {
    user: { name: string | null; image: string | null };
  }
}

export default async function SingleComment({
  data,
}: SingleCommentProps) {
  return (
    <div className="flex relative w-full flex-col gap-4">
      <div className="flex flex-row gap-4 items-center">
        <HeroAvatar src={data.user.image ?? ""} size="sm" />
        <div className="font-bold text-xs">{data.user.name}</div>
        <div className="text-xs opacity-40">
          {Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(data.createdAt)}
        </div>
      </div>
      <p>
        {data.content}
      </p>
      
    </div>
  )
}
