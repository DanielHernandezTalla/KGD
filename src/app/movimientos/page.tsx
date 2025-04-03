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
    'RecepcionCabecera.lista',
    'SalidasCabecera.lista',
    'RecepcionEstatus.lista',
    'SalidaEstatus.lista',
    'OnHandDiario.lista'
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
            {checked['RecepcionCabecera.lista'] && (
              <ButtonData icon='faCartArrowDown' text='Recepcion' href='/movimientos/recepcion' />
            )}
            {checked['SalidasCabecera.lista'] && (
              <ButtonData icon='faCartFlatbedSuitcase' text='Salidas' href='/movimientos/salidas' />
            )}
            {checked['RecepcionEstatus.lista'] && (
              <ButtonData
                icon='faListCheck'
                text='Estatus recepción'
                href='/movimientos/estatusRecepcion'
              />
            )}
            {checked['SalidaEstatus.lista'] && (
              <ButtonData
                icon='faListCheck'
                text='Estatus salida'
                href='/movimientos/estatusSalida'
              />
            )}
            {checked['OnHandDiario.lista'] && (
              <ButtonData icon='tableList' text='Diario' href='/movimientos/diario' />
            )}
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Movimientos;
