'use client';
import { Icon, Button } from '@/components/atoms';
import { useState } from 'react';

interface SearchProps {
  showIcon?: boolean;
  showBtnSearch?: boolean;
  showFilter?: boolean;
  className?: string;
  disabled?: boolean;
  getValue: (value: any) => void;
  data: any;
}

const SearchSelect: React.FC<SearchProps> = ({
  showIcon,
  showBtnSearch,
  showFilter,
  className,
  disabled,
  getValue,
  data
}) => {
  const [value, setValue] = useState('');

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className='flex w-full items-center rounded-lg border-2 border-gray-100 bg-white px-4 py-2'>
        {showIcon && (
          <span className='mr-4 text-2xl text-gray-300'>
            <Icon icon={'search'} />
          </span>
        )}
        <select
          className=' mr-4 block w-full rounded-lg bg-white p-2.5 text-sm text-gray-900'
          value={value}
          onChange={({ target }) => setValue(target.value)}
        >
          <option key={-1} value=''>
            En general
          </option>
          {data?.map((element: any) => (
            <option key={element.iD_ROLE} value={element.iD_ROLE}>
              {element.role}
            </option>
          ))}
        </select>
        {showBtnSearch && (
          <Button
            text='Buscar'
            type='button'
            variant='green'
            size='small'
            disabled={disabled}
            onClick={() => getValue({ rol: value })}
          />
        )}
      </div>
    </div>
  );
};

export default SearchSelect;
