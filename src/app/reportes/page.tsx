'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

const Reportes = () => {
  const rutasToCheck: string[] = ['reportes.reportes.index'];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Autenticación KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <Layout>
      <LayoutPermiso checked={checked} name='reportes.reportes.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Reportes' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            <ButtonData icon='faCartArrowDown' text='Recepción' href='/reportes/recepcion' />
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Reportes;
