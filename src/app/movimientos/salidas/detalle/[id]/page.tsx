'use client';
import { Button } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { FormCerrarRecepcion } from '@/components/forms/const_cerrarRecepcion';
import { FormEliminarDetalleRecepcion } from '@/components/forms/const_eliminarDetalleRecepcion';
import { FormEliminarDetalleSalida } from '@/components/forms/const_eliminarDetalleSalida';
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
  const rutaToCheck: string = 'movimientos.salida.show';
  const rutasToCheck: string[] = [rutaToCheck];
  const [checked, setChecked] = useState([] as any);

  const [showModalModificarRecepcion, setShowModalModificarRecepcion] = useState(false);
  const [showModalCancelarRecepcion, setShowModalCancelarRecepcion] = useState(false);
  const [showModalCerrarRecepcion, setShowModalCerrarRecepcion] = useState(false);
  const [showModalAddArticles, setShowModalAddArticles] = useState(false);

  const [showModalEliminar, setShowModalEliminar] = useState(false);

  const [updateData, setUpdateData] = useState(false);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `SalidasDetalle/${params.id}`,
    { updateData }
  );

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    handrePermisos(rutasToCheck, setChecked);
    document.title = 'Salida Detalle KGD';
  }, []);

  useEffect(() => {
    if (!showModalEliminar) setUpdateData(!updateData);
  }, [showModalEliminar]);

  console.log(data);

  return (
    <MainLayout>
      <LayoutPermiso checked={checked} name='movimientos.salida.show'>
        <>
          <div className='flex justify-between'>
            <TitlePage title='Información Detalle Salida' />
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
            {/* <Button
              size='small'
              rounded
              variant='primary'
              text='Modificar'
              icon='pen'
              disabled={false}
              onClick={() => setShowModalModificarRecepcion(true)}
            /> */}
            <Button
              size='small'
              rounded
              variant='danger'
              text='Eliminar'
              icon='trash'
              disabled={data?.dato?.iD_SALIDA_ESTATUS != 1}
              onClick={() => setShowModalEliminar(true)}
            />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <InfoPaciente title='Código' info={data?.dato?.item?.toUpperCase() || 'No tiene'} />
            <InfoPaciente
              title='Artículo'
              info={data?.dato?.descripcion?.toUpperCase() || 'No tiene'}
            />
            {/* <InfoPaciente
              title='Almacen origen'
              info={data?.dato?.nombrE_ALMACENORIGEN || 'No tiene'}
            /> */}
            <InfoPaciente title='Almacen destino' info={data?.dato?.nombrE_ALMACEN || 'No tiene'} />
            <InfoPaciente
              title='Tipo de transacción'
              info={data?.dato?.nombrE_TIPOTRANSACCION || 'No tiene'}
            />
            {/* <InfoPaciente
              title='Cantidad enviada'
              info={data?.dato?.cantidaD_ENVIADA + ' ' + data?.dato?.nombrE_UOM}
            /> */}
            <InfoPaciente
              title='Cantidad recepción'
              info={data?.dato?.cantidad + ' ' + data?.dato?.nombrE_UOM}
            />
            <InfoPaciente title='Costo' info={toMoney(data?.dato?.costo) || 'No tiene'} />
            {/* <InfoPaciente title='Unidad de medida' info={data?.dato?.nombrE_UOM || 'No tiene'} /> */}

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

          {showModalEliminar && (
            //  ===================================
            //  Modal para cancelar recepcion
            <Modal
              title='Eliminar artículo'
              showModal={showModalEliminar}
              setShowModal={setShowModalEliminar}
              closeCross
            >
              <FormEliminarDetalleSalida
                initialValues={{
                  iD_DETAIL_SALIDA: params.id,
                  eliminar: false
                }}
                url='SalidasDetalle'
                closeModal={setShowModalEliminar}
              />
            </Modal>
          )}
        </>
      </LayoutPermiso>
    </MainLayout>
  );
}
