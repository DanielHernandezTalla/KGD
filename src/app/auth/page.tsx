import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Autenticación KGD'
};

const Auth = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Autenticación' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='userGroup' text='Usuarios' href='/auth/usuarios' />
          <ButtonData icon='faUserShield' text='Roles y permisos' href='/auth/rolesYPermisos' />
          <ButtonData icon='settings' text='Roles' href='/auth/roles' />
          {/* <ButtonData icon='tableList' text='Categoría permisos' href='/auth/tipoPermisos' />
          <ButtonData icon='faFileShield' text='Permisos' href='/auth/permisos' />
          <ButtonData icon='faArrowsToDot' text='Eventos' href='/auth/permisos' /> */}
          <ButtonData icon='faClipboardList' text='Tipo eventos' href='/auth/tipoEventos' />
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
