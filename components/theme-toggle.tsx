'use client';

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <Button
      onClick={toggleTheme}
      variant='ghost'
      size='icon'
      className='hover:cursor-pointer'
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggle;
