'use client';

import { startTransition, useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { Button, Textarea } from '@heroui/react';
import { createComment } from '@/actions/create-comment';
import { useSession } from 'next-auth/react';

interface AddCommentFormProps {
  slug: string;
  postId: string;
  commentId?: string | null;
  isExpanded?: boolean;
  onCancel?: () => void;
}

export default function AddCommentForm({
  slug,
  postId,
  commentId = null,
  isExpanded = false,
  onCancel,
}: AddCommentFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const session = useSession();
  const [joinedConversation, joinConversation] = useState<boolean>(isExpanded);
  const [isPending] = useTransition();
  const [formState, action] = useActionState(createComment.bind(null, slug, postId, commentId), {
    errors: {
      _form: [],
    },
    success: false,
  });

  useEffect(() => {
    if (formState?.success) {
      joinConversation(false);
      formRef?.current?.reset();
      onCancel?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState?.success]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };

  const handleCancel = (): void => {
    onCancel?.();
    joinConversation(false);
  };

  const isContentInvalid = (formState?.errors?.content?.length ?? 0) > 0;
  const isFormInvalid = (formState?.errors?._form?.length ?? 0) > 0;

  return session?.data?.user ? (
    <div className='flex flex-col items-center justify-center p-[2px] w-full min-w-[300px]'>
      {!joinedConversation && (
        <div
          className='flex flex-col text-left items-start justify-start border-[1px] border-overlay rounded-[10px] cursor-pointer w-full p-4'
          onClick={() => joinConversation(true)}
        >
          <p>Discuss this topic</p>
        </div>
      )}
      {joinedConversation && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className='w-full flex flex-col gap-4 items-center justify-center'
        >
          <div className='w-full border-[1px] border-overlay flex flex-col items-end rounded-[10px]'>
            <Textarea
              label='Content'
              name='content'
              placeholder='Share your thoughts...'
              maxLength={1000}
              maxRows={20}
              rows={1}
              cols={1}
              isInvalid={isContentInvalid}
              errorMessage={formState?.errors?.content?.[0] ?? null}
              classNames={{
                errorMessage: 'border: none',
                label: 'text-red/50 dark:text-red/90',
                input: [
                  'bg-background',
                  '!text-textColor',
                  'placeholder:text-textColor/50',
                  'flex-1',
                ],
                innerWrapper: 'bg-background',
                inputWrapper: [
                  'shadow-xl',
                  '!bg-background',
                  'backdrop-blur-xl',
                  'backdrop-saturate-200',
                  'hover:bg-background',
                  'dark:hover:!bg-background',
                  'group-data-[focus=true]:!bg-background',
                  'dark:group-data-[focus=true]:!bg-background',
                  '!cursor-text',
                  '!border-transparent',
                ],
              }}
            />

            {isFormInvalid && (
              <div className='error flex flex-start w-full'>{formState?.errors?._form?.[0]}</div>
            )}

            <div className='flex flex-row items-center gap-4 mx-4 mb-4'>
              <Button
                isLoading={isPending}
                onPress={handleCancel}
                className='light:bg-[black/90] dark:bg-[white/90] text-background flex'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                isLoading={isPending}
                className='light:bg-[black/90] dark:bg-[white/90] text-background flex'
              >
                Comment
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  ) : null;
}
