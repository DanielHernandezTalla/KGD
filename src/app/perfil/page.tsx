'use client';
import { useContext } from 'react';
import type { NextPage } from 'next';
import { AuthContext } from '@/hooks/AuthContext';

import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { Status } from '@/components/atoms/Status';

const Perfil: NextPage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <MainLayout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <div className='flex flex-col justify-between md:flex-row'>
          <TitlePage title='Perfil' />
          <Button
            size='small'
            rounded
            variant='primary'
            text='Modificar'
            icon='pen'
            isNextLink
            href={`datos/personal/${user?.idPersonal}`}
            className='mt-4 self-end md:mt-0'
          />
        </div>
        <div className='grid gap-3 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
            <InfoPaciente title='Nombre' info={`${user?.nombre || 'No tiene'}`} />
            <InfoPaciente
              title='Apellido Paterno'
              info={`${user?.apellido_paterno || 'No tiene'}`}
            />
            <InfoPaciente
              title='Apellido Materno'
              info={`${user?.apellido_materno || 'No tiene'}`}
            />
            <InfoPaciente title='Correo' info={user?.correo_ingreso || 'No tiene'} />
            <InfoPaciente title='Tipo Personal' info={user?.tipo_de_usuario_nombre || 'No tiene'} />
            <div className='flex flex-col gap-3'>
              <b className='text-gray-600'>Estado</b>
              <Status
                status={user?.activo ? true : false}
                text={user?.activo ? 'Activo' : 'Inactivo'}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Perfil;
