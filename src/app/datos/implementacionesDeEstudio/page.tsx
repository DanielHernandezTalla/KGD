'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';
import { toMoney } from '@/utils/toMoney';

function ImplementacionesDeEstudio({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('implementacionesestudios', {
    numeroDePagina: searchParams?.page || 1,
    filasDePagina: 10,
    ...valueSearch
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'id'
    },
    {
      name: 'estudios',
      label: 'Estudios'
    },
    {
      name: 'sucursales',
      label: 'Sucursales'
    },
    {
      name: 'productividad',
      label: 'Productividad'
    },
    {
      name: 'activo',
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
            title='Implementaciones de estudios'
            idColumn='id'
            createHref='datos/implementacionesDeEstudio'
            singleHref='datos/implementacionesDeEstudio'
            cols={tableHeaders}
            data={data?.data?.map((element: any) => {
              return {
                ...element,
                productividad: toMoney(element.productividad)
              };
            })}
          />
        </>
      </Pager>
    </MainLayout>
  );
}

export default ImplementacionesDeEstudio;
