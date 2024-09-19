'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';
import { useSession } from 'next-auth/react';

export default function Estados({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data: session, status } = useSession();
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('estados', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // console.log(session);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_ESTADO'
    },
    {
      name: 'nombrE_ESTADO',
      label: 'Estado'
    },
    {
      name: 'clavE_ESTADO',
      label: 'Clave'
    },
    {
      name: 'comentario',
      label: 'Comentario'
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
            title='Estados'
            idColumn='iD_ESTADO'
            createHref='empresa/estados'
            singleHref='empresa/estados'
            cols={tableHeaders}
            data={data?.listado}
          />
        </>
      </Pager>
    </MainLayout>
  );
}
