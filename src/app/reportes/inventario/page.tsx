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

export default function Inventario({ params }: { params: { id: number; page: number } }) {
  const pageSize = 10;
  const [date, setDate]: any = useState({});

  // const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/salida', {
  const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/CantidadEnMano', {
    ...date
  });

  console.log(data);

  useEffect(() => {
    document.title = 'Inventario KGD';
  }, []);

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

  const ALMACENES = [
    {
      id: 1,
      nombre: 'ALMACEN'
    },
    {
      id: 2,
      nombre: 'KGD'
    },
    {
      id: 3,
      nombre: 'Constructora'
    },
    {
      id: 4,
      nombre: 'O really'
    }
  ];

  const ESTATUSLIST = [
    {
      id: 1,
      nombre: 'ABIERTA'
    },
    {
      id: 2,
      nombre: 'CERRADA'
    },
    {
      id: 3,
      nombre: 'PARCIAL'
    },
    {
      id: 4,
      nombre: 'CANCELADO'
    }
  ];

  const USUARIOS = [
    {
      id: 3,
      nombre: 'USERTEST'
    },
    {
      id: 8,
      nombre: 'DanielHernandez'
    }
  ];

  const filtros = [
    // {
    //   name: 'ESTATUS',
    //   label: 'Estatus',
    //   data: ESTATUSLIST
    // },
    {
      name: 'ALMACEN',
      label: 'Almacen',
      data: ALMACENES,
      fullWidth: true
    }
    // {
    //   name: 'USUARIO',
    //   label: 'Usuario',
    //   data: USUARIOS
    // }
  ];

  const handleReport = async () => {
    const params = new URLSearchParams({
      ...date
    });

    await generateExel('Reportes/CantidadEnMano', params, 'Inventario');
  };

  return (
    <MainLayout>
      <TitlePage title='Inventario' />

      <div className='mt-5 md:mt-10'>
        <div>
          <DairyFilter setValues={setDate} optionalValues={filtros} optionDate={true} />
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
            currentPage={Number(params.page) || 1}
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
              // href={`pacientes/p/servicio`}
            />
          </Pager>
        )}
      </div>
    </MainLayout>
  );
}
