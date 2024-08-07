'use client';
import { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useRequest } from '@/hooks/useRequest';
import { TitlePage } from '../../../components/molecules/TitlePage/index';
import LoadingSpinner from '../../../components/atoms/LoadingSpinner/LoadingSpinner';
import { toMoney } from '@/utils/toMoney';
import { TABLECOLUMN } from '@/interface/types';
import { Table } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { IDataResponse } from '@/interface/request';
import SearchSelectFacturacion from '@/components/molecules/SearchSelectFacturacion';

export default function Facturacion() {
  const [valueSearch, setValueSearch] = useState({});

  const { data, isLoading }: IDataResponse<any> = useRequest('reports/diary', {
    ...valueSearch
  });

  // console.log(data);

  const handleSearch = (value: any) => {
    setValueSearch(value);
  };

  const tableHeadersPayments: TABLECOLUMN[] = [
    {
      name: 'idPago'
    },
    {
      name: 'hora',
      label: 'Hora'
    },
    {
      name: 'paciente',
      label: 'Paciente'
    },
    {
      name: 'modo_de_pago',
      label: 'Modo de Pago'
    },
    {
      name: 'cantidad',
      label: 'Cantidad',
      isRight: true
    }
    // {
    //   name: 'factura',
    //   label: 'Factura Servicio'
    // }
  ];

  const tableHeadersPaymentsDay: TABLECOLUMN[] = [
    {
      name: 'modo_de_pago',
      label: 'Tipo de pago'
    },
    {
      name: 'pagos',
      label: 'Pagos'
    },
    {
      name: 'cantidad',
      label: 'Total',
      isRight: true
    }
  ];

  return (
    <MainLayout>
      <TitlePage title='Reporte de facturación' />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='mt-5 grid w-full gap-5 md:mt-10'>
            <div className='flex flex-col gap-4'>
              {/* <h2 className='col-span-2 text-2xl font-medium capitalize text-slate-600 md:text-3xl'>
                Pagos
              </h2> */}
              <SearchSelectFacturacion
                getValue={handleSearch}
                showBtnSearch
                showIcon
                valueSearch={valueSearch}
                sucursales={data?.sucursales}
                usuarios={data?.usuarios}
              />
              <div className='grid gap-3 rounded-3xl bg-white'>
                <Table
                  cols={tableHeadersPaymentsDay}
                  idColumn={'idPago'}
                  data={data?.modoPagos?.pagos?.map((item: any) => ({
                    ...item,
                    cantidad: toMoney(item.cantidad)
                  }))}
                />
                {/* <div className='grid grid-cols-2 gap-5 p-5 pt-0'>
                  <InfoPaciente title='Realizadas' info={data?.modoPagos?.realizadas || 0} />
                  <InfoPaciente
                    title='Total general'
                    info={toMoney(data?.modoPagos?.totalPago || 0)}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
