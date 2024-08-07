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
}

const Search: React.FC<SearchProps> = ({
  showIcon,
  showBtnSearch,
  showFilter,
  className,
  disabled,
  getValue
}) => {
  const [value, setValue] = useState('');

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className={`flex w-full items-center rounded-lg border-2 bg-white px-4 py-2 ${disabled ? ' border-gray-50' : 'border-gray-100'}`}>
        {showIcon && (
          <span className='mr-4 text-2xl text-gray-300'>
            <Icon icon={'search'} />
          </span>
        )}
        <input
          disabled={disabled}
          className='text-md h-full w-full outline-none bg-white'
          type='text'
          placeholder='Buscar...'
          onChange={({ target }) => setValue(target.value)}
          onKeyPress={({ key }) => {
            if (key === 'Enter') {
              getValue({
                nombre: value
              });
            }
          }}
          value={value}
        />
        {showBtnSearch && (
          <Button
            text='Buscar'
            // type='button'
            variant='green'
            size='small'
            disabled={disabled}
            onClick={() => getValue({ nombre: value })}
          />
        )}
      </div>
      {showFilter && (
        <Button
          text='filtros'
          iconPosition='left'
          align='center'
          icon='filter'
          variant='secondary'
          size='large'
        />
      )}
    </div>
  );
};

export default Search;
