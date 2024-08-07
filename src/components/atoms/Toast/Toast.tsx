'use client';
import { useState, useEffect } from 'react';
import { Button, Icon } from '@/components/atoms/';
import { ICON } from '@/interface/types';

export type ToastIcon = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  icon?: ToastIcon;
  title?: string;
  message?: string;
  permanent?: boolean;
}

export default function Toast({ title, message, icon, permanent = false }: ToastProps) {
  const [hide, setHide] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // useEffect(() => {
  //   if (!permanent) {
  //     setTimeout(() => {
  //       // activar el fade-out
  //       setFadeOut(true);
  //       setTimeout(() => {
  //         // ocultar
  //         setHide(true);
  //       }, 1000);
  //     }, 3000);
  //   }
  // }, []);
  useEffect(() => {
    if (!permanent) {
      const timeout1 = setTimeout(() => {
        // activar el fade-out
        setFadeOut(true); // Activar la animación de fade-out

        const timeout2 = setTimeout(() => {
          // ocultar
          setHide(true); // Ocultar el componente después de la animación de fade-out
        }, 1000);

        // Limpiar el timeout2 al desmontar o al cambiar permanent
        return () => clearTimeout(timeout2);
      }, 3000);

      // Limpiar el timeout1 al desmontar o al cambiar permanent
      return () => clearTimeout(timeout1);
    }
  }, [permanent]); // Ahora depende de permanent

  let currentIcon: ICON | undefined = undefined;
  let currentColor = 'text-gray-500';
  let currentBgColor = 'bg-gray-200';

  switch (icon) {
    case 'success':
      currentIcon = 'check';
      currentColor = 'text-green-600';
      currentBgColor = 'bg-green-600';
      break;
    case 'error':
      currentIcon = 'xmark';
      currentColor = 'text-red-600';
      currentBgColor = 'bg-red-600';
      break;
    case 'info':
      currentIcon = 'info';
      currentColor = 'text-blue-500';
      currentBgColor = 'bg-blue-500';
      break;
    case 'warning':
      currentIcon = 'exclamation';
      currentColor = 'text-amber-500';
      currentBgColor = 'bg-amber-500';
      break;
  }

  // divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-700
  return (
    <>
      {!hide && (
        <div
          className={`relative flex items-center w-full max-w-sm min-h-20 p-4 pr-6 space-x-4 rtl:space-x-reverse text-gray-500 bg-white rounded-lg shadow-xl dark:text-gray-400 space-x
           dark:bg-gray-800 hover:scale-105 transition-opacity duration-1000 ease-in-out ${
             fadeOut ? 'opacity-0' : 'opacity-100'
           }`}
          role='alert'
        >
          <div className={'w-4 h-full absolute left-0 rounded-l-lg ' + currentBgColor}></div>
          {currentIcon && (
            <svg
              className={'w-7 h-7 mx-2 ' + currentColor}
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 20'
            >
              <Icon className='text-4xl' icon={currentIcon} />
            </svg>
          )}

          <div className='w-full'>
            <div className='text-m font-bold line-clamp-1 hover:line-clamp-2'>{title}</div>
            <div className='text-sm font-normal line-clamp-2 hover:line-clamp-6'>{message}</div>
          </div>

          <Button
            className='absolute right-0 top-0 px-1 py-1 h-8 w-8 text-gray-600 hover:bg-gray-100'
            onClick={() => {
              setHide(true);
            }}
            text='x'
            variant='transparent'
            size='small'
          />
        </div>
      )}
    </>
  );
}
