import { z } from "zod";

export const topicSchema = z.object({
  title: z
    .string()
    .min(3, 'Title should contain at least 3 characters.')
    .max(150, 'Title should contain maximum 150 characters.')
    .regex(/^[a-z0-9_]+$/, "Please use lowered letters and numbers only."),
  description: z
    .string()
    .min(3, 'Description should contain at least 3 characters.')
    .max(300, 'Description should contain maximum 300 characters.'),
});
