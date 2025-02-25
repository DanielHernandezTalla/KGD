'use client';
import Layout from '@/components/layouts/MainLayout';
import { ButtonData } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

const Articulos = () => {
  const rutasToCheck: string[] = [
    'articulos.articulo.index',
    'articulos.lista',
    'conversiones.lista',
    'articuloscategorias.lista',
    'articuloscategoriaact.lista',
    'unidadmedida.lista',
    'tipotransaccion.lista'
  ];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Artículos KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);
  return (
    <Layout>
      <LayoutPermiso checked={checked} name='articulos.articulo.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Artículos' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            {checked['articulos.lista'] && (
              <ButtonData icon='faScrewdriverWrench' text='Artículos' href='/articulos/articulos' />
            )}

            {checked['conversiones.lista'] && (
              <ButtonData icon='faShuffle' text='Conversiones' href='/articulos/conversiones' />
            )}

            {checked['articuloscategorias.lista'] && (
              <ButtonData icon='tableList' text='Categorias' href='/articulos/categorias' />
            )}

            {checked['articuloscategoriaact.lista'] && (
              <ButtonData
                icon='coins'
                text='Categoría activos'
                href='/articulos/categoriaActivos'
              />
            )}

            {checked['unidadmedida.lista'] && (
              <ButtonData
                icon='faPenRuler'
                text='Unidades de medida'
                href='/articulos/unidadesDeMedida'
              />
            )}

            {checked['tipotransaccion.lista'] && (
              <ButtonData
                icon='faRightLeft'
                text='Tipo transacciones'
                href='/articulos/tipoTransacciones'
              />
            )}
          </div>
        </div>
      </LayoutPermiso>
    </Layout>
  );
};

export default Articulos;
