import Link from 'next/link';
//import { AuthContext } from '@/context/auth/AuthContext';
import { useContext } from 'react';
import { TipoPersonal } from '@/utils/types';
import { Icon } from '@/components/atoms/';
import { ICON } from '@/interface/types';

interface QuickActionProps {
  icon: ICON;
  text: string;
  href: string;
  disabled?: boolean;
}

export default function QuickAction({ icon, text, href, disabled = false }: QuickActionProps) {
  //const { user } = useContext(AuthContext);

  if (disabled) {
    return (
      <div
        className={`w-full overflow-hidden rounded-xl border-2 border-slate-100 bg-white p-3`}
      >
          <div>
              <div className='grid place-items-center rounded-xl rounded-t-lg bg-gray-100 p-8'>
                <Icon className='text-7xl text-gray-300' icon={icon} />
              </div>
              <span className='flex justify-center py-4 text-lg font-semibold text-gray-600'>
                {text}
              </span>
          </div>
      </div>
    );
  }
  else {
    return (
      <div
        className={`w-full overflow-hidden rounded-xl border-2 border-slate-100 bg-white p-3 duration-100 ease-in hover:shadow-sm md:hover:-translate-y-1`}
      >
          <Link href={href}>
              <div className='grid place-items-center rounded-xl rounded-t-lg bg-blue-100 p-8'>
                <Icon className='text-7xl text-blue-800' icon={icon} />
              </div>
              <span className='flex justify-center py-4 text-lg font-semibold text-gray-600'>
                {text}
              </span>
          </Link>
      </div>
    );
  }

  /*
  return (
    <div
      className={`w-full overflow-hidden rounded-xl border-2 border-slate-100  ${
        user?.tipo === TipoPersonal.administrador || user?.tipo === TipoPersonal.secretaria
          ? 'bg-white p-3 duration-100 ease-in hover:shadow-sm md:hover:-translate-y-1'
          : 'bg-slate-300'
      }`}
    >
      {user?.tipo === TipoPersonal.administrador || user?.tipo === TipoPersonal.secretaria ? (
        <Link href={href}>
          <a>
            <div className='grid place-items-center rounded-xl rounded-t-lg bg-blue-100 p-8'>
              <Icon className='text-7xl text-blue-800' icon={icon} />
            </div>
            <span className='flex justify-center py-4 text-lg font-semibold text-gray-600'>
              {text}
            </span>
          </a>
        </Link>
      ) : (
        <>
          <div className='grid place-items-center rounded-xl rounded-t-lg bg-slate-300 p-8'>
            <Icon className='text-7xl text-slate-500' icon={icon} />
          </div>
          <span className='flex justify-center py-4 text-lg font-medium text-gray-600'>
            {text}
          </span>
        </>
      )}
    </div>
  );*/
};