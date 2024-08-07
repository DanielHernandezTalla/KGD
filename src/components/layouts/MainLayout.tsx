'use client';
import { NavBar } from '@/components/organisms';
import { MouseEventHandler } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  full?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, onClick, full }) => {
  return (
    <>
      <main>
        <div
          className='relative flex max-h-screen overflow-hidden'
          onClick={(e) => {
            onClick && onClick(e);
          }}
        >
          <NavBar />

          <div className='m-auto max-h-screen min-h-screen w-full overflow-y-auto bg-slate-50 p-5 lg:p-10'>
            {!full ? (
              <div className='m-auto h-full w-full max-w-6xl pt-[72px] md:p-0'>{children}</div>
            ) : (
              <div className='m-auto h-full w-full pt-[72px] md:p-0'>{children}</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
