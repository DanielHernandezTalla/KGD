'use client';
import { Button, Table } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { Status } from '@/components/atoms/Status';
import { FormGuardarPreciosRecepcion } from '@/components/forms/const_guardarPreciosRecepcion';
import MainLayout from '@/components/layouts/MainLayout';
import { TitlePage } from '@/components/molecules';
import Modal from '@/components/molecules/Modal';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { TABLECOLUMN } from '@/interface/types';
import { handrePermisos } from '@/utils/handlePermisos';
import { toMoney } from '@/utils/toMoney';
import { useEffect, useState } from 'react';

export default function RecepcionSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'RecepcionCabecera.listaid';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const [showModalGuardar, setShowModalGuardar] = useState(false);
  const [updateData, setUpdateData] = useState(false);

  const [costos, setCostos] =
    useState<{ iD_DETAIL_RECEPCION: string; costo: string; iD_TIPO_MONEDA: string }[]>();
  const [costosFijos, setCostosFijos] =
    useState<{ iD_DETAIL_RECEPCION: string; costo: string; iD_TIPO_MONEDA: string }[]>();

  const { data: dataForms }: IDataResponse<any> = useRequest('RecepcionDetalle/relacion');
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `RecepcionCabecera/${params.id}`,
    { updateData }
  );

  // console.log(dataForms.relacion.tipoMoneda);
  // console.log(data?.dato);

  useEffect(() => {
    let info = data?.dato?.lineas.map((item: any, index: any) => ({
      // ...item,
      iD_DETAIL_RECEPCION: item.iD_DETAIL_RECEPCION,
      costo: item.costo,
      iD_TIPO_MONEDA: item.iD_TIPO_MONEDA
    }));
    setCostos(info);
    setCostosFijos(info);
  }, [data]);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
    document.title = 'Ajuste recepción KGD';
  }, []);

  const saveChanges = () => {
    const info = { iD_RECEPCION: data?.dato?.iD_RECEPCION, costos };
    setShowModalGuardar(true);
    // console.log(info);
    // console.log('click');
  };

  // console.log(data?.dato);
  // console.log(costos?.find((item) => item.iD_DETAIL_RECEPCION == '40')?.costo);

  const tableHeaders: TABLECOLUMN[] = [
    // {
    //   name: 'iD_DETAIL_RECEPCION',
    //   label: '#'
    // },
    {
      name: 'item',
      label: 'Código'
    },
    {
      name: 'descripcion',
      label: 'Descripción'
    },
    {
      name: 'nombrE_TIPOTRANSACCION',
      label: 'Tipo transacción'
    },
    {
      name: 'cantidaD_ENVIADA',
      label: 'Cantidad enviada'
    },
    {
      name: 'cantidad',
      label: 'Cantidad recepción'
    },
    // {
    //   name: 'costo',
    //   label: 'costo',
    //   isRight: true
    // },
    {
      name: 'iD_DETAIL_RECEPCION',
      label: 'Costo',
      component: (id: string) => (
        <div className='w-28'>
          <input
            type='number'
            value={costos?.find((item) => item.iD_DETAIL_RECEPCION == id)?.costo ?? ''}
            className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm   
              ${
                costos?.find((item) => item.iD_DETAIL_RECEPCION == id)?.costo !=
                costosFijos?.find((item) => item.iD_DETAIL_RECEPCION == id)?.costo
                  ? 'border-red-300'
                  : 'border-blue-300'
              }
             focus:outline-none disabled:opacity-100 disabled:bg-gray-100`}
            onChange={(e) => {
              const updatedCostos = costos?.map((item) => {
                if (item.iD_DETAIL_RECEPCION == id) {
                  return { ...item, costo: e.target.value };
                }
                return item;
              });
              setCostos(updatedCostos);
            }}
          />
        </div>
      )
    },
    {
      name: 'idSelect',
      label: 'Moneda',
      component: (id: string) => {
        return (
          <div className='w-28'>
            <select
              value={costos?.find((item) => item.iD_DETAIL_RECEPCION == id)?.iD_TIPO_MONEDA ?? ''}
              className={`w-full rounded-lg border-2 border-gray-200 bg-white p-2 text-sm   
                ${
                  costos?.find((item) => item.iD_DETAIL_RECEPCION == id)?.iD_TIPO_MONEDA !=
                  costosFijos?.find((item) => item.iD_DETAIL_RECEPCION == id)?.iD_TIPO_MONEDA
                    ? 'border-red-300'
                    : 'border-blue-300'
                }
               focus:outline-none disabled:opacity-100 disabled:bg-gray-100`}
              onChange={(e) => {
                const updatedMoneda = costos?.map((item) => {
                  if (item.iD_DETAIL_RECEPCION == id) {
                    return { ...item, iD_TIPO_MONEDA: e.target.value };
                  }
                  return item;
                });
                setCostos(updatedMoneda);
              }}
            >
              {dataForms?.relacion?.tipoMoneda?.map((item: any) => (
                <option key={item.iD_TIPO_MONEDA} value={item.iD_TIPO_MONEDA}>
                  {item.tipO_MONEDA}
                </option>
              ))}
            </select>
          </div>
        );
      }
    }
  ];

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='RecepcionCabecera.listaid'>
        <>
          <div className='flex justify-between'>
            <TitlePage title='Ajuste de Recepción' />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <InfoPaciente
              title='Factura'
              info={data?.dato?.referencia.toUpperCase() || 'No tiene'}
            />
            <InfoPaciente
              title='Descripción'
              info={data?.dato?.descripcion.toUpperCase() || 'No tiene'}
            />
            <InfoPaciente title='Almacen' info={data?.dato?.nombrE_ALMACEN || 'No tiene'} />
            <InfoPaciente title='Chofer' info={data?.dato?.chofer || 'No tiene'} />
            <InfoPaciente title='Proveedor' info={data?.dato?.nombrE_PROVEEDOR || 'No tiene'} />
            <InfoPaciente
              title='Tipo de transacción'
              info={data?.dato?.nombrE_TIPOTRANSACCION || 'No tiene'}
            />
            <InfoPaciente
              title='Fecha'
              info={
                new Date(data?.dato?.fechA_RECEPCION)
                  .toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  .toUpperCase() || 'No tiene'
              }
            />
            <InfoPaciente title='Creado por' info={data?.dato?.creadO_NOMBRE || 'No tiene'} />

            <div className='flex flex-col gap-3'>
              <b className='text-gray-600'>Estatus</b>
              <Status
                status={data?.dato?.nombrE_RECEPCIONESTATUS != 'CANCELADO' ? true : false}
                text={data?.dato?.nombrE_RECEPCIONESTATUS}
              />
            </div>
          </div>

          <div className='my-5 grid gap-3 rounded-3xl bg-white'>
            <Table
              className='min-h-[309.88px]'
              cols={tableHeaders}
              idColumn={'iD_DETAIL_RECEPCION'}
              data={data?.dato?.lineas.map((item: any, index: any) => ({
                ...item,
                costo: toMoney(item.costo),
                idSelect: item.iD_DETAIL_RECEPCION,
                cantidaD_ENVIADA:
                  item.cantidaD_ENVIADA ?? item.cantidaD_ENVIADA + ' ' + item.nombrE_UOM,
                cantidad: item.cantidad + ' ' + item.nombrE_UOM
              }))}
            />
            <div className='flex justify-end'>
              <Button
                size='small'
                rounded
                variant='primary'
                text='Guardar cambios'
                icon='pen'
                // disabled={data?.dato?.iD_RECEPCION_ESTATUS != 1}
                onClick={saveChanges}
              />
            </div>
          </div>

          {showModalGuardar && (
            //  ===================================
            //  Modal para cerrar una recepcion
            <Modal
              title='Guardar cambios'
              showModal={showModalGuardar}
              setShowModal={setShowModalGuardar}
              closeCross
            >
              <FormGuardarPreciosRecepcion
                initialValues={{
                  iD_RECEPCION: data?.dato?.iD_RECEPCION,
                  iD_TIPO_TRANSACCION: 4,
                  lineas: costos,
                  guardar: false
                }}
                url='RecepcionCabecera/precios'
                closeModal={setShowModalGuardar}
              />
            </Modal>
          )}
        </>
      </LayoutPermiso>
    </MainLayout>
  );
}
