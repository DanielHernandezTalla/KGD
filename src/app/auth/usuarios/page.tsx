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

export default function Usuarios({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'auth.usuarios.index',
    'auth.usuarios.store',
    'auth.usuarios.show'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('usuarios', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Usuarios KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'id'
    },
    {
      name: 'name',
      label: 'Nombre de usuario'
    },
    {
      name: 'name_rol',
      label: 'Rol'
    },
    {
      name: 'email',
      label: 'Correo'
    },
    {
      name: 'fecha_baja',
      label: 'Fecha de baja'
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
      <LayoutPermiso checked={checked} name='auth.usuarios.index'>
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
              title='Usuarios'
              idColumn='id'
              nuevo={checked['auth.usuarios.store']}
              createHref='auth/usuarios'
              singleHref={checked['auth.usuarios.show'] && 'auth/usuarios'}
              cols={tableHeaders}
              data={data?.listado?.map((item: any) => {
                return {
                  ...item,
                  fecha_baja:
                    item?.fecha_baja == '0001-01-01T00:00:00'
                      ? 'No aplica'
                      : new Date(item.fecha_baja).toISOString().split('T')[0]
                };
              })}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
