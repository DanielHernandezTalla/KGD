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

export default function MotivoBaja({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = ['motivobaja.lista', 'motivobaja.save', 'motivobaja.listaid'];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('motivobaja', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Motivo baja KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_MOTIVO_BAJA'
    },
    {
      name: 'motivO_BAJA',
      label: 'Motivo baja'
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
      <LayoutPermiso checked={checked} name='motivobaja.lista'>
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
              title='Motivo De Baja'
              idColumn='iD_MOTIVO_BAJA'
              nuevo={checked['motivobaja.save']}
              createHref='personal/motivoBaja'
              singleHref={checked['motivobaja.listaid'] && 'personal/motivoBaja'}
              cols={tableHeaders}
              data={data?.listado}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
