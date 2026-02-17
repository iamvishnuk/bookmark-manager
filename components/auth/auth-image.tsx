'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const AuthImage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Image
      src={isDark ? '/home-page.png' : '/home-page-white.png'}
      alt='Bookmark home page'
      className={cn(
        'rounded-lg border',
        isDark
          ? 'mask-r-from-70% mask-b-from-80%'
          : 'mask-r-from-70% mask-b-from-50%'
      )}
      width={1900}
      height={1000}
    />
  );
};

export default AuthImage;
