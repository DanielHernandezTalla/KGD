import React from 'react';
import { StatusBullet } from '@/components/atoms';
import Link from 'next/link';

interface CitaProps {
  id: string;
  href?: string;
  status: boolean;
  index?: number;
  group?: string;
  terapeut?: string;
  cita: any;
}

export const Cita = ({ id = '', index, status = false, cita }: CitaProps) => {
  return (
    <div className='w-full overflow-hidden rounded-2xl border-2 border-gray-200'>
      <Link href={`cita/${id}`}>
        <div className='flex items-center justify-between p-4'>
          <span className='text-lg'>
            Ingreso {index} / {id}
          </span>
          <StatusBullet
            status={!status ? 'success' : 'disabled'}
            size='medium'
            text={status ? 'Cerrado' : 'Abierto'}
          />
        </div>
        <div className='flex bg-gray-100 py-3 px-5'>
          <div className='w-1/2'>
            <b className='text-gray-600'>Médico</b>
            <p className='truncate text-xs text-slate-600' title={cita.medico_remitente}>
              {cita.medico_remitente || 'No hay'}
            </p>
          </div>
          <div className='w-2/2'>
            <b className='text-gray-600'>Fecha</b>
            <p className='text-xs text-slate-600'>{cita.fecha_hora}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
