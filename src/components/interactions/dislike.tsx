"use client";

import { HandThumbDownIcon } from "@heroicons/react/16/solid";
  
interface DislikeProps {
  count?: number;
  isDisliked?: boolean;
  className?: string
}
  
export default function Dislike({
  count = 0,
  className = "",
  // isDisliked = false,
}: DislikeProps) {
  return (
    <div className={`${className} cursor-pointer hover:text-pink-600 p-2 rounded-[10px] bg-overlay flex flex-row items-center gap-2`}>
      <HandThumbDownIcon width={16} />
      <div>{count}</div>
    </div>
  )
}
  