"use client";

import { HandThumbUpIcon } from "@heroicons/react/16/solid";
  
interface LikeProps {
  count?: number;
  isLiked?: boolean;
  className?: string
}
  
export default function Like({
  count = 0,
  isLiked = false,
  className = ""
}: LikeProps) {
  return (
    <div className={`${className} bg-overlay cursor-pointer hover:text-blue-600 p-2 rounded-[10px] flex flex-row items-center gap-2`}>
      <HandThumbUpIcon width={16} />
      <div>{count}</div>
    </div>
  )
}
  