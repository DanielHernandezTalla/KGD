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
    'articulos.articulos.index',
    'articulos.conversiones.index',
    'articulos.Categorias.index',
    'articulos.activos.index',
    'articulos.um.index',
    'articulos.transacciones.index'
  ];

  const [checked, setChecked] = useState([] as any);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Empresa KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);
  return (
    <Layout>
      <LayoutPermiso checked={checked} name='articulos.articulo.index'>
        <div className='flex flex-col gap-5 md:gap-10'>
          <TitlePage title='Artículos' />
          <div className='grid grid-cols-buttonData gap-6 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6'>
            {checked['articulos.articulos.index'] && (
              <ButtonData icon='faScrewdriverWrench' text='Artículos' href='/articulos/articulos' />
            )}

            {checked['articulos.conversiones.index'] && (
              <ButtonData icon='faShuffle' text='Conversiones' href='/articulos/conversiones' />
            )}

            {checked['articulos.Categorias.index'] && (
              <ButtonData icon='tableList' text='Categorias' href='/articulos/categorias' />
            )}

            {checked['articulos.activos.index'] && (
              <ButtonData
                icon='coins'
                text='Categoría activos'
                href='/articulos/categoriaActivos'
              />
            )}

            {checked['articulos.um.index'] && (
              <ButtonData
                icon='faPenRuler'
                text='Unidades de medida'
                href='/articulos/unidadesDeMedida'
              />
            )}

            {checked['articulos.transacciones.index'] && (
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
