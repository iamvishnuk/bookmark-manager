import AuthImage from '@/components/auth/auth-image';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='grid min-h-svh grid-cols-1 lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link
            href='/'
            className='flex items-center gap-2 font-medium'
          >
            <Image
              src={'/bookmark-manager.svg'}
              alt='Bookmark manager'
              width={40}
              height={40}
            />
            <h3 className='text-lg font-bold'>
              Bookmark <span className='text-blue-500'>Manager</span>
            </h3>
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>{children}</div>
        </div>
      </div>
      <div className='hidden items-center lg:flex'>
        <AuthImage />
      </div>
    </div>
  );
};

export default AuthLayout;
