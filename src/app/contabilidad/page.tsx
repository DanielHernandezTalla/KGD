import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Contabilidad KGD'
};

const Articulos = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Contabilidad' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='faShop' text='Centro de costo' href='/contabilidad/centroDeCosto' />
          <ButtonData icon='faWarehouse' text='Almacenes' href='/contabilidad/almacenes' />
          {/* <ButtonData icon='tableList' text='Recepciones' href='/articulos/unidadesDeMedida' /> */}
          {/* <ButtonData icon='faRightLeft' text='Tipo transacciones' href='/articulos/tipoTransacciones' />
          <ButtonData icon='faScrewdriverWrench' text='Artículos' href='/articulos/articulos' />
          <ButtonData icon='faShuffle' text='Conversiones' href='/articulos/conversiones' /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Articulos;
