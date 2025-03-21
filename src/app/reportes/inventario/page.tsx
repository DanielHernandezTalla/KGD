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
import { useSearchParams } from 'next/navigation';

export default function Inventario() {
  // <<Cargamos los parámetros iniciales>>
  const searchParams = useSearchParams();
  const pageSize = 10;
  const [search, setSearch]: any = useState({});

  // <<Obtenemos los datos del reporte>>
  const { data, isLoading }: IDataResponse<any> = useRequest('reportes/listaonhand', {
    pagina: searchParams.get('page') || 1,
    cantidadRegistrosPorPagina: pageSize,
    ...search
  });

  // <<Obtenemos los datos para llenar el formulario>>
  const { data: relacion }: IDataResponse<any> = useRequest('reportes/relacion');

  // <<Establecemos el título de la página>>
  useEffect(() => {
    document.title = 'Inventario KGD';
  }, []);

  // <<Definimos las columnas a mostrar en la tabla>>
  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'nO_ARTICULO',
      label: '#'
    },
    {
      name: 'articulo',
      label: 'Articulo'
    },
    {
      name: 'almacen',
      label: 'Almacen'
    },
    {
      name: 'cantidad',
      label: 'Cantidad'
    },
    {
      name: 'nombrE_UOM',
      label: 'Unidad de medida'
    }
  ];

  // <<Cargamos los filtros para el reporte>>
  const filtros: FORMINPUT[] = [
    {
      name: 'FiltroName',
      label: 'Artículo',
      type: 'text',
      placeholder: 'Escribe el nombre del artículo',
      fullWidth: true
    },
    {
      name: 'ALMACEN',
      label: 'Almacén',
      type: 'select',
      options: relacion?.relacion?.almacen?.map((item: any) => ({
        value: item?.iD_ALMACEN,
        label: item?.almacen?.toUpperCase()
      })),
      fullWidth: true
    }
  ];

  // <<Exportamos los datos a Excel>>
  const handleReport = async () => {
    const params = new URLSearchParams({
      ...search
    });

    await generateExel('Reportes/CantidadEnMano', params, 'Inventario');
  };

  return (
    <MainLayout>
      <TitlePage title='Inventario' />

      <div className='mt-5 md:mt-10'>
        <div>
          <DairyFilter setValues={setSearch} optionalFilters={filtros} optionDate={true} />
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
              idColumn={'idTerapia'}
              data={data?.listado
                ?.filter((item: any) => item.iD_RECEPCION != 0)
                ?.map((item: any) => ({
                  ...item,
                  articulo: item?.articulo?.toUpperCase(),
                  almacen: item?.almacen?.toUpperCase()
                }))}
            />
          </Pager>
        )}
      </div>
    </MainLayout>
  );
}
