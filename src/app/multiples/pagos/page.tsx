'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { TABLECOLUMN } from '@/interface/types';
import { DataViewer } from '@/components/organisms';
import { useRequest } from '@/hooks/useRequest';
import { Pager, Search, TitlePage } from '@/components/molecules';
import { useState, useEffect } from 'react';
import { Button, LoadingSpinner, StatusBullet, Table } from '@/components/atoms';
import { IDataResponse } from '@/interface/request';
import SearchPagos from '@/components/molecules/SearchPagos';
import { useParams } from 'next/navigation';
import { toMoney } from '@/utils/toMoney';
import Modal from '@/components/molecules/Modal';
import { FormPagoMultiple } from '@/components/forms/pagoMultiple';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';

function Sucursales({ searchParams }: { searchParams: { page: number } }) {
  const [valueSearch, setValueSearch] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [showModalPagar, setShowModalPagar] = useState(false);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest('servicios/multiples', {
    numeroDePagina: searchParams?.page || 1,
    filasDePagina: 8,
    ...valueSearch
  });

  const pageSize = 10;
  const info = data?.data?.map((item: any) => {
    return {
      ...item,
      importeOriginal: item.importe,
      precio: toMoney(item.precio),
      descuento: toMoney(item.descuento),
      importe: toMoney(item.importe)
    };
  });

  const handleSearch = (value: any) => {
    setValueSearch(value);
  };

  const handleClick = (event: any, servicio_id: Number) => {
    event.preventDefault();
    let servicio = info.filter((item: any) => item.servicio_id === servicio_id);
    let servicioExist = selectData.filter((item: any) => item.servicio_id === servicio_id);

    if (servicioExist.length === 0) setSelectData(servicio.concat(selectData));
  };

  const handleClickDelete = (event: any, servicio_id: Number) => {
    event.preventDefault();
    let servicio = selectData.filter((item: any) => item.servicio_id !== servicio_id);

    setSelectData(servicio);
  };

  const tableHeaders: TABLECOLUMN[] = [
    // {
    //   name: 'servicio_id', //TODO: Comentar estas lineas
    //   label: 'servicio_id'
    // },
    {
      name: 'estudio_nombre',
      label: 'Estudio'
    },
    {
      name: 'paciente_nombre',
      label: 'Paciente'
    },
    {
      name: 'cliente_nombre',
      label: 'Cliente'
    },
    {
      name: 'hora',
      label: 'Hora'
    },
    {
      name: 'fecha',
      label: 'Fecha'
    },
    {
      name: 'precio',
      label: 'Precio',
      isRight: true
    },
    {
      name: 'descuento',
      label: 'Descuento',
      isRight: true
    },
    {
      name: 'importe',
      label: 'Importe',
      isRight: true
    },
    {
      name: 'servicio_id',
      label: 'Agregar',
      component: (servicio_id: Number) => (
        <Button
          size='small'
          rounded
          variant='transparent'
          text=''
          icon='pen'
          onClick={(e: any) => handleClick(e, servicio_id)}
        />
      )
    }
  ];

  const tableAuxHeaders: TABLECOLUMN[] = [
    {
      name: 'estudio_nombre',
      label: 'Estudio'
    },
    {
      name: 'paciente_nombre',
      label: 'Paciente'
    },
    {
      name: 'fecha',
      label: 'Fecha'
    },
    {
      name: 'importe',
      label: 'Importe',
      isRight: true
    },
    {
      name: 'servicio_id',
      label: 'Active',
      component: (servicio_id: Number) => (
        <Button
          size='small'
          rounded
          variant='transparent'
          className='text-red-500'
          text=''
          icon='trash'
          onClick={(e: any) => handleClickDelete(e, servicio_id)}
        />
      )
    }
  ];

  return (
    <MainLayout full>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='mb-5 flex justify-between'>
            <TitlePage title='Pagos multiples' />

            <div className='flex items-center justify-end space-x-3'>
              <Button
                size='small'
                rounded
                variant='primary'
                text='Pagar Servicios'
                icon='pen'
                onClick={() => setShowModalPagar(true)}
                disabled={selectData.length === 0}
              />
            </div>
          </div>

          <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_600px]'>
            <div>
              <div className='flex flex-col gap-4'>
                <SearchPagos
                  getValue={handleSearch}
                  showBtnSearch
                  showIcon
                  valueSearch={valueSearch}
                />
                <Pager
                  pageSize={pageSize}
                  currentPage={Number(searchParams?.page) || 1}
                  totalCount={pageSize * data?.maximoPaginas}
                >
                  <Table
                    cols={tableHeaders}
                    idColumn={'idTerapia'}
                    data={data?.data?.map((item: any) => {
                      return {
                        ...item,
                        importeOriginal: item.importe,
                        precio: toMoney(item.precio),
                        descuento: toMoney(item.descuento),
                        importe: toMoney(item.importe)
                      };
                    })}
                    href={`honorarios`}
                  />
                </Pager>
              </div>
            </div>
            <div className='flex flex-col rounded-3xl bg-white max-h-[calc(100vh-20vh)]'>
              <div className='flex justify-between p-5 pb-0'>
                <p className='font-semibold text-gray-600'>Total servicos:</p>
                <p className='font-semibold text-gray-500'>{selectData.length}</p>
              </div>
              <div className='flex justify-between p-5 pt-2'>
                <p className='font-semibold text-gray-600'>Importe total:</p>
                <p className='font-semibold text-gray-500'>
                  {toMoney(
                    selectData.reduce((prev, current: any) => {
                      return prev + current.importeOriginal;
                    }, 0)
                  )}
                </p>
              </div>
              <Table
                cols={tableAuxHeaders}
                idColumn={'idTerapia'}
                data={selectData}
                href={`honorarios`}
              />
            </div>
          </div>

          {showModalPagar && (
            <Modal
              title='Multiples pagos'
              showModal={showModalPagar}
              setShowModal={setShowModalPagar}
              closeCross
            >
              <div className='mb-3 grid grid-cols-2 gap-5'>
                <InfoPaciente title='Servicios' info={selectData.length.toString()} />
                <InfoPaciente
                  title='Importe'
                  info={toMoney(
                    selectData.reduce((prev, current: any) => {
                      return prev + current.importeOriginal;
                    }, 0)
                  )}
                />
              </div>
              <FormPagoMultiple
                dataReset={setSelectData}
                initialValues={{
                  data: selectData.map((item: any) => ({
                    servicio_id: item.servicio_id
                  })),
                  modo_de_pago_id: '',
                  fecha_hora: ''
                }}
                closeModal={setShowModalPagar}
              />
            </Modal>
          )}
        </>
      )}
    </MainLayout>
  );
}

export default Sucursales;
