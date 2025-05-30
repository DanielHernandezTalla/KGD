'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

const Personal = () => {
  const rutasToCheck = [
    'personal.personal.index',
    'empleados.lista',
    'tipopersonal.lista',
    'tipopago.lista',
    'motivobaja.lista',
    'tiposalario.lista',
    'personal.areas.index'
  ];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Personal KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <Layout>
      <LayoutPermiso checked={checked} name='personal.personal.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Personal' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            {checked['empleados.lista'] && (
              <ButtonData icon='personal' text='Empleados' href='/personal/empleados' tag='Pendiente permisos' />
            )}
            {checked['empleados.lista'] && (
              <ButtonData icon='personal' text='Empleados por almacen' href='/personal/empleadosPorAlmacen'/>
            )}
            {checked['tipopersonal.lista'] && (
              <ButtonData icon='userGroup' text='Tipo personal' href='/personal/tipoPersonal' />
            )}
            {checked['tipopago.lista'] && (
              <ButtonData icon='dollarSing' text='Tipo pago' href='/personal/tipoPago' />
            )}
            {checked['motivobaja.lista'] && (
              <ButtonData icon='faCircleDown' text='Motivo baja' href='/personal/motivoBaja' />
            )}
            {checked['tiposalario.lista'] && (
              <ButtonData icon='coins' text='Tipo salario' href='/personal/tipoSalario' />
            )}
            {checked['personal.areas.index'] && (
              <ButtonData icon='faCity' text='Areas' href='/personal/areas' />
            )}

            {/* <ButtonData icon='personal' text='Empleados' href='/personal/empleados' />
            <ButtonData icon='userGroup' text='Tipo personal' href='/personal/tipoPersonal' />
            <ButtonData icon='dollarSing' text='Tipo pago' href='/personal/tipoPago' />
            <ButtonData icon='faCircleDown' text='Motivo baja' href='/personal/motivoBaja' />
            <ButtonData icon='coins' text='Tipo salario' href='/personal/tipoSalario' />
            <ButtonData icon='faCity' text='Areas' href='/personal/areas' /> */}
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Personal;
