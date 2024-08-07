import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Multiples CIMA'
};

const Datos = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Multiples' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='dollarSing' text='Pagos' href='/multiples/pagos' />
          {/* <ButtonData icon='paciente' text='Estatus Médico' href='/datos/estatusMedico' />
          <ButtonData icon='billete' text='Modo de Pagos' href='/datos/modosDePagos' />
          <ButtonData icon='personal' text='Tipo Cliente' href='datos/tiposDeClientes' />
          <ButtonData icon='doctor' text='Tipo Estudio' href='/datos/tiposDeEstudio' /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Datos;
