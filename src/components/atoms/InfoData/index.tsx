import clsx from 'clsx';
import React from 'react';

interface InfoDataProps {
  title: string;
  info: string;
  className?: string;
}

export const InfoData = ({ title, info, className }: InfoDataProps) => {
  return (
    <div className={clsx(className, 'flex flex-col gap-3')}>
      <b className='truncate text-gray-600' title={title}>
        {title}
      </b>
      <div className='w-full rounded-xl bg-gray-100 p-3'>
        <p className='truncate font-semibold text-gray-500' title={info}>
          {info}
        </p>
      </div>
    </div>
  );
};
