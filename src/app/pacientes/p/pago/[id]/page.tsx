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
import { FormEliminarPago } from '@/components/forms/eliminarPago';

function Pago({ params }: { params: { id: number } }) {
  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`pagos/${params.id}`);

  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <MainLayout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='flex justify-between'>
            <TitlePage title={`Informacion de Pago`} />
          </div>

          <div className='mt-4 flex justify-end space-x-3'>
            <Button
              size='small'
              rounded
              variant='danger'
              text='Eliminar Pago'
              icon='trash'
              disabled={data?.data?.pago.finalizada}
              onClick={() => setShowModalDelete(true)}
            />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
            <InfoPaciente title='Estudio' info={data?.data?.pago.pago_id || 'No tiene'} />
            <InfoPaciente
              title='Modo de pago'
              info={data?.data?.pago.modo_de_pago.trim() || 'No tiene'}
            />
            <InfoPaciente title='Hora' info={data?.data?.pago.hora || 'No tiene'} />
            <InfoPaciente title='Fecha' info={data?.data?.pago.fecha || 'No tiene'} />
            <InfoPaciente title='Cantidad' info={toMoney(data?.data?.pago.cantidad)} />
            <InfoPaciente title='Empleado' info={data?.data?.pago.empleado} />
          </div>

          {showModalDelete && (
            <Modal
              title='Eliminar Pago'
              showModal={showModalDelete}
              setShowModal={setShowModalDelete}
              closeCross
            >
              <FormEliminarPago
                initialValues={{
                  id: params.id,
                  eliminar: false
                }}
                url='pagos/delete'
                closeModal={setShowModalDelete}
              />
            </Modal>
          )}
        </>
      )}
    </MainLayout>
  );
}

export default Pago;
