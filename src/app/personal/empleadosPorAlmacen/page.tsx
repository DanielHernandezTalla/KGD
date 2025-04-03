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

export default function EmpleadosPorAlmacen({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = ['empleados.lista', 'empleados.save', 'empleados.listaid'];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('empleadosalmacen', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  console.log(data);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Empleados KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_EMPLEADOSALMACEN'
    },
    {
      name: 'empleado',
      label: 'Empleado'
    },
    {
      name: 'sucursal',
      label: 'Sucursal'
    },
    {
      name: 'almacen',
      label: 'Almacen'
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
      <LayoutPermiso checked={checked} name='empleados.lista'>
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
              title='Empleados por almacen'
              idColumn='iD_EMPLEADOSALMACEN'
              nuevo={checked['empleadosalmacen.save']}
              createHref='personal/empleadosPorAlmacen'
              // singleHref={checked['empleadosalmacen.listaid'] && 'personal/empleadosPorAlmacen'}
              singleHref={'personal/empleadosPorAlmacen'}
              cols={tableHeaders}
              data={data?.listado?.map((item: any) => {
                return {
                  ...item
                };
              })}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
