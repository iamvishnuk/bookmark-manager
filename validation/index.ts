import * as z from 'zod';

export const BookmarkSchema = z.object({
  title: z
    .string({
      error: (iss) =>
        iss.input === undefined ? 'Title is required' : 'Enter a valide title'
    })
    .min(1, 'Title is required')
    .max(100, 'Title must be at most 100 character'),
  url: z
    .string({
      error: (iss) =>
        iss.input === undefined ? 'url is required' : 'Enter valide url'
    })
    .min(1, 'Url is required')
});
export type TBookMarkSchema = z.infer<typeof BookmarkSchema>;
