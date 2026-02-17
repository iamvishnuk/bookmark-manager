import { Bookmark } from '@/app/(pages)/page';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Copy, Edit, Ellipsis, ExternalLink, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import BookmarkForm from './bookmark-form';
import ConfirmationDialog from '../confirm-dialog';

type BookmarkCardProps = {
  bookmark: Bookmark;
};

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookmarkData, setBookmarkData] = useState<Bookmark | null>(null);

  return (
    <div
      key={bookmark.id}
      className='border-border bg-muted h-fit space-y-5 rounded-md border p-3 shadow-sm dark:bg-gray-950/50'
    >
      <div className='relative flex items-center justify-between'>
        <p className='line-clamp-1 flex-1 text-base text-gray-600 dark:text-gray-300'>
          {bookmark.title}
        </p>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='hover:cursor-pointer'
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white dark:bg-gray-950'>
            <DropdownMenuItem
              onClick={() => {
                setBookmarkData(bookmark);
                setShow(!show);
              }}
            >
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy />
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowConfirmation(!showConfirmation)}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link
        href={bookmark.url}
        className='group flex items-center pr-2 text-sm text-gray-600 dark:text-gray-500'
        target='_blank'
      >
        <p className='line-clamp-1 flex-1'>{bookmark.url}</p>
        <ExternalLink
          size={20}
          className='ml-2 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100'
        />
      </Link>
      <BookmarkForm
        isEdit={true}
        initialData={bookmarkData}
        open={show}
        setOpen={setShow}
      />
      <ConfirmationDialog
        show={showConfirmation}
        setShow={setShowConfirmation}
        execute={() => {}}
      />
    </div>
  );
};

export default BookmarkCard;
