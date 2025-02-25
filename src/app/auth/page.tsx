'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

const Auth = () => {
  const rutasToCheck: string[] = [
    'auth.auth.index',
    'auth.usuarios.index',
    'auth.rolespermisos.index',
    'auth.roles.index'
  ];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Autenticación KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <Layout>
      <LayoutPermiso checked={checked} name='auth.auth.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Autenticación' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            {checked['auth.usuarios.index'] && (
              <ButtonData icon='userGroup' text='Usuarios' href='/auth/usuarios' />
            )}

            {checked['auth.rolespermisos.index'] && (
              <ButtonData icon='faUserShield' text='Roles y permisos' href='/auth/rolesYPermisos' />
            )}

            {checked['auth.roles.index'] && (
              <ButtonData icon='settings' text='Roles' href='/auth/roles' />
            )}
            {/* <ButtonData icon='tableList' text='Categoría permisos' href='/auth/tipoPermisos' />
          <ButtonData icon='faFileShield' text='Permisos' href='/auth/permisos' />
          <ButtonData icon='faArrowsToDot' text='Eventos' href='/auth/permisos' /> */}
            {/* <ButtonData icon='faClipboardList' text='Tipo eventos' href='/auth/tipoEventos' /> */}
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Auth;
