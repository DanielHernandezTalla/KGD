'use client';
import { Button } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { FormCerrarRecepcion } from '@/components/forms/const_cerrarRecepcion';
import { FormEliminarDetalleRecepcion } from '@/components/forms/const_eliminarDetalleRecepcion';
import { FormRecepcion } from '@/components/forms/const_recepcion';
import { FormRecepcionDetalle } from '@/components/forms/const_recepcionDetalle';
import MainLayout from '@/components/layouts/MainLayout';
import { TitlePage } from '@/components/molecules';
import Modal from '@/components/molecules/Modal';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { parseDate } from '@/utils/parseDate';
import { toMoney } from '@/utils/toMoney';
import { useEffect, useState } from 'react';

export default function RecepcionDetalleSingle({ params }: { params: { id: number } }) {
  const rutaToCheck: string = 'RecepcionCabecera.listaid';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const [showModalModificar, setShowModalModificar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);

  const [updateData, setUpdateData] = useState(false);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `RecepcionDetalle/${params.id}`,
    { updateData }
  );

  // console.log(data);

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
    document.title = 'Recepción KGD';
  }, []);

  useEffect(() => {
    if (!showModalModificar) setUpdateData(!updateData);
    if (!showModalEliminar) setUpdateData(!updateData);
  }, [showModalModificar, showModalEliminar]);

  // console.log(data);

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='RecepcionCabecera.listaid'>
        <>
          <div className='flex justify-between'>
            <TitlePage title='Información Detalle Recepción' />
          </div>

          <div className='mt-4 flex justify-end space-x-3'>
            {/* <Button
              size='small'
              rounded
              variant='primary'
              text='Cerrar recepción'
              icon='pen'
              disabled={false}
              onClick={() => setShowModalCerrarRecepcion(true)}
            />
            <Button
              size='small'
              rounded
              variant='primary'
              text='Cancelar recepción'
              icon='trash'
              disabled={false}
              onClick={() => setShowModalCancelarRecepcion(true)}
            /> */}
            <Button
              size='small'
              rounded
              variant='primary'
              text='Modificar'
              icon='pen'
              disabled={data?.dato?.iD_RECEPCION_ESTATUS != 1}
              onClick={() => setShowModalModificar(true)}
            />
            <Button
              size='small'
              rounded
              variant='danger'
              text='Eliminar'
              icon='trash'
              disabled={
                data?.dato?.iD_RECEPCION_ESTATUS != 1 || data?.dato?.iD_TIPO_TRANSACCION != 4
              }
              onClick={() => setShowModalEliminar(true)}
            />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <InfoPaciente title='Articulo' info={data?.dato?.item?.toUpperCase() || 'No tiene'} />
            <InfoPaciente
              title='Descripción'
              info={data?.dato?.descripcion?.toUpperCase() || 'No tiene'}
            />
            {/* <InfoPaciente
              title='Almacen origen'
              info={data?.dato?.nombrE_ALMACENORIGEN || 'No tiene'}
            /> */}
            {/* <InfoPaciente title='Almacen destino' info={data?.dato?.nombrE_ALMACEN || 'No tiene'} /> */}
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
            <InfoPaciente
              title='Cantidad enviada'
              info={data?.dato?.cantidaD_ENVIADA + ' ' + data?.dato?.nombrE_UOM}
            />
            <InfoPaciente
              title='Cantidad recepción'
              info={data?.dato?.cantidad + ' ' + data?.dato?.nombrE_UOM}
            />
            <InfoPaciente title='Costo' info={toMoney(data?.dato?.costo) || 'No tiene'} />

            <InfoPaciente title='Unidad de medida' info={data?.dato?.tipO_MONEDA || 'No tiene'} />

            {/* <InfoPaciente title='Proveedor' info={data?.dato?.nombrE_PROVEEDOR || 'No tiene'} />

            <InfoPaciente title='Creado por' info={data?.dato?.creadO_NOMBRE || 'No tiene'} /> */}

            {/* <div className='flex flex-col gap-3'>
              <b className='text-gray-600'>Estatus</b>
              <Status
                status={data?.dato?.nombrE_RECEPCIONESTATUS != 'CANCELADO' ? true : false}
                text={data?.dato?.nombrE_RECEPCIONESTATUS}
              />
            </div> */}
          </div>

          {showModalModificar && (
            //  ===================================
            //  Modal editar item (detalle de recepcion)
            <Modal
              title='Modificar recepción'
              showModal={showModalModificar}
              setShowModal={setShowModalModificar}
              closeCross
            >
              <FormRecepcionDetalle
                initialValues={{
                  iD_DETAIL_RECEPCION: data?.dato?.iD_DETAIL_RECEPCION,
                  iD_RECEPCION: data?.dato?.iD_RECEPCION,
                  fechA_RECEPCION: data?.dato?.fechA_RECEPCION,
                  linea: data?.dato?.linea,
                  referencia: data?.dato?.referencia,
                  descripcion: data?.dato?.descripcion,
                  iD_ITEM: data?.dato?.iD_ITEM,
                  iD_TIPO_MONEDA: data?.dato?.iD_TIPO_MONEDA,
                  cantidad: data?.dato?.cantidad,
                  // iD_ALMACENORIGEN: data?.dato?.iD_ALMACENORIGEN,
                  iD_ALMACEN: data?.dato?.iD_ALMACEN,
                  iD_UOM: data?.dato?.iD_UOM,
                  iD_TIPO_TRANSACCION: data?.dato?.iD_TIPO_TRANSACCION,
                  costo: data?.dato?.costo,
                  segmento01: data?.dato?.segmento01,
                  segmento02: data?.dato?.segmento02,
                  segmento03: data?.dato?.segmento03,
                  segmento04: data?.dato?.segmento04,
                  item: data?.dato?.item,
                  creadO_POR: data?.dato?.creadO_POR
                }}
                url='RecepcionDetalle'
                isEditForm
                closeModal={setShowModalModificar}
              />
            </Modal>
          )}
          {/* Instrucción UPDATE en conflicto con la restricción FOREIGN KEY 'FK_RECEPCION_DETALLE_ALMACENES */}

          {showModalEliminar && (
            //  ===================================
            //  Modal para eliminar detalle de recepcion
            //  Modal para eliminar item
            <Modal
              title='Eliminar artículo'
              showModal={showModalEliminar}
              setShowModal={setShowModalEliminar}
              closeCross
            >
              <FormEliminarDetalleRecepcion
                initialValues={{
                  iD_DETAIL_RECEPCION: params.id,
                  eliminar: false
                }}
                url='RecepcionDetalle'
                closeModal={setShowModalEliminar}
              />
            </Modal>
          )}
        </>
      </LayoutPermiso>
    </MainLayout>
  );
}
