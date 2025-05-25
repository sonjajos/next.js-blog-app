'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(3, 'Please enter at least 3 characters.')
    .max(5000, 'Content should contain maximum 5000 characters.'),
});

interface CreateCommentFormState {
  errors?: {
    content?: string[] | undefined;
    _form?: string[] | undefined;
  };
}

export async function createComment(
  slug: string,
  postId: string,
  parentId: string | null,
  formState: CreateCommentFormState,
  formData: FormData,
) {
  // TODO: revalidate post page
  // const { slug, postId, parentId } = props;
  const content = formData.get('content');

  const result = CreateCommentSchema.safeParse({
    content,
  });

  if (!result.success) {
    const errors = result.error.flatten()?.fieldErrors;
    return {
      errors: {
        ...errors,
        _form: [],
      },
      success: false,
    };
  }

  const session = await auth();

  if (!session || !session?.user) {
    return {
      errors: {
        content: [],
        _form: ['You must sign in first!'],
      },
      success: false,
    };
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        userId: session.user?.id ?? '',
        parentId,
        postId,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          content: [],
          _form: [err.message],
        },
        success: false,
      };
    } else {
      return {
        errors: {
          content: [],
          _form: ['Something went wrong.'],
        },
        success: false,
      };
    }
  }

  revalidatePath(paths.post(slug, postId));

  return {
    errors: {
      content: [],
      _form: [],
    },
    success: true,
  };
}
