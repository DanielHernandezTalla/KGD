'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { IStaticMethods } from 'preline/preline';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import('preline/preline');
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }, [path]);

  return (
    <div className='relative'>
      <select
        multiple
        data-hs-select='{
      "placeholder": "Selecciona una opción...",
      "toggleTag": "<button type=\"button\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-600 focus:ring-blue-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
      "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-slate-900 dark:border-gray-700",
      "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-gray-200 dark:focus:bg-slate-800",
      "mode": "tags",
      "tagsClasses": "relative ps-0.5 pe-9 min-h-[46px] flex items-center flex-wrap text-nowrap w-full border border-gray-200 rounded-lg text-start text-sm focus:border-blue-600 focus:ring-blue-600 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
      "tagsItemTemplate": "<div class=\"flex flex-nowrap items-center relative z-10 bg-white border border-gray-200 rounded-full p-1 m-1 dark:bg-slate-900 dark:border-gray-700\"><div class=\"size-6 me-1\" data-icon></div><div class=\"whitespace-nowrap\" data-title></div><div class=\"inline-flex flex-shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm dark:bg-gray-700/50 dark:hover:bg-gray-700 dark:text-gray-400 cursor-pointer\" data-remove><svg class=\"flex-shrink-0 size-3\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg></div></div>",
      "tagsInputClasses": "absolute inset-0 w-full py-3 px-4 pe-9 flex-1 text-sm rounded-lg focus-visible:ring-0 dark:bg-slate-900 dark:text-gray-400",
      "optionTemplate": "<div class=\"flex items-center\"><div class=\"size-8 me-2\" data-icon></div><div><div class=\"text-sm font-semibold text-gray-800 dark:text-gray-200\" data-title></div><div class=\"text-xs text-gray-500\" data-description></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-4 text-blue-800\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>"
    }'
        className='hidden'
      >
        <option value=''>Choose</option>
        <option
          selected
          value='1'
          data-hs-select-option='{
        "description": "chris",
        "icon": "<img class=\"inline-block rounded-full\"  width=\"24\" height=\"24\" src=\"https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
      }'
        >
          Christina
        </option>

        <option
          value='2'
          data-hs-select-option='{
        "description": "david",
        "icon": "<img class=\"inline-block rounded-full\"  width=\"24\" height=\"24\" src=\"https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
      }'
        >
          David
        </option>

        <option
          value='3'
          data-hs-select-option='{
        "description": "alex27",
        "icon": "<img class=\"inline-block rounded-full\"  width=\"24\" height=\"24\" src=\"https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
      }'
        >
          Alex
        </option>

        <option
          value='4'
          data-hs-select-option='{
        "description": "samia_samia",
        "icon": "<img class=\"inline-block rounded-full\" width=\"24\" height=\"24\" src=\"https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80\" />"
      }'
        >
          Samia
        </option>
      </select>

      <div className='absolute top-1/2 end-3 -translate-y-1/2'>
        <svg
          className='flex-shrink-0 size-3.5 text-gray-500 dark:text-gray-500'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path d='m7 15 5 5 5-5' />
          <path d='m7 9 5-5 5 5' />
        </svg>
      </div>
    </div>
  );
}
