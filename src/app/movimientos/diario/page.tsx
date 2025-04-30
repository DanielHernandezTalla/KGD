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

export default function MovimientosDiarios({ searchParams }: { searchParams: { page: number } }) {
  const rutasToCheck: string[] = ['OnHandDiario.lista'];

  const [checked, setChecked] = useState([] as any);
  const [valueSearch, setValueSearch] = useState({});
  const almacen = localStorage.getItem('almacen');
  const { data, isError, isLoading }: IDataResponse<any> = useRequest('OnHandDiario', {
    pagina: searchParams?.page || 1,
    cantidadRegistrosPorPagina: 100,
    // almacen: almacen, // Aqui ponemos fijo el almacen al que pertenecemos
    almacen: almacen || -1, // Aqui ponemos fijo el almacen al que pertenecemos
    ...valueSearch
  });

  useEffect(() => {
    document.title = 'Movimiento Diario KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  // console.log(data);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'item',
      label: 'Código'
    },
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
      name: 'sucursal',
      label: 'Sucursal'
    },
    {
      name: 'cantidad',
      label: 'Cantidad'
    },
    {
      name: 'unidaD_MEDIDA',
      label: 'UOM'
    }
    // {
    //   name: 'nombrE_RECEPCIONESTATUS',
    //   label: 'Estatus',
    //   component: (estatus: string) => (
    //     <div className='w-28'>
    //       <Tag
    //         className=''
    //         bgColor={estatus === 'CANCELADO' ? 'bg-red-200' : 'bg-blue-200'}
    //         text={estatus}
    //       />
    //     </div>
    //   )
    // }
  ];

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='OnHandDiario.lista'>
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
              title='Movimientos diarios'
              idColumn='item'
              // nuevo={checked['movimientos.recepcion.store']}
              nuevo={false}
              // createHref='movimientos/recepcion'
              singleHref={checked['OnHandDiario.lista'] && 'movimientos/diario'}
              cols={tableHeaders}
              data={data?.listado?.map((item: any) => ({
                ...item,
                nombrE_PROVEEDOR: item.nombrE_PROVEEDOR ? item.nombrE_PROVEEDOR : '-',
                referencia: item.referencia?.toUpperCase(),
                descripcion: item.descripcion?.toUpperCase(),
                cantidad: item.cantidad,
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
