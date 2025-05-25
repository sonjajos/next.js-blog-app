'use client';

import { createPost } from '@/actions/create-post';
import { useActionState, useRef, useTransition } from 'react';
import { Button, Input, Textarea } from '@heroui/react';

interface AddPostFormProps {
  slug: string;
}

export default function AddPostForm({ slug }: AddPostFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  // binding extra params that will be passed to server action
  const [formState, action] = useActionState(createPost.bind(null, slug), {
    errors: {
      _form: [],
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };

  const isTitleInvalid = (formState?.errors?.title?.length ?? 0) > 0;
  const isContentInvalid = (formState?.errors?.content?.length ?? 0) > 0;
  const isFormInvalid = (formState?.errors?._form?.length ?? 0) > 0;

  return (
    <div className='flex flex-col items-center justify-center p-[2px] w-full min-w-[300px]'>
      <div className='flex flex-col gap-4 p-8 w-full items-center justify-center flex-1'>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className='w-full flex flex-col gap-4 items-center justify-center'
        >
          <Input
            type='text'
            name='title'
            label='Title'
            placeholder='Enter title...'
            isInvalid={isTitleInvalid}
            errorMessage={formState?.errors?.title?.[0] ?? null}
            classNames={{
              label: 'text-red/50 dark:text-red/90',
              input: [
                '!bg-background',
                '!text-textColor',
                'placeholder:text-textColor/50',
                'flex-1',
              ],
              innerWrapper: '!bg-background',
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
                'border-[1px] border-overlay',
              ],
            }}
          />
          <Textarea
            label='Content'
            name='content'
            placeholder='Enter content...'
            maxLength={1000}
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
                'border-[1px] border-overlay',
              ],
            }}
          />

          {isFormInvalid && (
            <div className='error flex flex-start w-full'>{formState?.errors?._form?.[0]}</div>
          )}

          <Button
            type='submit'
            isLoading={isPending}
            className='light:bg-[black/90] dark:bg-[white/90] text-background w-full'
          >
            Create Post
          </Button>
        </form>
      </div>
    </div>
  );
}
