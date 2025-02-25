'use client';
import { Button, Table } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { Status } from '@/components/atoms/Status';
import { FormCancelarSalida } from '@/components/forms/const_cancelarSalida';
import { FormCerrarSalida } from '@/components/forms/const_cerrarSalida';
import { FormRecepcionDetalle } from '@/components/forms/const_recepcionDetalle';
import { FormSalida } from '@/components/forms/const_salida';
import { FormSalidaDetalle } from '@/components/forms/const_salidaDetalle';
import MainLayout from '@/components/layouts/MainLayout';
import { TitlePage } from '@/components/molecules';
import Modal from '@/components/molecules/Modal';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { TABLECOLUMN } from '@/interface/types';
import { handrePermisos } from '@/utils/handlePermisos';
import { parseDate } from '@/utils/parseDate';
import { toMoney } from '@/utils/toMoney';
import { useEffect, useState } from 'react';

export default function RecepcionSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'movimientos.salida.show';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const [showModalModificarSalida, setShowModalModificarSalida] = useState(false);
  const [showModalCancelarSalida, setShowModalCancelarSalida] = useState(false);
  const [showModalCerrarSalida, setShowModalCerrarSalida] = useState(false);
  const [showModalAddArticles, setShowModalAddArticles] = useState(false);

  const [updateData, setUpdateData] = useState(false);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `SalidasCabecera/${params.id}`,
    { updateData }
  );

  // console.log(data?.dato);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
    document.title = 'Salida KGD';
  }, []);

  useEffect(() => {
    if (!showModalModificarSalida) setUpdateData(!updateData);
    if (!showModalCancelarSalida) setUpdateData(!updateData);
    if (!showModalCerrarSalida) setUpdateData(!updateData);
    if (!showModalAddArticles) setUpdateData(!updateData);
  }, [
    showModalModificarSalida,
    showModalCancelarSalida,
    showModalCerrarSalida,
    showModalAddArticles
  ]);

  console.log(data?.dato);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_DETAIL_SALIDA',
      label: '#'
    },
    {
      name: 'item',
      label: 'Código'
    },
    {
      name: 'descripcion',
      label: 'Descripción'
    },
    {
      name: 'nombrE_ALMACEN',
      label: 'Almacen'
    },
    {
      name: 'nombrE_ALMACENDESTINO',
      label: 'Almacen destino'
    },
    {
      name: 'nombrE_TIPOTRANSACCION',
      label: 'Tipo transacción'
    },
    // {
    //   name: 'nombrE_UOM',
    //   label: 'UOM'
    // },
    // {
    //   name: 'cantidaD_ENVIADA',
    //   label: 'Cantidad enviada'
    // },
    {
      name: 'cantidad',
      label: 'Cantidad recepción'
    },
    {
      name: 'costo',
      label: 'Costo',
      isRight: true
    }
  ];

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='movimientos.salida.show'>
        <>
          <div className='flex justify-between'>
            <TitlePage title='Información de Salidas' />
          </div>

          <div className='mt-4 flex justify-end space-x-3'>
            {data?.dato?.iD_SALIDA_ESTATUS != 2 && (
              <Button
                size='small'
                rounded
                variant='primary'
                text='Cerrar salida'
                icon='pen'
                disabled={
                  data?.dato?.lineas?.length == 0 ||
                  data?.dato?.iD_SALIDA_ESTATUS == 2 ||
                  data?.dato?.iD_SALIDA_ESTATUS == 4
                }
                onClick={() => setShowModalCerrarSalida(true)}
              />
            )}
            {data?.dato?.iD_SALIDA_ESTATUS != 2 && (
              <Button
                size='small'
                rounded
                variant='primary'
                text='Cancelar salida'
                icon='trash'
                disabled={data?.dato?.iD_SALIDA_ESTATUS == 2 || data?.dato?.iD_SALIDA_ESTATUS == 4}
                onClick={() => setShowModalCancelarSalida(true)}
              />
            )}
            <Button
              size='small'
              rounded
              variant='primary'
              text='Modificar'
              icon='pen'
              disabled={data?.dato?.iD_SALIDA_ESTATUS != 1}
              onClick={() => setShowModalModificarSalida(true)}
            />
            {data?.dato?.iD_SALIDA_ESTATUS == 2 && (
              // <Button
              //   size='small'
              //   rounded
              //   variant='primary'
              //   text='Imprimir PDF'
              //   icon='reports'
              //   onClick={() => setShowModalModificarSalida(true)}
              // />
              <Button
                size='small'
                rounded
                variant='primary'
                text='Descargar PDF'
                icon='descarga'
                href={'/movimientos/salidas/pdfView/' + params.id}
                target='_blank'
              />
            )}
          </div>

          <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <InfoPaciente
              title='Descripción'
              info={data?.dato?.descripcion?.toUpperCase() || 'No tiene'}
            />
            <InfoPaciente
              title='Fecha'
              info={
                new Date(data?.dato?.fechA_SALIDA)
                  .toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  .toUpperCase() || 'No tiene'
              }
            />
            <InfoPaciente title='Almacen' info={data?.dato?.nombrE_ALMACEN || 'No tiene'} />
            <InfoPaciente title='Proveedor' info={data?.dato?.nombrE_PROVEEDOR || 'No tiene'} />
            <InfoPaciente
              title='Tipo de transacción'
              info={data?.dato?.nombrE_TIPO_TRANSACCION || 'No tiene'}
            />
            <InfoPaciente title='Creado por' info={data?.dato?.creadO_NOMBRE || 'No tiene'} />

            <div className='flex flex-col gap-3'>
              <b className='text-gray-600'>Estatus</b>
              <Status
                status={data?.dato?.nombrE_SALIDA_ESTATUS != 'CANCELADO' ? true : false}
                text={data?.dato?.nombrE_SALIDA_ESTATUS}
              />
            </div>
          </div>

          <div className='mt-5 flex flex-row flex-wrap gap-5'>
            <div className='flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white py-2 px-3'>
              <b className='text-gray-600'>Agregar artículos</b>
              <Button
                onClick={() => setShowModalAddArticles(true)}
                size='small'
                variant='primary'
                text='Nuevo'
                icon='plus'
                disabled={data?.dato?.iD_SALIDA_ESTATUS == 2 || data?.dato?.iD_SALIDA_ESTATUS == 4}
              />
            </div>
          </div>

          <div className='my-5 grid gap-3 rounded-3xl bg-white'>
            <Table
              className='min-h-[309.88px]'
              cols={tableHeaders}
              idColumn={'iD_DETAIL_SALIDA'}
              data={data?.dato?.lineas.map((item: any, index: any) => ({
                ...item,
                costo: toMoney(item.costo),
                cantidaD_ENVIADA: item.cantidaD_ENVIADA + ' ' + item.nombrE_UOM,
                cantidad: item.cantidad + ' ' + item.nombrE_UOM
              }))}
              href='movimientos/salidas/detalle'
            />
          </div>

          {showModalModificarSalida && (
            //  ===================================
            //  Modal para modificar una salida
            <Modal
              title='Modificar salida'
              showModal={showModalModificarSalida}
              setShowModal={setShowModalModificarSalida}
              closeCross
            >
              <FormSalida
                initialValues={{
                  iD_SALIDA: params.id,
                  descripcion: data?.dato?.descripcion.toUpperCase(),
                  iD_ALMACEN: data?.dato?.iD_ALMACEN,
                  fechA_SALIDA: parseDate(data?.dato?.fechA_SALIDA, '', 0).split('T')[0],
                  // iD_PROVEEDOR: data?.dato?.iD_PROVEEDOR,
                  iD_TIPO_TRANSACCION: data?.dato?.iD_TIPO_TRANSACCION,
                  iD_SALIDA_ESTATUS: 1
                }}
                url='SalidasCabecera'
                isEditForm
                closeModal={setShowModalModificarSalida}
              />
            </Modal>
          )}

          {showModalAddArticles && (
            //  ===================================
            //  Modal para agregar articulos
            <Modal
              title='Agregar artículo'
              showModal={showModalAddArticles}
              setShowModal={setShowModalAddArticles}
              closeCross
            >
              <FormSalidaDetalle
                url='SalidasDetalle'
                closeModal={setShowModalAddArticles}
                initialValues={{
                  // iD_DETAIL_RECEPCION: '',
                  iD_SALIDA: params.id,
                  fechA_SALIDA: new Date().toISOString().split('T')[0],
                  linea: 1,

                  referencia: '',
                  descripcion: '',
                  iD_ITEM: '',
                  cantidad: '',
                  iD_ALMACEN: data?.dato?.iD_ALMACEN,
                  iD_ALMACENDESTINO: '',
                  iD_UOM: '',
                  iD_TIPO_TRANSACCION: data?.dato?.iD_TIPO_TRANSACCION,
                  costo: '',

                  segmento01: '',
                  segmento02: '',
                  segmento03: '',
                  segmento04: '',

                  item: '',
                  creadO_POR: 3
                }}
              />
            </Modal>
          )}

          {showModalCerrarSalida && (
            //  ===================================
            //  Modal para cerrar una salida
            <Modal
              title='Cerrar salida'
              showModal={showModalCerrarSalida}
              setShowModal={setShowModalCerrarSalida}
              closeCross
            >
              <FormCerrarSalida
                initialValues={{
                  iD_SALIDA: params.id,
                  iD_SALIDA_ESTATUS: 2,
                  cerrar: false
                }}
                url='SalidasCabecera'
                closeModal={setShowModalCerrarSalida}
              />
            </Modal>
          )}

          {showModalCancelarSalida && (
            //  ===================================
            //  Modal para cancelar una salida
            <Modal
              title='Cancelar salida'
              showModal={showModalCancelarSalida}
              setShowModal={setShowModalCancelarSalida}
              closeCross
            >
              <FormCancelarSalida
                initialValues={{
                  iD_SALIDA: params.id,
                  iD_SALIDA_ESTATUS: 4,
                  cancelar: false
                }}
                url='SalidasCabecera'
                closeModal={setShowModalCancelarSalida}
              />
            </Modal>
          )}
        </>
      </LayoutPermiso>
    </MainLayout>
  );
}
