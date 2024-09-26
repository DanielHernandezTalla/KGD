'use client';
import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/hooks/AuthContext';
import { handlePost } from '@/utils/handlePost';

// Cargando rutas para esta pantalla
const rutasToCheck = [
  '/personal/empleados',
  '/personal/tipoPersonal',
  '/personal/tipoPago',
  '/personal/motivoBaja',
  '/personal/tipoSalario',
  '/personal/areas'
];

const Personal = () => {
  const authContext = useContext(AuthContext);
  const [checked, setChecked] = useState([] as any);

  // console.log(checked);

  // Agregando titulo a la paguina
  useEffect(() => {
    document.title = 'Personal KGD';
  }, []);

  // Consultar permisos
  useEffect(() => {
    if (authContext.user?.id) {
      const request = {
        url: 'usuariopermisourl/lista',
        values: rutasToCheck.map((item) => {
          return { iD_USER: authContext?.user?.id, roulE_NAME: item };
        }),
        onSuccess: (data: any) => {
          let checkeds: any[] = [];
          data.forEach((element: any) => {
            checkeds[element.roulE_NAME] = element.estatus;
          });

          if (data) setChecked(checkeds);
        },
        isCifrado: false
      };

      handlePost(request);
    }
  }, [authContext]);

  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Personal' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          {checked['/personal/empleados'] && (
            <ButtonData icon='personal' text='Empleados' href='/personal/empleados' />
          )}
          {checked['/personal/tipoPersonal'] && (
            <ButtonData icon='userGroup' text='Tipo personal' href='/personal/tipoPersonal' />
          )}
          {checked['/personal/tipoPago'] && (
            <ButtonData icon='dollarSing' text='Tipo pago' href='/personal/tipoPago' />
          )}
          {checked['/personal/motivoBaja'] && (
            <ButtonData icon='faCircleDown' text='Motivo baja' href='/personal/motivoBaja' />
          )}
          {checked['/personal/tipoSalario'] && (
            <ButtonData icon='coins' text='Tipo salario' href='/personal/tipoSalario' />
          )}
          {checked['/personal/areas'] && (
            <ButtonData icon='faCity' text='Areas' href='/personal/areas' />
          )}

          {/* <ButtonData icon='personal' text='Empleados' href='/personal/empleados' />
          <ButtonData icon='userGroup' text='Tipo personal' href='/personal/tipoPersonal' />
          <ButtonData icon='dollarSing' text='Tipo pago' href='/personal/tipoPago' />
          <ButtonData icon='faCircleDown' text='Motivo baja' href='/personal/motivoBaja' />
          <ButtonData icon='coins' text='Tipo salario' href='/personal/tipoSalario' />
          <ButtonData icon='faCity' text='Areas' href='/personal/areas' /> */}

          {/* <ButtonData icon='faImage' text='Fotos empleado' href='/personal/sucursales' /> */}
          {/* <ButtonData icon='billete' text='Nomina' href='/personal/sucursales' /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Personal;
