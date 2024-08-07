'use client';
import { Button, LoadingSpinner, Table } from '@/components/atoms';
import Layout from '@/components/layouts/MainLayout';
import React, { useState, useContext } from 'react';
import { TitlePage } from '@/components/molecules';
import { IDataResponse } from '@/interface/request';
import { useRequest } from '@/hooks/useRequest';
import { Aside } from '@/components/molecules/Aside';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { Status } from '@/components/atoms/Status';
import Modal from '@/components/molecules/Modal';
import { FormCitas } from '@/components/forms/citas';
import { FormClientes } from '@/components/forms/clientes';
import { Cita } from '@/components/atoms/Cita';
import { AuthContext } from '@/hooks/AuthContext';

export default function PacienteSingle({ params }: { params: { id: number } }) {
  const { user } = useContext(AuthContext);
  const [showModalNewCita, setShowModalNewCita] = useState(false);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(
    `pacientes/extends/${params.id}/${user?.sucursal_id}`,
    {
      showModalNewCita
    }
  );

  // console.log(data);

  return (
    <Layout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='flex min-h-full flex-col gap-7 xl:flex-row'>
            <div className='flex w-full flex-col gap-5 md:gap-10'>
              <TitlePage title='Paciente' />
              <div className='flex flex-col gap-4 md:gap-7'>
                <div className='flex justify-between'>
                  <h2 className='text-2xl font-medium capitalize md:text-3xl'>{`${data?.data?.paciente.fullname}`}</h2>
                  <Button
                    size='small'
                    rounded
                    variant='primary'
                    text='Modificar'
                    icon='pen'
                    isNextLink
                    href={`/pacientes/p/${data?.data?.paciente?.id}/modificar`}
                  />
                </div>

                <div className='grid grid-cols-2 gap-3 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm'>
                  <InfoPaciente
                    title='Fecha de nacimiento'
                    info={new Date(
                      data?.data?.paciente?.fecha_nacimiento + 'T00:00:00'
                    ).toLocaleDateString('es-MX', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  />
                  <InfoPaciente title='Edad' info={data?.data?.paciente.edad + ' años'} />
                  <InfoPaciente
                    title='Celular'
                    info={data?.data?.paciente?.celular?.trim() || 'No tiene'}
                  />
                  <InfoPaciente title='Correo' info={data?.data?.paciente.correo || 'No tiene'} />
                  <InfoPaciente
                    title='Sexo'
                    info={data?.data?.paciente.sexo ? 'Masculino' : 'Femenino' || 'No tiene'}
                  />
                  <div className='flex flex-col gap-3'>
                    <b className='text-gray-600'>Estado</b>
                    <Status
                      status={data?.data?.paciente.activo ? true : false}
                      text={data?.data?.paciente.activo ? 'Activo' : 'Inactivo'}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Aside className='flex flex-col gap-5 px-4 py-5'>
              <div className='flex justify-between'>
                <h2 className='text-2xl font-semibold md:text-3xl'>Ingreso</h2>
                <Button
                  text='Nuevo'
                  icon='plus'
                  variant='primary'
                  size='small'
                  rounded
                  onClick={() => setShowModalNewCita(true)}
                />
              </div>
              {data?.data?.citas.length > 0 ? (
                data?.data?.citas.map((cita: any, index: number) => (
                  <Cita
                    key={cita.id}
                    id={cita.id}
                    index={data?.data?.citas.length - index}
                    status={cita.finalizada}
                    cita={cita}
                  />
                ))
              ) : (
                <p className='text-center'>No hay ingreso</p>
              )}
            </Aside>
          </div>

          {showModalNewCita && (
            <Modal
              title='Agregar Cita'
              showModal={showModalNewCita}
              setShowModal={setShowModalNewCita}
              closeCross
            >
              <FormCitas
                url='citas'
                closeModal={setShowModalNewCita}
                initialValues={{
                  paciente_id: data?.data?.paciente?.id,
                  medico_remitente_id: '',
                  sucursal_id: '',
                  referencia_del_paciente_id: '',
                  fecha_hora: ''
                }}
              />
            </Modal>
          )}
        </>
      )}
    </Layout>
  );
}
