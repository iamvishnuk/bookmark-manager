import BookmarkList from '@/components/bookmark/bookmark-list';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return <BookmarkList iniitalData={bookmarks || []} />;
}
