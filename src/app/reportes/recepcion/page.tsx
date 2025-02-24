'use client';
import { useState } from 'react';
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

export default function Recepcion({ params }: { params: { id: number; page: number } }) {
  const pageSize = 10;
  const [date, setDate]: any = useState({});

  const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/recepciones', {
    ...date
  });

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_RECEPCION',
      label: '#'
    },
    {
      name: 'descripcion',
      label: 'Recepción'
    },
    {
      name: 'fechA_RECEPCION',
      label: 'Fecha'
    },
    {
      name: 'nombrE_TIPOTRANSACCION',
      label: 'Tipo transacción'
    },
    {
      name: 'referencia',
      label: 'Referencia'
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
      name: 'creadO_NOMBRE',
      label: 'Empleado'
    },
    {
      name: 'nombrE_RECEPCIONESTATUS',
      label: 'Estatus'
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
    {
      name: 'ESTATUS',
      label: 'Estatus',
      data: ESTATUSLIST
    },
    {
      name: 'ALMACEN',
      label: 'Almacen',
      data: ALMACENES
    },
    {
      name: 'USUARIO',
      label: 'Usuario',
      data: USUARIOS
    }
  ];

  const handleReport = async () => {
    const params = new URLSearchParams({
      ...date
    });

    await generateExel('Reportes/recepciones', params, 'pagos');
  };

  return (
    <MainLayout>
      <TitlePage title='Recepciones' />

      <div className='mt-5 md:mt-10'>
        <div>
          <DairyFilter setValues={setDate} optionalValues={filtros} />
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
                  descripcion: item?.descripcion?.toUpperCase(),
                  fechA_RECEPCION: new Date(item?.fechA_RECEPCION).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }),
                  nombrE_ALMACEN: item?.nombrE_ALMACEN?.toUpperCase()
                }))}
              href={`pacientes/p/servicio`}
            />
          </Pager>
        )}
      </div>
    </MainLayout>
  );
}
