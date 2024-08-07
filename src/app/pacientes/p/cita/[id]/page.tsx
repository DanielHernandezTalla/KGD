'use client';
import React, { useContext, useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useRequest } from '@/hooks/useRequest';
import { Button, LoadingSpinner, Table } from '@/components/atoms';
import { TitlePage } from '@/components/molecules';
import { IDataResponse } from '@/interface/request';
import { InfoPaciente } from '@/components/atoms/InfoPaciente';
import { toMoney } from '@/utils/toMoney';
import { Status } from '@/components/atoms/Status';
import Modal from '@/components/molecules/Modal';
import { FormServicios } from '@/components/forms/servicios';
import { Nota } from '@/components/atoms/Nota';
import { FormNota } from '@/components/forms/nota';
import { AuthContext } from '@/hooks/AuthContext';
import { FormFactura } from '@/components/forms/factura';
import { FormPagarRecepcion } from '@/components/forms/pagarRecepcion';
import { FormCitas } from '@/components/forms/citas';
import { parseDate } from '@/utils/parseDate';
import { TABLECOLUMN } from '@/interface/types';
import { FormPagarCita } from '@/components/forms/pagarCita';
import { FormEliminarCita } from '@/components/forms/eliminarCita';

export default function Cita({ params }: { params: { id: number } }) {
  const { user } = useContext(AuthContext);

  const [showModalFactura, setShowModalFactura] = useState(false);
  const [showModalModificar, setShowModalModificar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [showModalAddService, setShowModalAddService] = useState(false);
  const [showModalPagarCita, setShowModalPagarCita] = useState(false);
  const [showModalPagarRecepcion, setShowModalPagarRecepcion] = useState(false);
  const [showModalNote, setShowModalNote] = useState(false);

  const [editNote, setEditNote] = useState(false);
  const [valueNote, setValueNote] = useState({});
  const [updateData, setUpdateData] = useState(false);

  const { data, isError, isLoading }: IDataResponse<any> = useRequest(`citas/${params.id}`, {
    updateData
  });

  // console.log(data);

  useEffect(() => {
    if (!showModalFactura) setUpdateData(!updateData);
    if (!showModalModificar) setUpdateData(!updateData);
    if (!showModalEliminar) setUpdateData(!updateData);
    if (!showModalAddService) setUpdateData(!updateData);
    if (!showModalPagarCita) setUpdateData(!updateData);
    if (!showModalPagarRecepcion) setUpdateData(!updateData);
    if (!showModalNote) setUpdateData(!updateData);
  }, [
    showModalFactura,
    showModalModificar,
    showModalEliminar,
    showModalAddService,
    showModalPagarCita,
    showModalPagarRecepcion,
    showModalNote
  ]);

  const tableHeaders: TABLECOLUMN[] = [
    {
      name: 'numero',
      label: '#'
    },
    {
      name: 'estudio',
      label: 'Estudio'
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
      name: 'medico',
      label: 'Médico'
    },
    {
      name: 'tecnico',
      label: 'Técnico'
    },
    {
      name: 'interprete',
      label: 'Interprete'
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
      name: 'productividad',
      label: 'Productividad',
      isRight: true
    },
    {
      name: 'importe',
      label: 'Importe',
      isRight: true
    }
  ];

  const tableHeadersPagos: TABLECOLUMN[] = [
    {
      name: 'pago_id',
      label: '#'
    },
    {
      name: 'modo_de_pago',
      label: 'Modo de pago  '
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
      name: 'empleado',
      label: 'Empleado'
    },
    {
      name: 'cantidad',
      label: 'Cantidad',
      isRight: true
    }
  ];

  // Funciones generales
  const handleNewNote = () => {
    setEditNote(false);
    setValueNote({});
    setShowModalNote(true);
  };

  const handleShowEditNote = (nota: {}) => {
    setEditNote(true);
    setValueNote(nota);
    setShowModalNote(true);
  };

  return (
    <MainLayout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='flex justify-between'>
            <TitlePage title='Informacion de Ingreso' />
          </div>

          <div className='mt-4 flex justify-end space-x-3'>
            {/* <Button
              size='small'
              rounded
              variant='primary'
              text='Terminar Cita'
              icon='pen'
              disabled={data?.data?.cita?.finalizada}
              // onClick={() => setShowModalEdit(true)}
            /> */}
            <Button
              size='small'
              rounded
              variant='primary'
              text='Facturar'
              icon='pen'
              disabled={data?.data?.cita?.finalizada}
              onClick={() => setShowModalFactura(true)}
            />
            <Button
              size='small'
              rounded
              variant='primary'
              text='Modificar Cita'
              icon='pen'
              onClick={() => setShowModalModificar(true)}
            />
            <Button
              size='small'
              rounded
              variant='danger'
              text='Eliminar Cita'
              icon='trash'
              disabled={
                data?.data?.cita?.pagada ||
                data?.data?.cita?.finalizada ||
                data?.data?.servicios.length > 0 ||
                data?.data?.pagos.length > 0
              }
              onClick={() => setShowModalEliminar(true)}
            />
          </div>

          <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
            {/* <InfoPaciente title='Cita' info={data?.data?.cita?.id || 'No tiene'} /> */}
            <InfoPaciente title='Paciente' info={data?.data?.cita?.paciente || 'No tiene'} />
            <InfoPaciente title='Médico' info={data?.data?.cita?.medico_remitente || 'No tiene'} />
            <InfoPaciente title='Sucursal' info={data?.data?.cita?.sucursal || 'No tiene'} />
            <InfoPaciente title='Referencia' info={data?.data?.cita?.referencia || 'No tiene'} />
            <InfoPaciente title='Hora' info={data?.data?.cita?.hora || 'No tiene'} />
            <InfoPaciente title='Fecha' info={data?.data?.cita?.fecha || 'No tiene'} />
            {/* <InfoPaciente title='Importe' info={toMoney(data?.data?.cita?.importe_total)} /> */}
            {/* <InfoPaciente title='Saldo' info={toMoney(data?.data?.cita?.saldo)} /> */}
            <div className='flex flex-col gap-3'>
              <b className='text-gray-600'>Pagada</b>
              <Status
                status={data?.data?.cita?.pagada ? true : false}
                text={data?.data?.cita?.pagada ? 'Si pagada' : 'No pagada'}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <b className='text-gray-600'>Pagada en recepción</b>
              <Status
                status={data?.data?.cita?.pagada_en_recepcion}
                text={data?.data?.cita?.pagada_en_recepcion ? 'Si' : 'No'}
              />
            </div>
            <InfoPaciente title='Factura' info={data?.data?.cita?.factura || 'No tiene'} />
            <div className='flex flex-col gap-3'>
              <b className='text-gray-600'>Finalizada</b>
              <Status
                status={data?.data?.cita?.finalizada ? true : false}
                text={data?.data?.cita?.finalizada ? 'Si finalizada' : 'No finalizada'}
              />
            </div>
          </div>

          <div className='mt-5 flex flex-row flex-wrap gap-5'>
            <div className='flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white py-2 px-3'>
              <b className='text-gray-600'>Agregar servicio</b>
              <Button
                onClick={() => setShowModalAddService(true)}
                size='small'
                variant='primary'
                text='Nuevo'
                icon='plus'
                disabled={data?.data?.cita?.pagada || data?.data?.cita?.finalizada}
              />
            </div>

            <div className='flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white py-2 px-3'>
              <b className='text-gray-600 mr-10'>Pagar cita</b>
              <Button
                onClick={() => setShowModalPagarCita(true)}
                size='small'
                variant='primary'
                text='Pagar'
                icon='plus'
                disabled={
                  data?.data?.cita?.pagada ||
                  data?.data?.cita?.finalizada ||
                  data?.data?.cita?.importe_total === 0
                }
              />
            </div>

            <div className='flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white py-2 px-3'>
              <b className='text-gray-600 mr-10'>Pagada en recepción</b>
              {data?.data?.cita?.pagada_en_recepcion ? (
                <Button
                  onClick={() => setShowModalPagarRecepcion(true)}
                  size='small'
                  variant='primary'
                  text='Quitar pago'
                  icon='plus'
                  disabled={!data?.data?.cita?.pagada_en_recepcion || data?.data?.cita?.finalizada}
                />
              ) : (
                <Button
                  onClick={() => setShowModalPagarRecepcion(true)}
                  size='small'
                  variant='primary'
                  text='Pagar'
                  icon='plus'
                  disabled={data?.data?.cita?.pagada_en_recepcion || data?.data?.cita?.finalizada}
                />
              )}
            </div>
          </div>

          <div className='my-5 grid gap-3 rounded-3xl bg-white'>
            <Table
              className='min-h-[309.88px]'
              cols={tableHeaders}
              idColumn={'servicio_id'}
              data={data?.data?.servicios.map((terapia: any, index: any) => ({
                ...terapia,
                numero: index + 1,
                precio: toMoney(terapia.precio),
                descuento: toMoney(terapia.descuento),
                productividad: toMoney(terapia.productividad),
                importe: toMoney(terapia.importe),
                fecha_hora: terapia.fecha_hora
                  ? terapia.fecha_hora.split(':')[0].slice(-2) +
                    ':' +
                    terapia.fecha_hora.split(':')[1] +
                    ':00'
                  : ''
              }))}
              href='pacientes/p/servicio'
            />
            {/* Section to show totals in services table */}
            <div className='grid grid-cols-3 gap-5 p-5 pt-0'>
              <div className='col-end-4 flex justify-between'>
                <b className='truncate text-gray-600'>Total:</b>
                <p className='truncate text-right font-semibold text-gray-500'>
                  {toMoney(data?.data?.cita?.importe_total)}
                </p>
              </div>
              <div className='col-end-4 flex justify-between'>
                <b className='truncate text-gray-600'>Abono:</b>
                <p className='truncate text-right font-semibold text-gray-500'>
                  {toMoney(data?.data?.cita?.saldo)}
                </p>
              </div>
              <div className='col-end-4 flex justify-between'>
                <b className='truncate text-gray-600'>Saldo:</b>
                <p className='truncate text-right font-semibold text-gray-500'>
                  {toMoney(data?.data?.cita?.importe_total - data?.data?.cita?.saldo)}                  
                </p>
              </div>
            </div>
          </div>

          <div className='my-5 flex justify-between'>
            <h2 className='text-3xl font-medium'>Notas</h2>
            <Button
              size='small'
              rounded
              variant='primary'
              text='Nuevo'
              icon='plus'
              onClick={() => handleNewNote()}
            />
          </div>

          <div className='rounded-2xl border-2 border-gray-200 bg-white p-5 text-sm md:grid'>
            {!data?.data?.notas || data?.data?.notas?.length === 0 ? (
              <div className='mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3'>
                <span className='rounded-lg bg-slate-200 py-16 text-center text-lg font-semibold text-slate-600'>
                  No hay notas
                </span>
              </div>
            ) : (
              <div className='grid max-h-[600px] grid-cols-1 gap-2 overflow-y-scroll lg:grid-cols-2 xl:grid-cols-3'>
                {data?.data?.notas?.map((nota: any) => (
                  <Nota key={nota.id} nota={nota} showEditNote={handleShowEditNote} />
                ))}
              </div>
            )}
          </div>

          <div className='my-5 grid gap-3 rounded-3xl bg-white'>
            <Table
              className='min-h-[309.88px]'
              cols={tableHeadersPagos}
              idColumn={'pago_id'}
              data={data?.data?.pagos.map((pago: any, index: any) => ({
                ...pago,
                numero: index + 1,
                cantidad: toMoney(pago.cantidad)
              }))}
              href='pacientes/p/pago'
            />
          </div>

          {showModalAddService && (
            //  ===================================
            //  Modal para agregar servicos
            <Modal
              title='Agregar servicio'
              showModal={showModalAddService}
              setShowModal={setShowModalAddService}
              closeCross
            >
              <FormServicios
                url='servicios'
                closeModal={setShowModalAddService}
                initialValues={{
                  cita_id: data?.data?.cita?.id,
                  cliente_id: '',
                  fecha_hora: ''
                }}
              />
            </Modal>
          )}

          {showModalPagarCita && (
            //  ===================================
            //  Modal para agregar pagar cita
            <Modal
              title='Pagar cita'
              showModal={showModalPagarCita}
              setShowModal={setShowModalPagarCita}
              closeCross
            >
              <div className='mb-3 grid grid-cols-2 gap-5'>
                <InfoPaciente title='Importe' info={toMoney(data?.data?.cita?.importe_total)} />
                <InfoPaciente title='Saldo' info={toMoney(data?.data?.cita?.saldo)} />
                <InfoPaciente
                  title='Total'
                  info={toMoney(data?.data?.cita?.importe_total - data?.data?.cita?.saldo)}
                />
              </div>
              <FormPagarCita
                url='pagos'
                closeModal={setShowModalPagarCita}
                initialValues={{
                  cita_id: data?.data?.cita?.id,
                  usuario_id: user?.id,
                  cantidad: 0,
                  total: data?.data?.cita?.importe_total - data?.data?.cita?.saldo,
                  fecha_hora: '',
                  activo: false
                }}
              />
            </Modal>
          )}

          {showModalPagarRecepcion && (
            //  ===================================
            //  Modal para pagar en recepcion
            <Modal
              title='Pagada en recepción'
              showModal={showModalPagarRecepcion}
              setShowModal={setShowModalPagarRecepcion}
              closeCross
            >
              <FormPagarRecepcion
                initialValues={{
                  id: data?.data?.cita?.id,
                  usuario_id: user?.id,
                  pagada_en_recepcion: data?.data?.cita?.pagada_en_recepcion
                }}
                closeModal={setShowModalPagarRecepcion}
              />
            </Modal>
          )}

          {showModalModificar && (
            //  ===================================
            //  Modal para modificar Cita
            <Modal
              title='Modificar Cita'
              showModal={showModalModificar}
              setShowModal={setShowModalModificar}
              closeCross
            >
              <FormCitas
                url='citas'
                isEditForm
                closeModal={setShowModalModificar}
                initialValues={{
                  id: data?.data?.cita?.id,
                  paciente_id: data?.data?.cita?.paciente_id,
                  cliente_id: data?.data?.cita?.cliente_id,
                  medico_remitente_id: data?.data?.cita?.medico_remitente_id,
                  sucursal_id: data?.data?.cita?.sucursal_id,
                  referencia_del_paciente_id: data?.data?.cita?.referencia_del_paciente_id,
                  fecha_hora: parseDate(data?.data?.cita?.fecha, data?.data?.cita?.hora, 0),
                  finalizada: data?.data?.cita?.finalizada
                  //   let fecha = data?.data?.cita?.fecha?.split('/');
                  //   let hora = data?.data?.cita?.hora?.split(':');
                }}
              />
            </Modal>
          )}

          {showModalEliminar && (
            //  ===================================
            //  Modal para eliminar Cita
            <Modal
              title='Eliminar Cita'
              showModal={showModalEliminar}
              setShowModal={setShowModalEliminar}
              closeCross
            >
              <FormEliminarCita
                initialValues={{
                  id: params.id,
                  eliminar: false
                }}
                url='citas/delete'
                closeModal={setShowModalEliminar}
              />
            </Modal>
          )}

          {showModalFactura && (
            //  ===================================
            //  Modal para facturar cita
            <Modal
              title='Facturar Cita'
              showModal={showModalFactura}
              setShowModal={setShowModalFactura}
              closeCross
            >
              <FormFactura
                initialValues={{
                  id: data?.data?.cita?.id,
                  factura: data?.data?.cita?.factura
                }}
                closeModal={setShowModalFactura}
              />
            </Modal>
          )}

          {showModalNote && (
            //  ===================================
            //  Modal para agregar notas
            <Modal
              title='Agregar nota'
              showModal={showModalNote}
              setShowModal={setShowModalNote}
              closeCross
            >
              <FormNota
                initialValues={{
                  usuarios_id: user?.id,
                  cita_id: data?.data?.cita?.id,
                  nota: valueNote
                }}
                isEditForm={editNote}
                closeModal={setShowModalNote}
              />
            </Modal>
          )}
        </>
      )}
    </MainLayout>
  );
}
