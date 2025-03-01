'use client';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useRequest } from '@/hooks/useRequest';
import { TitlePage } from '../../../components/molecules/TitlePage/index';
import LoadingSpinner from '../../../components/atoms/LoadingSpinner/LoadingSpinner';
import { FORMINPUT, TABLECOLUMN } from '@/interface/types';
import { Button, Table } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';
import { Pager } from '@/components/molecules';
import { DairyFilter } from '@/components/forms/filter/dairyFilter';
import { generateExel } from '@/app/api/reportExel/generateExel';
import { toMoney } from '@/utils/toMoney';
import { useSearchParams } from 'next/navigation';

export default function Recepcion() {
  // <<Cargamos los parámetros iniciales>>
  const searchParams = useSearchParams();
  const pageSize = 10;
  const [search, setSearch]: any = useState({});

  // <<Obtenemos los datos del reporte>>
  const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/Listarecepciones', {
    numeroDePagina: searchParams.get('page') || 1,
    cantidadRegistrosPorPagina: pageSize,
    ...search
  });

  console.log({
    numeroDePagina: searchParams.get('page') || 1,
    cantidadRegistrosPorPagina: pageSize,
    ...search
  });

  // <<Obtenemos los datos para llenar el formulario>>
  const { data: relacion }: IDataResponse<any> = useRequest('reportes/relacion');

  // <<Establecemos el título de la página>>
  useEffect(() => {
    document.title = 'Recepciones KGD';
  }, []);

  // <<Definimos las columnas a mostrar en la tabla>>
  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'nO_RECEPCION'
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
      name: 'comentario',
      label: 'Recepción'
    },
    {
      name: 'fechA_RECEPCION',
      label: 'Fecha'
    },
    {
      name: 'tipotransaccion',
      label: 'Tipo transacción'
    },
    {
      name: 'referencia',
      label: 'Referencia'
    },
    {
      name: 'almacen',
      label: 'Almacen'
    },
    {
      name: 'usuario',
      label: 'Empleado'
    },
    {
      name: 'recepcioN_ESTATUS',
      label: 'Estatus'
    }
  ];

  // <<Cargamos los filtros para el reporte>>
  const filtros: FORMINPUT[] = [
    {
      name: 'ESTATUS',
      label: 'Estatus',
      type: 'select',
      options: relacion?.relacion?.estatusRecepcion?.map((item: any) => ({
        value: item?.iD_RECEPCION_ESTATUS,
        label: item?.descripcion?.toUpperCase()
      }))
    },
    {
      name: 'ALMACEN',
      label: 'Almacén',
      type: 'select',
      options: relacion?.relacion?.almacen?.map((item: any) => ({
        value: item?.iD_ALMACEN,
        label: item?.almacen?.toUpperCase()
      }))
    },
    {
      name: 'TIPOTRANSACCION',
      label: 'Tipo transacción',
      type: 'select',
      options: relacion?.relacion?.tipoTransaccion?.map((item: any) => ({
        value: item?.iD_TIPO_TRANSACCION,
        label: item?.tipO_TRANSACCION?.toUpperCase()
      }))
    },
    {
      name: 'USUARIO',
      label: 'Usuario',
      type: 'select',
      options: relacion?.relacion?.usuarios?.map((item: any) => ({
        value: item?.id,
        label: item?.name?.toUpperCase()
      }))
    }
  ];

  // <<Exportamos los datos a Excel>>
  const handleReport = async () => {
    const params = new URLSearchParams({
      ...search
    });

    await generateExel('Reportes/recepciones', params, 'recepciones');
  };

  return (
    <MainLayout>
      <TitlePage title='Recepciones' />

      <div className='mt-5 md:mt-10'>
        <div>
          <DairyFilter setValues={setSearch} optionalFilters={filtros} />
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
              idColumn={'nO_RECEPCION'}
              data={data?.listado
                ?.filter((item: any) => item.iD_RECEPCION != 0)
                ?.map((item: any) => ({
                  ...item,
                  cantidad: item?.cantidad + ' ' + item?.unidad,
                  costo: toMoney(item?.costo),
                  almacen: item?.almacen?.toUpperCase(),
                  tipotransaccion:
                    item?.tipotransaccion == 'SALIDAS' ? 'TRASPASO' : item?.tipotransaccion,
                  fechA_RECEPCION: new Date(item?.fechA_RECEPCION).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })
                }))}
              href={`movimientos/recepcion`}
            />
          </Pager>
        )}
      </div>
    </MainLayout>
  );
}
