'use client';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useRequest } from '@/hooks/useRequest';
import { TitlePage } from '../../../components/molecules/TitlePage/index';
import LoadingSpinner from '../../../components/atoms/LoadingSpinner/LoadingSpinner';
import { TABLECOLUMN } from '@/interface/types';
import { Button, Table } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';
import { Pager } from '@/components/molecules';
import { DairyFilter } from '@/components/forms/filter/dairyFilter';
import { generateExel } from '@/app/api/reportExel/generateExel';
import { toMoney } from '@/utils/toMoney';
import { useSearchParams } from 'next/navigation';

export default function Recepcion() {
  const searchParams = useSearchParams();
  const pageSize = 10;
  const [search, setSearch]: any = useState({});

  // const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/salida', {
  const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/listasalida', {
    numeroDePagina: searchParams.get('page') || 1,
    cantidadRegistrosPorPagina: 10,
    ...search
  });

  // Traemos los datos para la relacion
  const { data: relacion }: IDataResponse<any> = useRequest('reportes/relacion');

  useEffect(() => {
    document.title = 'Salidas KGD';
  }, []);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'nO_SALIDA'
    },
    {
      name: 'nO_ARTICULO',
      label: '#'
    },
    {
      name: 'articulo',
      label: 'Artículo'
    },
    {
      name: 'cantidad',
      label: 'Cantidad'
    },
    {
      name: 'costo',
      label: 'Costo'
    },
    {
      name: 'comentarios',
      label: 'Salida'
    },
    {
      name: 'fechA_SALIDA',
      label: 'Fecha'
    },
    {
      name: 'tipO_TRANSACCION',
      label: 'Tipo transacción'
    },
    {
      name: 'almacen',
      label: 'Almacen'
    },
    {
      name: 'almaceN_DESTINO',
      label: 'Destino'
    },
    {
      name: 'creado',
      label: 'Empleado'
    },
    {
      name: 'salidA_ESTATUS',
      label: 'Estatus'
    }
  ];

  const filtros = [
    {
      name: 'ESTATUS',
      label: 'Estatus',
      data: relacion?.relacion?.estatusRecepcion?.map((item: any) => ({
        id: item?.iD_RECEPCION_ESTATUS,
        nombre: item?.descripcion?.toUpperCase()
      }))
    },
    {
      name: 'ALMACEN',
      label: 'Almacen',
      data: relacion?.relacion?.almacen?.map((item: any) => ({
        id: item?.iD_ALMACEN,
        nombre: item?.almacen?.toUpperCase()
      }))
    },
    {
      name: 'TIPOTRANSACCION',
      label: 'Tipo transacción',
      data: relacion?.relacion?.tipoTransaccion?.map((item: any) => ({
        id: item?.iD_TIPO_TRANSACCION,
        nombre: item?.tipO_TRANSACCION?.toUpperCase()
      }))
    },
    {
      name: 'USUARIO',
      label: 'Usuario',
      data: relacion?.relacion?.usuarios?.map((item: any) => ({
        id: item?.id,
        nombre: item?.name?.toUpperCase()
      }))
    }
  ];

  const handleReport = async () => {
    const params = new URLSearchParams({
      ...search
    });

    await generateExel('Reportes/salidas', params, 'salidas');
  };

  return (
    <MainLayout>
      <TitlePage title='Salidas' />

      <div className='mt-5 md:mt-10'>
        <div>
          <DairyFilter setValues={setSearch} optionalValues={filtros} />
        </div>
        <div className='translate-y-5 rounded-t-xl border-2 border-b-0 border-gray-200 bg-white px-4 py-4 md:translate-y-7 md:px-6 md:py-5'>
          <Button
            size='medium'
            variant='primary'
            text={'Generar Reporte'}
            icon='excel'
            onClick={() => handleReport()}
          />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Pager
            pageSize={pageSize}
            currentPage={Number(searchParams.get('page')) || 1}
            totalCount={pageSize * data?.maximoPaginas}
          >
            <Table
              cols={tableHeaders}
              idColumn={'nO_SALIDA'}
              data={data?.listado
                ?.filter((item: any) => item.iD_SALIDA != 0)
                ?.map((item: any) => ({
                  ...item,
                  descripcion: item?.descripcion?.toUpperCase(),
                  cantidad: item?.cantidad + ' ' + item?.nombrE_UOM,
                  costo: toMoney(item?.costo),
                  nombrE_ALMACEN: item?.nombrE_ALMACEN?.toUpperCase(),
                  fechA_SALIDA: new Date(item?.fechA_SALIDA).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })
                }))}
              href={`movimientos/salidas`}
            />
          </Pager>
        )}
      </div>
    </MainLayout>
  );
}
