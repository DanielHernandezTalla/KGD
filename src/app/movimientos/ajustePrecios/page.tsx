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

export default function Recepcion({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = [
    'RecepcionCabecera.lista',
    'RecepcionCabecera.save',
    'RecepcionCabecera.listaid'
  ];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const almacen = localStorage.getItem('almacen');
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('RecepcionCabecera', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 10,
    Almacen: almacen || -1,
    FiltroName: 'Cerrada'
    // ...valueSearch
  });

  // console.log(valueSearch);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Ajuste precios KGD';

    handrePermisos(rutasToCheck, setChecked);
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_RECEPCION'
    },
    {
      name: 'descripcion',
      label: 'Descripción'
    },
    {
      name: 'referencia',
      label: 'Factura'
    },
    {
      name: 'chofer',
      label: 'Chofer'
    },
    {
      name: 'nombrE_PROVEEDOR',
      label: 'Proveedor'
    },
    {
      name: 'nombrE_ALMACEN',
      label: 'Almacen'
    },
    {
      name: 'nombrE_TIPOTRANSACCION',
      label: 'Tipo transacción'
    },
    {
      name: 'fechA_CREACION',
      label: 'Fecha creado'
    }
    // {
    //   name: 'nombrE_RECEPCIONESTATUS',
    //   label: 'Estatus',
    //   component: (estatus: string) => (
    //     <div className='w-28'>
    //       <Tag
    //         className=''
    //         bgColor={
    //           estatus === 'ABIERTA'
    //             ? 'bg-blue-200'
    //             : estatus === 'CANCELADO'
    //             ? 'bg-red-200'
    //             : 'bg-emerald-200'
    //         }
    //         text={estatus}
    //       />
    //     </div>
    //   )
    // }
  ];

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='RecepcionCabecera.lista'>
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
              title='Ajuste precios recepción'
              idColumn='iD_RECEPCION'
              nuevo={false}
              // nuevo={checked['RecepcionCabecera.save']}
              // createHref='movimientos/ajustePrecios'
              singleHref={checked['RecepcionCabecera.listaid'] && 'movimientos/ajustePrecios'}
              cols={tableHeaders}
              data={data?.listado?.map((item: any) => ({
                ...item,
                nombrE_PROVEEDOR: item.nombrE_PROVEEDOR ? item.nombrE_PROVEEDOR : '-',
                chofer: item.chofer ? item.chofer : '-',
                referencia: item.referencia ? item.referencia.toUpperCase() : '-',
                descripcion: item.descripcion.toUpperCase(),
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
