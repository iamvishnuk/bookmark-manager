'use client';

import { Bookmark } from '@/types';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import BookmarkForm from './bookmark-form';
import BookmarkCard from './bookmark-card';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type BookmakrListProps = {
  iniitalData: Bookmark[];
};

const BookmarkList = ({ iniitalData }: BookmakrListProps) => {
  const supabase = createClient();

  const [show, setShow] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(iniitalData);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const channel = supabase
      .channel('bookmark-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
          }
          if (payload.eventType === 'UPDATE') {
            setBookmarks((prev) =>
              prev.map((b) =>
                b.id === (payload.new as Bookmark).id
                  ? (payload.new as Bookmark)
                  : b
              )
            );
          }
          if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.url.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className=''>
      <div className='flex h-20 flex-col items-center justify-between gap-3 lg:flex-row'>
        <div className='w-full'>
          <div className='relative w-full'>
            <Search
              className='absolute top-2 left-1.5 text-gray-600 dark:text-gray-500'
              size={20}
            />
            <Input
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search...'
              className='w-full pl-8 text-gray-600 outline-none placeholder:text-gray-600 focus-visible:ring-1 dark:text-gray-500 dark:placeholder:text-gray-500 dark:focus-visible:ring-gray-800'
            />
          </div>
        </div>
        <Button
          variant='outline'
          className='w-full hover:cursor-pointer lg:w-fit'
          onClick={() => setShow(true)}
        >
          Add Bookmark
        </Button>
        <BookmarkForm
          isEdit={false}
          open={show}
          setOpen={setShow}
          initialData={null}
        />
      </div>
      <div className='min-h-[calc(100vh-20rem)]'>
        {filteredBookmarks.length === 0 ? (
          <div className='flex h-20 items-center justify-center'>
            {query
              ? 'No bookmarks match your search.'
              : 'No bookmarks yet. Add one!'}
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark.id}
                bookmark={bookmark}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkList;
