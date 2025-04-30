'use client';
import { Button, Table } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { Status } from '@/components/atoms/Status';
import { FormCancelarRecepcion } from '@/components/forms/const_cancelarRecepcion';
import { FormCerrarRecepcion } from '@/components/forms/const_cerrarRecepcion';
import { FormRecepcion } from '@/components/forms/const_recepcion';
import { FormRecepcionDetalle } from '@/components/forms/const_recepcionDetalle';
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
  const rutaToCheck: string = 'RecepcionCabecera.listaid';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const [showModalModificarRecepcion, setShowModalModificarRecepcion] = useState(false);
  const [showModalCancelarRecepcion, setShowModalCancelarRecepcion] = useState(false);
  const [showModalCerrarRecepcion, setShowModalCerrarRecepcion] = useState(false);
  const [showModalAddArticles, setShowModalAddArticles] = useState(false);

  const [updateData, setUpdateData] = useState(false);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `RecepcionCabecera/${params.id}`,
    { updateData }
  );

  // console.log(data);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
    document.title = 'Recepción KGD';
  }, []);

  useEffect(() => {
    if (!showModalModificarRecepcion) setUpdateData(!updateData);
    if (!showModalCancelarRecepcion) setUpdateData(!updateData);
    if (!showModalCerrarRecepcion) setUpdateData(!updateData);
    if (!showModalAddArticles) setUpdateData(!updateData);
  }, [
    showModalModificarRecepcion,
    showModalCancelarRecepcion,
    showModalCerrarRecepcion,
    showModalAddArticles
  ]);

  // console.log(data?.dato);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'iD_DETAIL_RECEPCION',
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
    // {
    //   name: 'nombrE_ALMACEN',
    //   label: 'Almacen destino'
    // },
    {
      name: 'nombrE_TIPOTRANSACCION',
      label: 'Tipo transacción'
    },
    // {
    //   name: 'nombrE_UOM',
    //   label: 'UOM'
    // },
    {
      name: 'cantidaD_ENVIADA',
      label: 'Cantidad enviada'
    },
    {
      name: 'cantidad',
      label: 'Cantidad recepción'
    },
    {
      name: 'costo',
      label: 'Costo',
      isRight: true
    },
    {
      name: 'tipO_MONEDA',
      label: 'Moneda'
    }
  ];

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='RecepcionCabecera.listaid'>
        <>
          <div className='flex justify-between'>
            <TitlePage title='Informacion de Recepción' />
          </div>

          <div className='mt-4 flex justify-end space-x-3'>
            <Button
              size='small'
              rounded
              variant='primary'
              text='Cerrar recepción'
              icon='pen'
              disabled={
                data?.dato?.lineas?.length == 0 ||
                data?.dato?.iD_RECEPCION_ESTATUS == 2 ||
                data?.dato?.iD_RECEPCION_ESTATUS == 4 ||
                data?.dato?.iD_RECEPCION_ESTATUS == 5
              }
              onClick={() => setShowModalCerrarRecepcion(true)}
            />
            <Button
              size='small'
              rounded
              variant='primary'
              text='Cancelar recepción'
              icon='trash'
              disabled={
                data?.dato?.iD_RECEPCION_ESTATUS == 2 ||
                data?.dato?.iD_RECEPCION_ESTATUS == 4 ||
                data?.dato?.iD_RECEPCION_ESTATUS == 5
              }
              onClick={() => setShowModalCancelarRecepcion(true)}
            />
            <Button
              size='small'
              rounded
              variant='primary'
              text='Modificar'
              icon='pen'
              disabled={data?.dato?.iD_RECEPCION_ESTATUS != 1}
              onClick={() => setShowModalModificarRecepcion(true)}
            />
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

          <div className='mt-5 flex flex-row flex-wrap gap-5'>
            <div className='flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white py-2 px-3'>
              <b className='text-gray-600'>Agregar artículos</b>
              <Button
                onClick={() => setShowModalAddArticles(true)}
                size='small'
                variant='primary'
                text='Nuevo'
                icon='plus'
                disabled={
                  data?.dato?.iD_RECEPCION_ESTATUS == 2 ||
                  data?.dato?.iD_RECEPCION_ESTATUS == 4 ||
                  data?.dato?.iD_RECEPCION_ESTATUS == 5
                }
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
                cantidaD_ENVIADA:
                  item.cantidaD_ENVIADA ?? item.cantidaD_ENVIADA + ' ' + item.nombrE_UOM,
                cantidad: item.cantidad + ' ' + item.nombrE_UOM
              }))}
              href='movimientos/recepcion/detalle'
            />
          </div>

          {showModalModificarRecepcion && (
            //  ===================================
            //  Modal para agregar servicos
            <Modal
              title='Modificar recepción'
              showModal={showModalModificarRecepcion}
              setShowModal={setShowModalModificarRecepcion}
              closeCross
            >
              <FormRecepcion
                initialValues={{
                  iD_RECEPCION: params.id,
                  chofer: data?.dato?.chofer,
                  referencia: data?.dato?.referencia,
                  descripcion: data?.dato?.descripcion.toUpperCase(),
                  iD_ALMACEN: data?.dato?.iD_ALMACEN,
                  fechA_RECEPCION: parseDate(data?.dato?.fechA_RECEPCION, '', 0).split('T')[0],
                  iD_PROVEEDOR: data?.dato?.iD_PROVEEDOR,
                  iD_TIPO_TRANSACCION: data?.dato?.iD_TIPO_TRANSACCION,
                  iD_RECEPCION_ESTATUS: 1
                }}
                url='RecepcionCabecera'
                isEditForm
                closeModal={setShowModalModificarRecepcion}
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
              <FormRecepcionDetalle
                url='RecepcionDetalle'
                closeModal={setShowModalAddArticles}
                initialValues={{
                  // iD_DETAIL_RECEPCION: '',
                  iD_RECEPCION: params.id,
                  fechA_RECEPCION: new Date().toISOString().split('T')[0],
                  linea: 1,

                  referencia: '',
                  descripcion: '',
                  iD_ITEM: '',
                  iD_TIPO_MONEDA: 1,
                  cantidad: '',
                  iD_ALMACENORIGEN: null, //Ocupamos obtener el almacen actual
                  iD_ALMACEN: data?.dato?.iD_ALMACEN,
                  iD_UOM: '',
                  iD_TIPO_TRANSACCION: 4,
                  costo: 0,

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

          {showModalCerrarRecepcion && (
            //  ===================================
            //  Modal para cerrar una recepcion
            <Modal
              title='Cerrar recepción'
              showModal={showModalCerrarRecepcion}
              setShowModal={setShowModalCerrarRecepcion}
              closeCross
            >
              <FormCerrarRecepcion
                initialValues={{
                  iD_RECEPCION: params.id,
                  iD_RECEPCION_ESTATUS: 2,
                  cerrar: false
                }}
                url='RecepcionCabecera'
                closeModal={setShowModalCerrarRecepcion}
              />
            </Modal>
          )}

          {showModalCancelarRecepcion && (
            //  ===================================
            //  Modal para cancelar recepcion
            <Modal
              title='Cancelar recepción'
              showModal={showModalCancelarRecepcion}
              setShowModal={setShowModalCancelarRecepcion}
              closeCross
            >
              <FormCancelarRecepcion
                initialValues={{
                  iD_RECEPCION: params.id,
                  iD_RECEPCION_ESTATUS: 4,
                  cancelar: false
                }}
                url='RecepcionCabecera'
                closeModal={setShowModalCancelarRecepcion}
              />
            </Modal>
          )}
        </>
      </LayoutPermiso>
    </MainLayout>
  );
}
