"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreatePostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title should contain at least 3 characters.')
    .max(150, 'Title should contain maximum 150 characters.')
    .regex(/^[A-Za-z0-9 _]+$/, "Please use letters and numbers only."),
  content: z
    .string()
    .min(3, 'Content should contain at least 3 characters.')
    .max(5000, 'Content should contain maximum 1000 characters.'),
});

interface CreatePostFormState {
  errors?: {
    title?: string[] | undefined;
    content?: string[] | undefined;
    _form?: string[] | undefined;
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  const result = CreatePostSchema.safeParse({
    title,
    content
  })

  if (!result.success) {
    const errors = result.error.flatten()?.fieldErrors;
    return {
      errors: {
        ...errors,
        _form: [],
      },
    }
  }

  const session = await auth();

  if (!session || !session?.user) {
    return {
      errors: {
        title: [],
        content: [],
        _form: ["You must sign in first!"],
      }
    };
  }

  const topic = await db.topic.findFirst({ where: { slug } });
  if (!topic) {
    return {
      errors: {
        title: [],
        content: [],
        _form: ["Cannot find topic."],
      }
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user?.id ?? "",
        topicId: topic.id,
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          title: [],
          content: [],
          _form: [err.message],
        }
      };
    } else {
      return {
        errors: {
          title: [],
          content: [],
          _form: ["Something went wrong."],
        }
      };
    }
  }

  revalidatePath(paths.topic(slug));

  redirect(paths.post(slug, post.id));
}
