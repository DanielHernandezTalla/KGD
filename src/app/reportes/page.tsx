import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Reportes CIMA'
};

const Reportes = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Reportes' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='folder' text='Diario' href='reportes/diario' />
          <ButtonData icon='billete' text='Facturación' href='reportes/facturacion' />
          {/* <ButtonData icon='servicios' text='Terapias' href='/datos/especialidades' /> */}
          {/* <ButtonData icon='paciente' text='Estatus Médico' href='/datos/estatusMedico' /> */}
          {/* <ButtonData icon='billete' text='Modo de Pagos' href='/datos/modosDePagos' /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Reportes;
