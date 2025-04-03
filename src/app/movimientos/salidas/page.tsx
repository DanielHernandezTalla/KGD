'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search } from '@/components/molecules';
import { useEffect, useState } from 'react';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';
import Tag from '@/components/atoms/Tag';

export default function Recepcion({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'SalidasCabecera.lista',
    'SalidasCabecera.save',
    'SalidasCabecera.listaid'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('SalidasCabecera', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    ...valueSearch
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Salidas KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_SALIDA'
    },
    // {
    //   name: 'referencia',
    //   label: 'Referencia'
    // },
    {
      name: 'descripcion',
      label: 'Descripción'
    },
    // {
    //   name: 'nombrE_PROVEEDOR',
    //   label: 'Proveedor'
    // },
    {
      name: 'nombrE_ALMACEN',
      label: 'Almacen'
    },
    {
      name: 'nombrE_TIPO_TRANSACCION',
      label: 'Tipo transacción'
    },
    {
      name: 'fechA_CREACION',
      label: 'Fecha creado'
    },
    {
      name: 'nombrE_SALIDA_ESTATUS',
      label: 'Estatus',
      component: (estatus: string) => (
        <div className='w-28'>
          <Tag
            className=''
            bgColor={
              estatus === 'ABIERTA'
                ? 'bg-blue-200'
                : estatus === 'CANCELADO'
                ? 'bg-red-200'
                : 'bg-emerald-200'
            }
            text={estatus}
          />
        </div>
      )
    }
  ];

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='SalidasCabecera.lista'>
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
              title='Salidas'
              idColumn='iD_SALIDA'
              nuevo={checked['SalidasCabecera.save']}
              createHref='movimientos/salidas'
              singleHref={checked['SalidasCabecera.listaid'] && 'movimientos/salidas'}
              cols={tableHeaders}
              data={data?.listado?.map((item: any) => ({
                ...item,
                // nombrE_PROVEEDOR: item.nombrE_PROVEEDOR ? item.nombrE_PROVEEDOR : '-',
                // referencia: item.referencia?.toUpperCase(),
                descripcion: item.descripcion?.toUpperCase(),
                fechA_CREACION: new Date(item.fechA_CREACION)
                  .toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  .toUpperCase()
              }))}
            />
          </>
        </Pager>
      </LayoutPermiso>
    </MainLayout>
  );
}
