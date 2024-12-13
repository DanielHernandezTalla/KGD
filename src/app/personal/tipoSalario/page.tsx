'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { StatusBullet } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';

export default function TipoSalario({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'personal.tiposalario.index',
    'personal.tiposalario.store',
    'personal.tiposalario.show'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('tiposalario', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Tipo salario KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_TIPO_SALARIO'
    },
    {
      name: 'tipO_SALARIO',
      label: 'Tipo salario'
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
      <LayoutPermiso checked={checked} name='personal.tiposalario.index'>
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
              title='Tipo de salario'
              idColumn='iD_TIPO_SALARIO'
              nuevo={checked['personal.tiposalario.store']}
              createHref='personal/tipoSalario'
              singleHref={checked['personal.tiposalario.show'] && 'personal/tipoSalario'}
              cols={tableHeaders}
              data={data?.listado}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
