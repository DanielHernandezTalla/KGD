'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';

export default function Conversiones({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('conversiones', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_CONVERSION'
    },
    {
      name: 'item',
      label: 'Código'
    },
    {
      name: 'nombrE_ARTICULO',
      label: 'Artículo'
    },
    {
      name: 'nombrE_UOM_ORIGEN',
      label: 'Unidad origen'
    },
    {
      name: 'nombrE_UOM_DESTINO',
      label: 'Unidad destino'
    },
    {
      name: 'cantidaD_ORIGEN',
      label: 'Cantidad origen'
    },
    {
      name: 'cantidaD_DESTINO',
      label: 'Cantidad destino'
    },
    {
      name: 'descripcion',
      label: 'Descripción'
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
    <MainLayout>
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
            title='Conversiones de articulos'
            idColumn='iD_CONVERSION'
            createHref='articulos/conversiones'
            singleHref='articulos/conversiones'
            cols={tableHeaders}
            data={data?.listado}
          />
        </>
      </Pager>
    </MainLayout>
  );
}
