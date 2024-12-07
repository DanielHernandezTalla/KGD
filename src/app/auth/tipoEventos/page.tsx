'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';

export default function TipoPermisos({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('tipopermisodet', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'id'
    },
    {
      name: 'nombre',
      label: 'Tipo evento'
    }
    // {
    //   name: 'estatus',
    //   label: 'Activo',
    //   component: (activo: boolean) => (
    //     <div className='w-28'>
    //       <StatusBullet
    //         size='medium'
    //         status={activo ? 'success' : 'disabled'}
    //         text={activo ? 'Si' : 'No'}
    //       />
    //     </div>
    //   )
    // }
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
            title='Tipos de Eventos'
            idColumn='id'
            createHref='auth/tipoEventos'
            singleHref='auth/tipoEventos'
            cols={tableHeaders}
            data={data?.listado}
          />
        </>
      </Pager>
    </MainLayout>
  );
}
