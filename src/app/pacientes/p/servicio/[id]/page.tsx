'use client';
import MainLayout from '@/components/layouts/MainLayout';
import { useRequest } from '@/hooks/useRequest';
import { TitlePage } from '@/components/molecules';
import { useState } from 'react';
import { IDataResponse } from '@/interface/request';
import { Button, LoadingSpinner } from '@/components/atoms';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { Status } from '@/components/atoms/Status';
import { toMoney } from '@/utils/toMoney';
import Modal from '@/components/molecules/Modal';
import { FormEliminarServicio } from '@/components/forms/eliminarServicio';
import { FormServicios } from '@/components/forms/servicios';
import { parseDate } from '@/utils/parseDate';

function Servicio({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`servicios/${params.id}`);

  const [showModalModificarService, setShowModalModificarService] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  // console.log(data);

  return (
    <MainLayout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='flex justify-between'>
            <TitlePage title={`Informacion de Servicio`} />
          </div>

          <div className='mt-4 flex justify-end space-x-3'>
            <Button
              size='small'
              rounded
              variant='primary'
              text='Modificar Servicio'
              icon='pen'
              disabled={data?.data?.servicio.pagos}
              onClick={() => setShowModalModificarService(true)}
            />
            <Button
              size='small'
              rounded
              variant='danger'
              text='Eliminar Servicio'
              icon='trash'
              disabled={data?.data?.servicio.pagos}
              onClick={() => setShowModalDelete(true)}
            />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <InfoPaciente title='Cliente' info={data?.data?.servicio.cliente || 'No tiene'} />
            <InfoPaciente title='Estudio' info={data?.data?.servicio.estudio || 'No tiene'} />
            <InfoPaciente title='Médico' info={data?.data?.servicio.medico.trim() || 'No tiene'} />
            <InfoPaciente
              title='Técnico'
              info={data?.data?.servicio.tecnico.trim() || 'No tiene'}
            />
            <InfoPaciente title='Interprete' info={data?.data?.servicio.interprete || 'No tiene'} />
            <InfoPaciente title='Hora' info={data?.data?.servicio.hora || 'No tiene'} />
            <InfoPaciente title='Fecha' info={data?.data?.servicio.fecha || 'No tiene'} />
            <InfoPaciente title='Precio' info={toMoney(data?.data?.servicio.precio)} />
            <InfoPaciente title='Descuento' info={toMoney(data?.data?.servicio.descuento)} />
            <InfoPaciente
              title='Productividad'
              info={toMoney(data?.data?.servicio.productividad)}
            />
            <InfoPaciente title='Importe' info={toMoney(data?.data?.servicio.importe)} />
          </div>

          {showModalModificarService && (
            //  ===================================
            //  Modal para agregar servicos
            <Modal
              title='Modificar servicio'
              showModal={showModalModificarService}
              setShowModal={setShowModalModificarService}
              closeCross
            >
              <FormServicios
                url='servicios'
                isEditForm
                closeModal={setShowModalModificarService}
                initialValues={{
                  id: data?.data?.servicio.servicio_id || 0,
                  precio: data?.data?.servicio.precio || 0,
                  es_porcentaje: 0,
                  descuento: data?.data?.servicio.descuento || 0,
                  existDescuento: 0,
                  descuentoInicial: 0,
                  productividad: 0,
                  cliente_id: data?.data?.servicio.cliente_id,
                  codigos_descuento_id: data?.data?.servicio.codigo_descuentos_id,
                  grupo_de_clientes_id: data?.data?.servicio.grupo_de_clientes_id,
                  implementaciones_de_estudio_id:
                    data?.data?.servicio.implementaciones_de_estudio_id,
                  cita_id: data?.data?.servicio?.cita_id,
                  medico_id: data?.data?.servicio?.medico_id,
                  tecnico_id: data?.data?.servicio?.tecnico_id,
                  interprete_id: data?.data?.servicio?.interprete_id,
                  requiere_medico: data?.data?.servicio?.requiere_medico,
                  requiere_tecnico: data?.data?.servicio?.requiere_tecnico,
                  fecha_hora: parseDate(
                    data?.data?.servicio.fecha,
                    data?.data?.servicio?.fecha_hora,
                    0
                  )
                }}
              />
            </Modal>
          )}

          {showModalDelete && (
            <Modal
              title='Eliminar Servicio'
              showModal={showModalDelete}
              setShowModal={setShowModalDelete}
              closeCross
            >
              <FormEliminarServicio
                initialValues={{
                  id: params.id,
                  eliminar: false
                }}
                url='servicios/delete'
                closeModal={setShowModalDelete}
              />
            </Modal>
          )}
        </>
      )}
    </MainLayout>
  );
}

export default Servicio;
