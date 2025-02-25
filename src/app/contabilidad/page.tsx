'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

const Contabilidad = () => {
  const rutasToCheck: string[] = [
    'contabilidad.contabilidad.index',
    'contabilidad.cc.index',
    'almacen.lista'
  ];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Contabilidad KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <Layout>
      <LayoutPermiso checked={checked} name='contabilidad.contabilidad.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Contabilidad' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            {checked['contabilidad.cc.index'] && (
              <ButtonData icon='faShop' text='Centro de costo' href='/contabilidad/centroDeCosto' />
            )}

            {checked['almacen.lista'] && (
              <ButtonData icon='faWarehouse' text='Almacenes' href='/contabilidad/almacenes' />
            )}
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Contabilidad;
