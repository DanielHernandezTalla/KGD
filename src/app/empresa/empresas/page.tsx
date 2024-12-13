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

export default function Estados({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'empresa.empresas.index',
    'empresa.empresas.store',
    'empresa.empresas.show'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('empresas', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Empresas KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_EMPRESA'
    },
    {
      name: 'razoN_SOCIAL',
      label: 'Empresa'
    },
    {
      name: 'rfc',
      label: 'RFC'
    },
    {
      name: 'telefono',
      label: 'Teléfono'
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
      name: 'codigO_POSTAL',
      label: 'C.P.'
    },
    {
      name: 'segmentO1',
      label: 'Segmento'
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
      <LayoutPermiso checked={checked} name='empresa.empresas.index'>
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
              title='Empresas'
              idColumn='iD_EMPRESA'
              nuevo={checked['empresa.empresas.store']}
              createHref='empresa/empresas'
              singleHref={checked['empresa.empresas.show'] && 'empresa/empresas'}
              cols={tableHeaders}
              data={data?.listado}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
