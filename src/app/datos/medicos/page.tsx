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
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('medicosremitentes', {
    numeroDePagina: searchParams?.page || 1,
    filasDePagina: 10,
    ...valueSearch
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'id'
    },
    {
      name: 'nombre',
      label: 'Médico'
    },
    {
      name: 'estatus_medico',
      label: 'Estatus Médico'
    },
    {
      name: 'ubicaciones_medico',
      label: 'Ubicación'
    },
    {
      name: 'especialidades',
      label: 'Especialiades'
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
            title='Medicos'
            idColumn='id'
            createHref='datos/medicos'
            singleHref='datos/medicos'
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
