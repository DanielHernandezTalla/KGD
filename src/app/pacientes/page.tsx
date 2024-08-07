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

function Pacientes({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('pacientes', {
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
      label: 'Paciente'
    },
    {
      name: 'fecha_nacimiento',
      label: 'Fecha Nacimiento'
    },
    {
      name: 'sexo',
      label: 'Sexo'
    },
    {
      name: 'celular',
      label: 'Celular'
    },
    {
      name: 'correo',
      label: 'Correo'
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
            title='Pacientes'
            idColumn='id'
            createHref='pacientes/p'
            singleHref='pacientes/p'
            cols={tableHeaders}
            data={data?.data?.map((item: any) => {
              return {
                ...item,
                sexo: item.sexo ? 'Masculino' : 'Femenino'
              };
            })}
          />
        </>
      </Pager>
    </MainLayout>
  );
}

export default Pacientes;
