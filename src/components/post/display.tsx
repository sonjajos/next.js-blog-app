import {
  ChatBubbleBottomCenterIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/16/solid";
import { HeroAvatar } from "../hero-components";
import { Post } from "@prisma/client";
import Link from "next/link";
import paths from "@/paths";

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
}

export default async function PostDisplay({
  post,
  slug,
  isDisabled = false,
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
        <div className="cursor-pointer hover:text-blue-600 p-2 rounded-[10px] bg-overlay flex flex-row items-center gap-2">
          <HandThumbUpIcon width={16} className="" />
          <div>0</div>
        </div>

        <div className="cursor-pointer hover:text-red-600 p-2 rounded-[10px] bg-overlay flex flex-row items-center gap-2">
          <HandThumbDownIcon width={16} className="" />
          <div>0</div>
        </div>

        <div className="cursor-pointer hover:text-blue-600 p-2 rounded-[10px] bg-overlay flex flex-row items-center gap-2">
          <ChatBubbleBottomCenterIcon width={16} className="" />
          <div>0</div>
        </div>

        <div className="cursor-pointer hover:text-blue-600 p-2 rounded-[10px] bg-overlay flex flex-row items-center gap-2">
          <ShareIcon width={16} className="" />
          <div>Share</div>
        </div>
      </div>
    </Link>
  )
}
