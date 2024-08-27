'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';

export default function Articulos({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('articulos', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_ITEM'
    },
    {
      name: 'item',
      label: 'Codigo'
    },
    {
      name: 'descripcion',
      label: 'Articulo'
    },
    {
      name: 'nombrE_UNIDAD_PRIMARIA',
      label: 'Unidad'
    },
    {
      name: 'nombrE_CATEGORIA',
      label: 'Categoria'
    },
    {
      name: 'transF_INVENTARIOS',
      label: 'Transferencia'
    },
    {
      name: 'controL_MAX_MIX',
      label: 'Min Max'
    },
    {
      name: 'inV_MINIMO',
      label: 'Inv MIN'
    },
    {
      name: 'inV_MAXIMO',
      label: 'Inv MAX'
    },
    {
      name: 'activO_FIJO',
      label: 'Activo fijo'
    },
    {
      name: 'nombrE_CATEGORIA_ACTIVO',
      label: 'Categoria activo'
    },
    {
      name: 'codigO_SAT',
      label: 'Cod SAT'
    },
    {
      name: 'estatus',
      label: 'Activo',
      component: (activo: boolean) => (
        <div className='w-28'>
          <StatusBullet
            size='medium'
            status={activo ? 'success' : 'disabled'}
            text={activo ? 'Si' : 'No'}
          />
        </div>
      )
    }
  ];

  return (
    <MainLayout full>
      <Pager
        pageSize={10}
        currentPage={Number(searchParams?.page) || 1}
        totalCount={10 * data?.maximoPaginas}
      >
        <>
          <Search getValue={setValueSearch} showBtnSearch showIcon />
          <DataViewer
            isLoading={isLoading}
            isError={isError}
            title='Artículos'
            idColumn='iD_ITEM'
            createHref='articulos/articulos'
            singleHref='articulos/articulos'
            cols={tableHeaders}
            data={data?.listado.map((articulo: any, index: any) => ({
              ...articulo,
              transF_INVENTARIOS: articulo.transF_INVENTARIOS ? 'Si' : 'No',
              controL_MAX_MIX: articulo.controL_MAX_MIX ? 'Si' : 'No',
              activO_FIJO: articulo.activO_FIJO ? 'Si' : 'No'
            }))}
          />
        </>
      </Pager>
    </MainLayout>
  );
}
