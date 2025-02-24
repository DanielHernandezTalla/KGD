import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Reportes KGD'
};

const Reportes = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Reportes' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='faCartArrowDown' text='Recepción' href='/reportes/recepcion' />
        </div>
      </div>
    </Layout>
  );
};

export default Reportes;
