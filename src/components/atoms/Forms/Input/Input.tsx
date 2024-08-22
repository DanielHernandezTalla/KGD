'use client';
import { Icon } from '@/components/atoms/';
import { MultiSelect } from 'react-multi-select-component';
import { useState } from 'react';

interface InputProps {
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'selectmultiple'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'textarea';
  label: string;
  name?: string;
  options?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  field?: any;
  form?: any;
  fullWidth?: boolean;
  disabled?: boolean;
}

const CustomInput = ({
  type,
  label,
  options,
  field,
  fullWidth,
  form: { touched, errors },
  ...props
}: InputProps) => {
  const inputProps = {
    ...field,
    ...props
  };
  const [myValue, setMyValue] = useState(inputProps?.value);

  const handleMouseDown = (event: any) => {
    console.log(event.target);

    let value = event.target.dataset.value;
    console.log(value);

    let values: [] = value.split(',');
    let newArr: any = myValue;

    if (values[values.length - 1] === '') return;

    if (!myValue.find((element: any) => element == values[values.length - 1]))
      newArr.push(values[values.length - 1]);
    else newArr = myValue.filter((element: any) => element != values[values.length - 1]);

    setMyValue(newArr);
    event.target.value = newArr;
  };

  const handleClick = (event: any) => {
    let id = event.target.dataset.id;
    let newArr = myValue.filter((element: any) => element != id);

    setMyValue(newArr);
    // let select = document.getElementsByName('especialidades')[1];
    // console.log(inputProps);

    // console.log(select.value);
    // select.nodeValue = newArr;
  };

  return (
    <div className={fullWidth ? 'col-span-2' : ''}>
      <label htmlFor={field.name} className='mb-2 block text-sm font-bold text-gray-400'>
        {label}
      </label>
      {type === 'select' ? (
        <select
          className='w-full rounded-lg border-2 border-gray-200 p-2 text-gray-500 disabled:opacity-50'
          {...inputProps}
        >
          <option value=''>-- Selecciona {label} --</option>
          {options?.length &&
            options.map((input, index) => (
              <option key={index} value={input?.value}>
                {input?.label}
              </option>
            ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          type={type}
          className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm text-blue-800  ${
            errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
          } focus:outline-none disabled:opacity-50`}
          {...inputProps}
        />
      ) : type === 'checkbox' ? (
        <input
          type={type}
          {...inputProps}
          className={`customCheck my-1 ${
            errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
          } focus:outline-none disabled:opacity-50`}
        />
      ) : type === 'selectmultiple' ? (
        <div>
          <div className='w-full mb-4 flex flex-wrap gap-2 rounded-lg border-2 border-gray-200 p-2 text-gray-500 disabled:opacity-50'>
            {Object.values(myValue)?.length ? (
              Object.values(myValue).map((input, index) => (
                <div key={index} className='flex items-center border rounded-lg px-2 gap-1'>
                  <span className=' text-sm  text-blue-800'>
                    {options?.[options?.findIndex((item) => item.value == input)].label}
                  </span>
                  <span
                    data-id={input}
                    className='block h-6 w-0 text-center leading-[21px] cursor-pointer'
                    // onClick={handleClick}
                  >
                    {/* × */}
                  </span>
                </div>
              ))
            ) : (
              <div className='flex items-center border rounded-lg px-2 gap-1'>
                <span className=' text-sm  text-blue-800'>Sin especialidades asignadas</span>
                <span className='block h-6 w-0 text-center leading-[21px] cursor-pointer'></span>
              </div>
            )}
          </div>
          <select
            className='w-full rounded-lg border-2 border-gray-200 p-2 text-gray-500 disabled:opacity-50'
            {...inputProps}
            multiple
            onMouseDown={handleMouseDown}
          >
            <option value=''>-- Selecciona {label} --</option>
            {options?.length &&
              options.map((input, index) => (
                <option key={index} value={input?.value} data-value={input?.value}>
                  {input?.label}
                </option>
              ))}
          </select>
          <input type='hidden' {...inputProps} value='40' />
        </div>
      ) : (
        <input
          type={type}
          {...inputProps}
          className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm text-blue-800  ${
            errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
          } focus:outline-none disabled:opacity-50`}
        />
      )}

      {touched[field.name] && errors[field.name] && (
        <div className='error flex items-center gap-2'>
          {' '}
          <Icon icon='alert' className='text-xl' /> {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
