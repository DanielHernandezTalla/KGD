import React from 'react';

interface InfoIndexProps {
  title: string;
  description: string;
}

export default function InfoIndex({ title, description }: InfoIndexProps) {
  return (
    <div className='flex w-full flex-col gap-2 rounded-xl border-2 border-gray-100 bg-white p-4'>
      <h3 className='w-full text-xl font-semibold text-blue-600'>{title}</h3>
      {description !== 'undefined' && <span className='text-4xl text-gray-500'>{description}</span>}
    </div>
  );
};
