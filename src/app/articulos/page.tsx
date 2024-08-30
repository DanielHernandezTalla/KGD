import type { Metadata } from 'next';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';

export const metadata: Metadata = {
  title: 'Artículos KGD'
};

const Articulos = () => {
  return (
    <Layout>
      <div className='flex flex-col gap-5 md:gap-10'>
        <TitlePage title='Artículos' />
        <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
          <ButtonData icon='tableList' text='Categorias' href='/articulos/categorias' />
          <ButtonData icon='coins' text='Categoría activos' href='/articulos/categoriaActivos' />
          <ButtonData icon='faPenRuler' text='Unidades de medida' href='/articulos/unidadesDeMedida' />
          <ButtonData icon='faRightLeft' text='Tipo transacciones' href='/articulos/tipoTransacciones' />
          <ButtonData icon='faScrewdriverWrench' text='Artículos' href='/articulos/articulos' />
          {/* <ButtonData icon='faImage' text='Imagenes' href='/articulos/sucursales' /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Articulos;
