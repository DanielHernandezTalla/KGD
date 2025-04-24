'use client';
import { Button, Icon } from '@/components/atoms/';
import { ComplexAssignment } from '@/interface/types';
import { useEffect, useState } from 'react';

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
  formatter?: (value: any) => any;
  complexAssignment?: ComplexAssignment;
}

const CustomInput = ({
  type,
  label,
  options,
  field,
  fullWidth,
  form: { touched, errors, setFieldValue },
  ...props
}: InputProps) => {
  const inputProps = {
    ...field,
    ...props
  };
  // select
  const [selected, setSelected] = useState(null as string | null);

  // multi select
  const [showMultiSelectOptions, setShowMultiSelectOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(field.value || []);

  const handleOptionClick = (optionValue: any) => {
    let newSelection;
    if (selectedOptions.includes(optionValue)) {
      newSelection = selectedOptions.filter((o: any) => o !== optionValue);
    } else {
      newSelection = [...selectedOptions, optionValue];
    }

    setSelectedOptions(newSelection);
    setFieldValue(field.name, newSelection); // Actualiza el valor en Formik
  };

  useEffect(() => {
    const selectedOption = options?.find((opt) => opt.value === field.value);
    if (selectedOption) {
      setSelected(selectedOption.label);
    } else {
      setSelected('');
    }
  }, [field.value, options]);

  return (
    <div className={fullWidth ? 'col-span-2' : ''}>
      <label htmlFor={field.name} className='mb-2 block text-sm font-bold text-gray-400'>
        {label}
      </label>
      {type === 'select' ? (
        <div className='relative w-full text-sm'>
          <input
            type='text'
            value={selected || ''}
            onChange={(e) => {
              const inputValue = e.target.value;
              setSelected(inputValue);

              // Si el input se vacía manualmente, reseteamos el campo en Formik
              if (inputValue === '') {
                setFieldValue(field.name, '');
              }
            }}
            disabled={props.disabled}
            onFocus={() => setShowMultiSelectOptions(true)}
            onBlur={() => setTimeout(() => setShowMultiSelectOptions(false), 150)}
            placeholder={`Selecciona ${label.toLowerCase()}...`}
            className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm   ${
              errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
            } focus:outline-none disabled:opacity-100 disabled:bg-gray-100`}
          />

          {errors[field.name] && (
            <div className='error flex items-center gap-2'>
              {' '}
              <Icon icon='alert' className='text-xl' /> {errors[field.name]}
            </div>
          )}

          {showMultiSelectOptions && (
            <ul className='absolute z-10 w-full bg-white border border-gray-200 rounded max-h-48 overflow-y-auto shadow-lg mt-1'>
              {options
                ?.filter((opt) => opt.label.toLowerCase().includes((selected || '').toLowerCase()))
                .map((opt, index) => (
                  <li
                    key={index}
                    className='px-3 py-2 cursor-pointer hover:bg-blue-100'
                    onMouseDown={() => {
                      // setFieldValue(field.name, opt.value);
                      // setSelected(opt.label);
                      // setShowMultiSelectOptions(false);
                      setFieldValue(field.name, opt.value);
                      setSelected(opt.label); // Mostramos el label en el input
                      setShowMultiSelectOptions(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              {options?.filter((opt) =>
                opt.label.toLowerCase().includes((selected || '').toLowerCase())
              ).length === 0 && <li className='px-3 py-2 text-gray-400'>Sin resultados</li>}
            </ul>
          )}
        </div>
      ) : type === 'textarea' ? (
        <textarea
          type={type}
          className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm text-blue-600  ${
            errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
          } focus:outline-none disabled:opacity-100`}
          {...inputProps}
        />
      ) : type === 'checkbox' ? (
        <input
          type={type}
          {...inputProps}
          className={`customCheck my-1 ${
            errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
          } focus:outline-none disabled:opacity-75 disabled:cursor-default`}
        />
      ) : type === 'selectmultiple' ? (
        <div className='min-h-[40px] rounded-lg border-2 border-gray-200'>
          <div
            className={`w-full mb-0 flex gap-2 px-2 py-2 ${props.disabled ? 'bg-gray-100' : ''}`}
            onClick={() => {
              if (!props.disabled) setShowMultiSelectOptions(!showMultiSelectOptions);
            }}
          >
            <div className='w-full flex items-center flex-wrap gap-2'>
              {Array.isArray(selectedOptions) && selectedOptions.length ? (
                selectedOptions.map((selectedOption, index) => (
                  <div
                    key={index}
                    className='flex items-center border-2 rounded-lg px-2 py-1 gap-1'
                  >
                    <span className='text-sm font-bold text-blue-600 cursor-default'>
                      {options?.[options?.findIndex((item) => item.value == selectedOption)]?.label}
                    </span>
                  </div>
                ))
              ) : (
                <div className='px-1 text-sm text-gray-400'>Sin elementos seleccionados</div>
              )}
            </div>
            <div>{!props.disabled && <Icon icon='arrowD'></Icon>}</div>
          </div>
          {!props.disabled && showMultiSelectOptions && (
            <div className='flex flex-col gap-1 px-2 py-2 pb-2 rounded-md w-full max-h-80 overflow-y-auto'>
              {options?.length &&
                options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option.value)}
                    className='cursor-pointer p-2 rounded-md hover:bg-gray-100'
                  >
                    <div className='flex gap-3 items-center'>
                      {selectedOptions.includes(option.value) ? (
                        <div className='w-4 h-4 border-solid border-blue-600 bg-blue-600 border-2 flex justify-center items-center p-2 rounded-md'>
                          <Icon icon='check' className='text-white'></Icon>
                        </div>
                      ) : (
                        <div className='w-4 h-4 border-solid border-gray-300 border-2 p-2 rounded-md'></div>
                      )}
                      {option.label}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : // NOTA: la propiedad complexAssigment no es reconocida por <input>. Quitar la tranferencia de propiedades implicita "{...inputProps}"
      // y solo pasar las propiedades correspondientes
      props.complexAssignment && type === 'text' ? (
        <div className='flex '>
          <input
            type={type}
            {...inputProps}
            value={props.formatter ? props.formatter(inputProps.value) : inputProps.value}
            disabled={props.complexAssignment.disabledInput || props.disabled}
            className={`w-full rounded-l-lg border-2 border-gray-200 bg-white p-2 text-sm   ${
              errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
            } focus:outline-none disabled:opacity-100 disabled:bg-gray-100`}
          />
          <Button
            type='button'
            size='small'
            variant='neutro'
            className='rounded-none rounded-r-lg border-l-0 disabled:bg-gray-100 disabled:border-gray-300'
            text={props.complexAssignment.buttonText}
            icon={props.complexAssignment.buttonIcon}
            onClick={() => {
              props.complexAssignment?.onClick((newValue: any) =>
                setFieldValue(field.name, newValue)
              );
            }}
            disabled={props.disabled}
          />
        </div>
      ) : (
        <input
          type={type}
          value={props.formatter ? props.formatter(inputProps.value) : inputProps.value}
          {...inputProps}
          className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm   ${
            errors[field.name] ? 'focus:border-red-300' : 'focus:border-blue-300'
          } focus:outline-none disabled:opacity-100 disabled:bg-gray-100`}
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
