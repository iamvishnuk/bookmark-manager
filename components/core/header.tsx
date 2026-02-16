import { User } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className='flex h-28 items-center justify-between'>
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold'>Bookmark Manager</h2>
      </div>
      <div>
        <Button
          variant='ghost'
          size='icon-lg'
          className='hover:cursor-pointer'
        >
          <User size={35} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
