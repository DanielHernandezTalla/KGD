'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useEffect, useState } from 'react';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';
import { handrePermisos } from '@/utils/handlePermisos';

const Datos = () => {
  const rutasToCheck: string[] = [
    'empresa.empresa.index',
    'empresa.estados.index',
    'empresa.ciudades.index',
    'empresa.empresas.index',
    'empresa.sucursales.index'
  ];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Empresa KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <Layout>
      <LayoutPermiso checked={checked} name='empresa.empresa.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Empresa' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            {checked['empresa.estados.index'] && (
              <ButtonData icon='faMapLocationDot' text='Estados' href='/empresa/estados' />
            )}

            {checked['empresa.ciudades.index'] && (
              <ButtonData icon='faCity' text='Ciudades' href='/empresa/ciudades' />
            )}

            {checked['empresa.empresas.index'] && (
              <ButtonData icon='hotel' text='Empresas' href='/empresa/empresas' />
            )}

            {checked['empresa.sucursales.index'] && (
              <ButtonData icon='faHouseFlag' text='Sucursales' href='/empresa/sucursales' />
            )}

            {/* <ButtonData icon='faMapLocationDot' text='Estados' href='/empresa/estados' />
          <ButtonData icon='faCity' text='Ciudades' href='/empresa/ciudades' />
          <ButtonData icon='hotel' text='Empresas' href='/empresa/empresas' />
          <ButtonData icon='faHouseFlag' text='Sucursales' href='/empresa/sucursales' /> */}
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Datos;
