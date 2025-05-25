'use client';

import Reply from '../interactions/reply';
import AddCommentForm from './comment-input';
import { useState } from 'react';

interface CommentControlsProps {
  postId: string;
  commentId: string;
  slug: string;
}

export default function CommentControls({ postId, commentId, slug }: CommentControlsProps) {
  const [isReplyExpanded, expendReply] = useState<boolean>(false);

  return (
    <>
      <div className='flex flex-row gap-2'>
        <Reply text='Reply' className='bg-transparent' onClick={() => expendReply(true)} />
      </div>
      {isReplyExpanded && (
        <AddCommentForm
          slug={slug}
          postId={postId}
          commentId={commentId}
          isExpanded
          onCancel={() => expendReply(false)}
        />
      )}
    </>
  );
}
