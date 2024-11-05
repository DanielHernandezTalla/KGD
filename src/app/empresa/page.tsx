'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import { handlePost } from '@/utils/handlePost';

const Datos = () => {
  const rutasToCheck = [
    '/empresa/estados',
    '/empresa/ciudades',
    '/empresa/empresas',
    '/empresa/sucursales'
  ];
  const authContext = useContext(AuthContext);
  const [checked, setChecked] = useState({} as any);

  useEffect(() => {
    document.title = 'Empresa KGD';
  }, []);

  // Consultar permisos
  // useEffect(() => {
  //   if (authContext.user?.id) {
  //     const request = {
  //       url: 'permisosDePantalla/checkPermisos',
  //       values: { usuario_id: authContext.user.id, rutas: rutasToCheck },
  //       onSuccess: (data: any) => {
  //         if (data?.checked) setChecked(data.checked);
  //       }
  //     };

  //     handlePost(request);
  //   }
  // }, [authContext]);

  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Empresa' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          {checked['/empresa/estados']?.permiso && (
            <ButtonData icon='faMapLocationDot' text='Estados' href='/empresa/estados' />
          )}

          {checked['/empresa/ciudades']?.permiso && (
            <ButtonData icon='faCity' text='Ciudades' href='/empresa/ciudades' />
          )}

          {checked['/empresa/empresas']?.permiso && (
            <ButtonData icon='hotel' text='Empresas' href='/empresa/empresas' />
          )}

          {checked['/empresa/sucursales']?.permiso && (
            <ButtonData icon='faHouseFlag' text='Sucursales' href='/empresa/sucursales' />
          )}

          <ButtonData icon='faMapLocationDot' text='Estados' href='/empresa/estados' />
          <ButtonData icon='faCity' text='Ciudades' href='/empresa/ciudades' />
          <ButtonData icon='hotel' text='Empresas' href='/empresa/empresas' />
          <ButtonData icon='faHouseFlag' text='Sucursales' href='/empresa/sucursales' />
        </div>
      </div>
    </Layout>
  );
};

export default Datos;
