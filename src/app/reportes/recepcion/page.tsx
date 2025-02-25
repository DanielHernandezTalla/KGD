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

export default function Recepcion({ params }: { params: { id: number; page: number } }) {
  const pageSize = 10;
  const [date, setDate]: any = useState({});

  // const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/salida', {
  const { data, isLoading }: IDataResponse<any> = useRequest('Reportes/recepciones', {
    ...date
  });

  console.log(date);
  

  // Traemos los datos para la relacion
  const { data: relacion }: IDataResponse<any> = useRequest('reportes/relacion');

  // console.log(relacion);

  // console.log(relacion?.relacion?.usuarios);
  // console.log(relacion?.relacion?.almacen);
  // console.log(relacion?.relacion?.estatusRecepcion);
  // console.log(relacion?.relacion?.proveedor);
  // console.log(relacion?.relacion?.tipoTransaccion);

  useEffect(() => {
    document.title = 'Recepciones KGD';
  }, []);

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
      ...date
    });

    await generateExel('Reportes/recepciones', params, 'recepciones');
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
