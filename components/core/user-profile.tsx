'use client';
import { LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type UserProfileProps = {
  user: SupabaseUser | null;
};

const UserProfile = ({ user }: UserProfileProps) => {
  const router = useRouter();
  const supbase = createClient();

  const handleLogout = async () => {
    await supbase.auth.signOut();
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='hover:cursor-pointer'
        >
          <User size={35} />
          {user?.user_metadata.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white dark:bg-gray-950'>
        <DropdownMenuItem
          onClick={handleLogout}
          data-variant='destructive'
          className='hover:cursor-pointer'
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
