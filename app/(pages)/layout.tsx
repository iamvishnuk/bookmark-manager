import Header from '@/components/core/header';
import { ReactNode } from 'react';

type PagesLayoutProps = Readonly<{
  children: ReactNode;
}>;

const PagesLayout = ({ children }: PagesLayoutProps) => {
  return (
    <div className='mx-auto max-w-7xl px-2'>
      <Header />
      {children}
    </div>
  );
};

export default PagesLayout;
