'use client';
import { useRef, MutableRefObject } from 'react';
import cn from 'clsx';

import { usePagination, DOTS } from '@/hooks/usePagination';
import s from './Pager.module.css';
import { useRouter } from 'next/navigation';

interface PagerProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  children: React.ReactElement;
  className?: string;
}

const Pager: React.FC<PagerProps> = ({
  totalCount,
  siblingCount = 2,
  currentPage,
  pageSize,
  children
}) => {
  const router = useRouter();
  // console.log(router)

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (!paginationRange) {
    return <div className='flex flex-col gap-6 '>{children}</div>;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return <div className='flex flex-col gap-6 '>{children}</div>;
  }

  /**
   * Scroll to the top root of the component
   */
  const scrollTopContainer = () => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onPageChange = (page: number) => {
    // router.push({
    //     pathname: "",
    //     query: {
    //         ...router.query,
    //         page: page,
    //     },
    // });
    router.push('?page=' + page);
    // router.replace(`?page=${page}`);
  };

  const onNext = () => {
    if (currentPage < totalCount) {
      onPageChange(currentPage + 1);
      scrollTopContainer();
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scrollTopContainer();
    }
  };

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
    scrollTopContainer();
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  const firstPage = paginationRange[0];
  return (
    <div ref={containerRef} className='flex flex-col gap-6 '>
      {children}
      <div className='flex justify-center'>
        <ul className='flex flex-wrap items-center gap-2'>
          <li
            key={'previous'}
            className={cn({
              ['hidden']: currentPage === firstPage
            })}
            onClick={onPrevious}
          >
            <span className={s.arrowContainer}>
              <span className='cursor-pointer rounded-xl py-2 px-3 font-semibold text-blue-600 transition-colors hover:bg-blue-500 hover:text-white'>
                Anterior
              </span>
            </span>
          </li>

          {paginationRange.map((pageNumber, i) => {
            if (pageNumber === DOTS) {
              return (
                <li key={i} className='text-blue-400'>
                  &#8230;
                </li>
              );
            }

            return (
              <li key={i}>
                <button
                  key={i}
                  onClick={() => handlePageChange(Number(pageNumber))}
                  className={`
                ${
                  currentPage === pageNumber
                    ? 'bg-blue-500 text-white hover:brightness-110'
                    : 'bg-blue-200 text-blue-500'
                }
                flex h-8 w-auto min-w-[2rem] px-1 cursor-pointer items-center justify-center rounded-lg text-center text-sm font-bold 
                transition-colors hover:bg-blue-500 hover:text-white
              `}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          <li
            key={'next'}
            className={cn(s.paginationItem, {
              ['hidden']: currentPage === lastPage
            })}
            onClick={onNext}
          >
            <span className={s.arrowContainer}>
              <span className='cursor-pointer rounded-xl py-2 px-3 font-semibold text-blue-600 transition-colors hover:bg-blue-500 hover:text-white'>
                Siguiente
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pager;
