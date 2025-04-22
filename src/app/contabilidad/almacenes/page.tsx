'use client';
import { useEffect, useState } from 'react';
import { useRequest } from '@/hooks/useRequest';
import { handrePermisos } from '@/utils/handlePermisos';
import MainLayout from '@/components/layouts/MainLayout';
import { DataViewer } from '@/components/organisms';
import { Pager, Search } from '@/components/molecules';
import { StatusBullet } from '@/components/atoms';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';
import { TABLECOLUMN } from '@/interface/types';
import { IDataResponse } from '@/interface/request';

export default function Almacenes({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = ['almacen.lista', 'almacen.save', 'almacen.listaid'];
  const [checked, setChecked] = useState([] as any);

  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('almacen', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Almacenes KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_ALMACEN'
    },
    {
      name: 'almacen',
      label: 'Almacen'
    },
    {
      name: 'descripcion',
      label: 'Descripción'
    },
    {
      name: 'nombrE_CENTRO_COSTO',
      label: 'Centro de costo'
    },
    {
      name: 'sucursal',
      label: 'Sucursal'
    },
    {
      name: 'nombrE_CIUDAD',
      label: 'Ciudad'
    },
    {
      name: 'nombrE_ESTADO',
      label: 'Estado'
    },
    // {
    //   name: 'nombrE_ENCARGADO',
    //   label: 'Encargado'
    // },
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
      <LayoutPermiso checked={checked} name='almacen.lista'>
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
              title='Almacenes'
              idColumn='iD_ALMACEN'
              nuevo={checked['almacen.save']}
              createHref='contabilidad/almacenes'
              singleHref={checked['almacen.listaid'] && 'contabilidad/almacenes'}
              cols={tableHeaders}
              data={data?.listado?.map((articulo: any, index: any) => ({
                ...articulo
              }))}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
