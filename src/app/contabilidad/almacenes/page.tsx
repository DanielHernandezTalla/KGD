'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';

export default function Almacenes({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('almacen', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_ALMACEN'
    },
    {
      name: 'almacen',
      label: 'Almacen'
    },
    {
      name: 'descripcion',
      label: 'Descripción'
    },
    {
      name: 'nombrE_CENTRO_COSTO',
      label: 'Centro de costo'
    },
    {
      name: 'nombrE_CIUDAD',
      label: 'Ciudad'
    },
    {
      name: 'nombrE_ESTADO',
      label: 'Estado'
    },
    {
      name: 'nombrE_ENCARGADO',
      label: 'Encargado'
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
            title='Almacenes'
            idColumn='iD_ALMACEN'
            createHref='contabilidad/almacenes'
            singleHref='contabilidad/almacenes'
            cols={tableHeaders}
            data={data?.listado?.map((articulo: any, index: any) => ({
              ...articulo
              // transF_INVENTARIOS: articulo.transF_INVENTARIOS ? 'Si' : 'No',
              // controL_MAX_MIX: articulo.controL_MAX_MIX ? 'Si' : 'No',
              // activO_FIJO: articulo.activO_FIJO ? 'Si' : 'No'
            }))}
          />
        </>
      </Pager>
    </MainLayout>
  );
}
