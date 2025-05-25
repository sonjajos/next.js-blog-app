'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { topicSchema } from '@/utils/schema';
import { revalidatePath } from 'next/cache';

interface EditTopicFormState {
  success?: boolean;
  errors?: {
    title?: string[] | undefined;
    description?: string[] | undefined;
    _form?: string[] | undefined;
  };
}

export async function editTopic(slug: string, formState: EditTopicFormState, formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');

  const result = topicSchema.safeParse({
    title,
    description,
  });

  if (!result.success) {
    const errors = result.error.flatten()?.fieldErrors;
    return {
      success: false,
      errors: {
        ...errors,
        _form: [],
      },
    };
  }

  const session = await auth();

  if (!session || !session?.user) {
    return {
      success: false,
      errors: {
        title: [],
        description: [],
        _form: ['You must sign in first!'],
      },
    };
  }

  try {
    await db.topic.update({
      where: { slug, adminId: session.user.id },
      data: {
        slug: result?.data?.title,
        description: result?.data?.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        success: false,
        errors: {
          title: [],
          description: [],
          _form: [err.message],
        },
      };
    } else {
      return {
        success: false,
        errors: {
          title: [],
          description: [],
          _form: ['Something went wrong.'],
        },
      };
    }
  }

  revalidatePath(paths.home());
  revalidatePath(paths.topic(slug));

  return {
    success: true,
    errors: {},
  };
}
