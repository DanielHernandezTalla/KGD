import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Empresa KGD'
};

const Datos = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Empresa' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='faMapLocationDot' text='Estados' href='/datos/tiposDeEstudio' />
          <ButtonData icon='faCity' text='Ciudades' href='/datos/tiposDeEstudio' />
          <ButtonData icon='hotel' text='Empresas' href='/datos/tiposDeEstudio' />
          <ButtonData icon='faHouseFlag' text='Sucursales' href='/datos/tiposDeEstudio' />
        </div>
      </div>
    </Layout>
  );
};

export default Datos;
