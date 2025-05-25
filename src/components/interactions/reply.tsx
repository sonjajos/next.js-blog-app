'use client';

import { ChatBubbleBottomCenterIcon } from '@heroicons/react/16/solid';

interface ReplyProps {
  count?: number;
  text?: string;
  className?: string;
  onClick?: () => void;
}

export default function Reply({ count, text = '', className = '', onClick }: ReplyProps) {
  return (
    <div
      className={`${className} cursor-pointer hover:text-blue-600 p-2 rounded-[10px] bg-overlay flex flex-row items-center gap-2`}
      onClick={() => onClick?.()}
    >
      <ChatBubbleBottomCenterIcon width={16} />
      <div>{count ?? text}</div>
    </div>
  );
}
