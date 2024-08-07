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

function Estudios({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('estudios', {
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
      label: 'Descuento'
    },
    {
      name: 'tipo_de_estidio',
      label: 'Tipo Estudio'
    },
    {
      name: 'requiere_medico',
      label: 'Requiere Médico'
    },
    {
      name: 'requiere_tecnico',
      label: 'Requiere Técnico'
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
            title='Estudios'
            idColumn='id'
            createHref='datos/estudios'
            singleHref='datos/estudios'
            cols={tableHeaders}
            data={data?.data?.map((item: any) => {
              return {
                ...item,
                productividad: toMoney(item.productividad),
                requiere_medico: item.requiere_medico ? 'Si' : 'No',
                requiere_tecnico: item.requiere_tecnico ? 'Si' : 'No'
              };
            })}
          />
        </>
      </Pager>
    </MainLayout>
  );
}

export default Estudios;
