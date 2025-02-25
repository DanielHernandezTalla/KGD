'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';

export default function Permisos({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('permisos', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_PERMISO'
    },
    {
      name: 'permiso',
      label: 'Nombre de rol'
    },
    {
      name: 'typE_PERMISSIONS',
      label: 'Tipo de permiso'
    },
    // {
    //   name: 'title',
    //   label: 'Nombre botón'
    // },
    {
      name: 'routE_NAME',
      label: 'Ruta'
    },
    // {
    //   name: 'icon',
    //   label: 'Icono'
    // },
    // {
    //   name: 'iS_LINK',
    //   label: 'Es link'
    // },
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
            title='Permisos'
            idColumn='iD_PERMISO'
            createHref='auth/permisos'
            singleHref='auth/permisos'
            cols={tableHeaders}
            data={data?.listado}
          />
        </>
      </Pager>
    </MainLayout>
  );
}
