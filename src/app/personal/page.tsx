import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Personal KGD'
};

const Personal = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Personal' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
        
          <ButtonData icon='personal' text='Empleados' href='/personal/empleados' />
          <ButtonData icon='userGroup' text='Tipo personal' href='/personal/tipoPersonal' />
          <ButtonData icon='dollarSing' text='Tipo pago' href='/personal/tipoPago' />
          <ButtonData icon='faCircleDown' text='Motivo baja' href='/personal/motivoBaja' />
          {/* <ButtonData icon='faImage' text='Fotos empleado' href='/personal/sucursales' /> */}
          <ButtonData icon='coins' text='Tipo salario' href='/personal/tipoSalario' />
          <ButtonData icon='faCity' text='Areas' href='/personal/areas' />
          {/* <ButtonData icon='billete' text='Nomina' href='/personal/sucursales' /> */}
        
        </div>
      </div>
    </Layout>
  );
};

export default Personal;
