'use client';
import dynamic from 'next/dynamic';
const ThemeToggle = dynamic(() => import('../theme-toggle'), {
  ssr: false
});

const Footer = () => {
  return (
    <footer className='flex h-28 items-center justify-between border-t'>
      <div className='text-sm text-gray-600 dark:text-gray-500'>
        © {new Date().getFullYear()} Bookmark Manager. All rights reserved.
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
