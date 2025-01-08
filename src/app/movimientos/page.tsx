'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

const Movimientos = () => {
  const rutasToCheck: string[] = [
    'movimientos.movimientos.index',
    'movimientos.recepcion.index',
    'movimientos.salida.index',
    'movimientos.er.index',
    'movimientos.es.index'
  ];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Movimientos KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <Layout>
      <LayoutPermiso checked={checked} name='movimientos.movimientos.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Movimientos' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            {checked['movimientos.recepcion.index'] && (
              <ButtonData icon='faCartArrowDown' text='Recepcion' href='/datos/tiposDeEstudio' />
            )}
            {checked['movimientos.salida.index'] && (
              <ButtonData icon='faCartFlatbedSuitcase' text='Salidas' href='/datos/tiposDeEstudio' />
            )}
            {checked['movimientos.er.index'] && (
              <ButtonData icon='faListCheck' text='Estatus recepción' href='/movimientos/estatusRecepcion' />
            )}
            {checked['movimientos.es.index'] && (
              <ButtonData icon='faListCheck' text='Estatus salida' href='/movimientos/estatusSalida' />
            )}
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Movimientos;
