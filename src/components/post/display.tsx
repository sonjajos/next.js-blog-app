import { HeroAvatar } from "../hero-components";
import { Post } from "@prisma/client";
import Link from "next/link";
import paths from "@/paths";
import Like from "../interactions/like";
import Dislike from "../interactions/dislike";
import Reply from "../interactions/reply";
import Share from "../interactions/share";

interface PostDisplayProps {
  slug: string;
  post: Post & {
    user: {
      id: string | null;
      name: string | null;
      image: string | null;
    }
  };
  isDisabled?: boolean;
  commentsCount: number;
}

export default async function PostDisplay({
  post,
  slug,
  isDisabled = false,
  commentsCount = 0,
}: PostDisplayProps) {
  return (
    <Link
      key={post.id}
      href={paths.post(slug, post.id)}
      aria-disabled
      tabIndex={isDisabled ? -1 : undefined}
      className={`flex flex-col gap-4 pb-6 border-b-[1px] border-overlay ${!isDisabled ? "hover:bg-hover" : "pointer-events-none"}`}
    >
      <div className="flex flex-row gap-4">
        <HeroAvatar
          src={post?.user?.image ?? ""}
          size="sm"
        />
        <div>
          <div className="font-bold text-textColor text-xs">
            {slug}
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-textColor text-xs opacity-80">
              {post?.user?.name}
            </div>
            <div className="text-textColor text-xs opacity-60">
              {Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(post.createdAt)}
            </div>
          </div>
          
        </div>
        
      </div>
      <div className="text-3xl font-bold">
        {post.title}
      </div>
      <p>
        {post.content}
      </p>

      <div className="flex flex-row gap-4">
        <Like count={0} />
        <Dislike count={0} />
        <Reply count={commentsCount} />
        <Share link="" />
      </div>
    </Link>
  )
}
