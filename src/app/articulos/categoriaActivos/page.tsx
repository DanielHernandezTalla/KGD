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

export default function CategoriaActivos({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'articuloscategoriaact.lista',
    'articuloscategoriaact.save',
    'articuloscategoriaact.listaid'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('articuloscategoriaact', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Categoría activos KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_ACTIVOS'
    },
    {
      name: 'activo',
      label: 'Activo'
    },
    {
      name: 'descripcion',
      label: 'Descripción'
    },
    {
      name: 'tiempO_DEPRECIACION_YEAR',
      label: 'Tiempo depreciación'
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
      <LayoutPermiso checked={checked} name='articuloscategoriaact.lista'>
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
              title='Categoría de activos'
              idColumn='iD_ACTIVOS'
              nuevo={checked['articuloscategoriaact.save']}
              createHref='articulos/categoriaActivos'
              singleHref={checked['articuloscategoriaact.listaid'] && 'articulos/categoriaActivos'}
              cols={tableHeaders}
              data={data?.listado?.map((activos: any, index: any) => ({
                ...activos,
                tiempO_DEPRECIACION_YEAR: activos.tiempO_DEPRECIACION_YEAR + ' años'
              }))}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
