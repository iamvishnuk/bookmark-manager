'use server';

import { createClient } from '@/lib/supabase/server';
import { TBookMarkSchema } from '@/validation';
import { revalidatePath } from 'next/cache';

export const addBookmarkAction = async (bookmark: TBookMarkSchema) => {
  const supbase = await createClient();
  const {
    data: { user }
  } = await supbase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supbase.from('bookmarks').insert({
    ...bookmark,
    user_id: user.id
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
};

export const updateBookmarkAction = async (
  bookmark: TBookMarkSchema,
  id: string
) => {
  const supbase = await createClient();
  const {
    data: { user }
  } = await supbase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supbase
    .from('bookmarks')
    .update({ title: bookmark.title, url: bookmark.url })
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
};

export const deleteBookmarkAction = async (id: string) => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase.from('bookmarks').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/');
};
