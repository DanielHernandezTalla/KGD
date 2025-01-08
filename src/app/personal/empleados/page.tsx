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

export default function Empleados({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'personal.empleados.index',
    'personal.empleados.store',
    'personal.empleados.show'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('empleados', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Empleados KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_EMPLEADO'
    },
    {
      name: 'nombre',
      label: 'Nombre'
    },
    {
      name: 'apellidO_PATERNO',
      label: 'Apellido paterno'
    },
    {
      name: 'apellidO_MATERNO',
      label: 'Apellido materno'
    },
    {
      name: 'fechA_NACIMIENTO',
      label: 'Fecha nacimiento'
    },
    {
      name: 'sexo',
      label: 'Sexo'
    },
    {
      name: 'rfc',
      label: 'RFC'
    },
    // {
    //   name: 'celular',
    //   label: 'Celular'
    // },
    // {
    //   name: 'correo',
    //   label: 'Correo'
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
      <LayoutPermiso checked={checked} name='personal.empleados.index'>
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
              title='Empleados'
              idColumn='iD_EMPLEADO'
              nuevo={checked['personal.empleados.store']}
              createHref='personal/empleados'
              singleHref={checked['personal.empleados.show'] && 'personal/empleados'}
              cols={tableHeaders}
              data={data?.listado?.map((item: any) => {
                return {
                  ...item,
                  fechA_NACIMIENTO:
                    item?.fechA_NACIMIENTO == '1996-01-01T00:00:00'
                      ? '-'
                      : new Date(item.fechA_NACIMIENTO).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }),
                  sexo: item?.sexo == 'M' ? 'Mujer' : item?.sexo == 'H' ? 'Hombre' : '-'
                };
              })}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
