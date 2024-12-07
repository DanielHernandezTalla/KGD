import React from 'react';
import Icon from '../Icon';

interface PermisoProps {
  id: string;
  select_id: string;
  nombre: string;
  url: string;
  onClick: (() => void) | ((event: any) => void);
  onDelete: (() => void) | ((event: any) => void);
}

export const Permiso = ({ id = '', select_id, nombre, url, onClick, onDelete }: PermisoProps) => {
  return (
    <div
      id='contenedor'
      className={
        id === select_id
          ? 'group w-full rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-slate-100 relative'
          : 'group w-full rounded-lg border-2 border-gray-200 hover:bg-slate-100 relative'
      }
      onClick={onClick}
    >
      <div className='rounded-lg flex justify-between items-center py-2 ps-5 pe-2 hover:bg-slate-100'>
        <div className=''>
          <b className='truncate text-gray-600'>{nombre} </b>
          <p className='text-xs text-slate-600' title={url}>
            {url}
          </p>
        </div>
        {/* <div className=''> */}
        <div className='absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <button
            id='button'
            className='grid rounded bg-red-100 p-2'
            onClick={(e) => {
              e.stopPropagation(); // Detener la propagación del evento
              onDelete(e); // Llamar a la función onDelete
            }}
          >
            <Icon className='text-xs text-red-800' icon={'trash'} />
          </button>
        </div>
      </div>
    </div>
  );
};
