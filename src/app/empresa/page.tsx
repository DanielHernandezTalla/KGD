'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData, Icon, LoadingSpinner } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import { handlePost } from '@/utils/handlePost';

const Datos = () => {
  const rutasToCheck = [
    'empresa.empresa.index',
    'empresa.estados.index',
    'empresa.ciudades.index',
    'empresa.empresas.index',
    'empresa.sucursales.index'
  ];
  const authContext = useContext(AuthContext);
  const [checked, setChecked] = useState([] as any);

  useEffect(() => {
    document.title = 'Empresa KGD';
  }, []);

  // Consultar permisos
  useEffect(() => {
    // console.log('===================================');
    // console.log('Que esta pasando');

    let values = rutasToCheck.map((item) => ({ ROULE_NAME: item }));

    const request = {
      url: 'permisopagina',
      values: values,
      isCifrado: false,
      onSuccess: (data: any) => {
        let listadoArray: { [key: string]: boolean } = {};

        data.listado.forEach((item: { roulE_NAME: string; asignado: boolean }) => {
          listadoArray[item.roulE_NAME] = item.asignado;
        });

        setChecked(listadoArray);
      },
      onError: () => {
        setChecked([]);
        console.log('error');
      }
    };

    handlePost(request);
  }, [authContext]);

  return (
    <Layout>
      {Object.keys(checked).length == 0 ? (
        <LoadingSpinner />
      ) : checked['empresa.empresa.index'] ? (
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
      ) : (
        // <ButtonData icon='faMapLocationDot' text='Estados' href='/empresa/estados' />
        <div className='flex flex-col mx-auto gap-2 mt-32 max-w-sm'>
          <Icon icon='ban' className='h-40 text-gray-200'></Icon>
          <h2 className='text-center text-2xl text-gray-300 select-none'>Sin permisos</h2>
          <p className='text-center text-gray-300 select-none'>
            Lo sentimos, pero no cuentas con los permisos necesarios para acceder a este recurso.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Datos;
