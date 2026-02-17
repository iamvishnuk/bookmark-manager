import { createClient } from '@/lib/supabase/server';
import UserProfile from './user-profile';

const Header = async () => {
  const supbase = await createClient();
  const {
    data: { user }
  } = await supbase.auth.getUser();
  return (
    <header className='flex h-28 items-center justify-between'>
      <div className='flex flex-col'>
        <h2 className='text-2xl font-bold'>Bookmark Manager</h2>
      </div>
      <UserProfile user={user} />
    </header>
  );
};

export default Header;
