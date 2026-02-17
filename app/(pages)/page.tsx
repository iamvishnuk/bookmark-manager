'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import BookmarkCard from '@/components/bookmark/bookmark-card';
import BookmarkForm from '@/components/bookmark/bookmark-form';
import { Button } from '@/components/ui/button';

export type Bookmark = {
  id: string;
  title: string;
  url: string;
};

const dummyBookmarks: Bookmark[] = [
  { id: '1', title: 'Google', url: 'https://www.google.com' },
  { id: '2', title: 'GitHub', url: 'https://github.com' },
  { id: '3', title: 'Stack Overflow', url: 'https://stackoverflow.com' },
  { id: '4', title: 'LeetCode', url: 'https://leetcode.com' },
  { id: '5', title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
  { id: '6', title: 'YouTube', url: 'https://www.youtube.com' },
  { id: '7', title: 'Next.js Docs', url: 'https://nextjs.org/docs' },
  { id: '8', title: 'Supabase', url: 'https://supabase.com' },
  { id: '9', title: 'Vercel', url: 'https://vercel.com' },
  { id: '10', title: 'Tailwind CSS', url: 'https://tailwindcss.com' }
];

export default function Home() {
  const [show, setShow] = useState(false);
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
        <div className='grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {dummyBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
