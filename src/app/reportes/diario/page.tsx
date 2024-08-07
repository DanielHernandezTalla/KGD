'use client';
import { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useRequest } from '@/hooks/useRequest';
import { TitlePage } from '../../../components/molecules/TitlePage/index';
import LoadingSpinner from '../../../components/atoms/LoadingSpinner/LoadingSpinner';
import { toMoney } from '@/utils/toMoney';
import { TABLECOLUMN } from '@/interface/types';
import { StatusBullet, Table } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import SearchSelectDouble from '@/components/molecules/SearchSelectDouble';
import { IDataResponse } from '@/interface/request';

export default function Diario() {
  // const router = useRouter();
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

  const tableHeadersServices: TABLECOLUMN[] = [
    {
      name: 'servicio_id'
    },
    {
      name: 'paciente',
      label: 'Paciente'
    },
    {
      name: 'cliente',
      label: 'Cliente'
    },
    {
      name: 'sucursal',
      label: 'Sucursal'
    },
    {
      name: 'estudio',
      label: 'Estudio'
    },
    {
      name: 'codigo_descuento',
      label: 'Codigo Descuento'
    },
    {
      name: 'precio',
      label: 'Precio',
      isRight: true
    },
    {
      name: 'descuento',
      label: 'Des',
      isRight: true
    },
    {
      name: 'productividad',
      label: 'Prod',
      isRight: true
    },
    {
      name: 'importe',
      label: 'Importe',
      isRight: true
    },
    {
      name: 'pagada',
      label: 'Pagada',
      component: (pagada: boolean) => (
        <div className='w-28'>
          <StatusBullet
            size='medium'
            status={pagada ? 'success' : 'disabled'}
            text={pagada ? 'Si' : 'No'}
          />
        </div>
      )
    },
    {
      name: 'factura',
      label: 'Factura'
    }
  ];

  const tableHeadersServicesDay: TABLECOLUMN[] = [
    {
      name: 'estudio',
      label: 'Tipo de estudio'
    },
    {
      name: 'cantidad',
      label: 'Servicios'
    },
    {
      name: 'importe',
      label: 'Total',
      isRight: true
    }
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
      <TitlePage title='Diario' />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='mt-5 grid w-full gap-5 md:mt-10'>
            <div className='flex flex-col gap-4'>
              <h2 className='col-span-2 text-2xl font-medium capitalize text-slate-600 md:text-3xl'>
                Pagos
              </h2>
              <SearchSelectDouble
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
                <div className='grid grid-cols-2 gap-5 p-5 pt-0'>
                  <InfoPaciente title='Realizadas' info={data?.modoPagos?.realizadas || 0} />
                  <InfoPaciente
                    title='Total general'
                    info={toMoney(data?.modoPagos?.totalPago || 0)}
                  />
                </div>
              </div>
            </div>

            {/* <div className='flex flex-col gap-4'>
              <h2 className='col-span-2 text-2xl font-medium capitalize text-slate-600 md:text-3xl'>
                Honorarios
              </h2>
              <div className='grid gap-3 rounded-3xl bg-white'>
                <Table
                  cols={tableHeadersPaymentsDay}
                  idColumn={'idPago'}
                  data={data?.honorarios?.pagos?.map((item: any) => ({
                    ...item,
                    cantidad: toMoney(item.cantidad)
                  }))}
                />
                <div className='grid grid-cols-2 gap-5 p-5 pt-0'>
                  <InfoPaciente title='Realizadas' info={data?.honorarios?.realizadas || 0} />
                  <InfoPaciente
                    title='Total general'
                    info={toMoney(data?.honorarios?.totalPago || 0)}
                  />
                </div>
              </div>
            </div> */}

            <div className='flex flex-col gap-4'>
              <h2 className='col-span-2 text-2xl font-medium capitalize text-slate-600 md:text-3xl'>
                Servicios
              </h2>
              <div className='grid gap-3 rounded-3xl bg-white'>
                <Table
                  cols={tableHeadersServicesDay}
                  idColumn={'idTerapia'}
                  data={data?.tipoServicios?.servicios?.map((terapia: any) => ({
                    ...terapia,
                    importe: toMoney(terapia.importe)
                  }))}
                />
                <div className='grid grid-cols-2 gap-5 p-5 pt-0'>
                  <InfoPaciente title='Realizadas' info={data?.tipoServicios?.realizadas || 0} />
                  <InfoPaciente
                    title='Total general'
                    info={toMoney(data?.tipoServicios?.totalServicios || 0)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-5 flex flex-col gap-5'>
            <div>
              <h2 className='col-span-2 mb-3 text-2xl font-medium capitalize text-slate-600 md:text-3xl'>
                Informacion de Pagos
              </h2>
              <Table
                cols={tableHeadersPayments}
                idColumn={'idPago'}
                data={data?.pagos?.map((pago: any) => ({
                  ...pago,
                  cantidad: toMoney(pago.cantidad)
                }))}
                href='pacientes/p/pago'
              />
            </div>

            <div>
              <h2 className='col-span-2 mb-3 text-2xl font-medium capitalize text-slate-600 md:text-3xl'>
                Información de Servicios
              </h2>
              <Table
                cols={tableHeadersServices}
                idColumn={'idTerapia'}
                data={data?.servicios?.map((terapia: any) => ({
                  ...terapia,
                  precio: toMoney(terapia.precio),
                  descuento: toMoney(terapia.descuento),
                  productividad: toMoney(terapia.productividad),
                  importe: toMoney(terapia.importe)
                }))}
                href={'pacientes/p/servicio'}
              />
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
