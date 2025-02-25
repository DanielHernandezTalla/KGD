'use client';
import { Button, LoadingSpinner } from '@/components/atoms';
import { InfoData } from '@/components/atoms/InfoData';
import { Status } from '@/components/atoms/Status';
import { FormContratoEmpleados } from '@/components/forms/const_contratoEmpleados';
import { FormDireccionEmpleados } from '@/components/forms/const_direccionEmpleados';
import { FormEmpleados } from '@/components/forms/const_empleados';
import MainLayout from '@/components/layouts/MainLayout';
import { TitlePage } from '@/components/molecules';
import Modal from '@/components/molecules/Modal';
import LayoutPermiso from '@/components/molecules/Permiso/Permiso';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { handrePermisos } from '@/utils/handlePermisos';
import { useEffect, useState } from 'react';

export default function EmpleadoSingle({ params }: { params: { id: number } }) {
  const rutasToCheck: string[] = ['empleados.lista', 'empleados.save', 'empleados.listaid'];
  const [checked, setChecked] = useState([] as any);
  const [showModalPaciente, setShowModalPaciente] = useState(false);
  const [showModalDireccion, setShowModalDireccion] = useState(false);
  const [showModalContrato, setShowModalContrato] = useState(false);

  const { data, isLoading }: IDataResponse<any> = useRequest(`empleados/${params.id}`, {
    showModalPaciente,
    showModalDireccion,
    showModalContrato
  });

  // Consultar permisos y poner nombre a la pagina
  useEffect(() => {
    document.title = 'Empleado KGD';
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  // console.log(showModalPaciente, showModalDireccion, showModalContrato);

  return (
    // <Layout>

    <MainLayout>
      <LayoutPermiso checked={checked} name='empleados.listaid'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className='flex justify-between'>
              <TitlePage
                title={
                  data?.dato?.nombre +
                  ' ' +
                  data?.dato?.apellidO_PATERNO +
                  ' ' +
                  data?.dato?.apellidO_MATERNO
                }
              />
            </div>

            {/* Paciente */}
            <div>
              <div className='mt-4 flex justify-end space-x-3'>
                <Button
                  size='small'
                  rounded
                  variant='primary'
                  text='Modificar Empleado'
                  icon='pen'
                  onClick={() => setShowModalPaciente(true)}
                />
              </div>

              <div className='mt-4 grid grid-cols-1 gap-2 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid-cols-2 lg:grid-cols-4'>
                <InfoData title='Nombre' info={data?.dato?.nombre || 'No tiene'} />
                <InfoData
                  title='Apellido Materno'
                  info={data?.dato?.apellidO_PATERNO || 'No tiene'}
                />
                <InfoData
                  title='Apellido Materno'
                  info={data?.dato?.apellidO_MATERNO || 'No tiene'}
                />
                <InfoData
                  title='Fecha Nacimiento'
                  info={
                    data?.dato?.fechA_NACIMIENTO
                      ? new Date(data.dato.fechA_NACIMIENTO).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })
                      : 'No tiene'
                  }
                />
                <InfoData title='Sexo' info={data?.dato?.sexo == 'M' ? 'Mujer' : 'Hombre'} />
                <InfoData title='CRUP' info={data?.dato?.curp || 'No tiene'} />
                <InfoData title='RFC' info={data?.dato?.rfc || 'No tiene'} />
                <InfoData
                  title='Afiliacion IMSS'
                  info={data?.dato?.afiliacioN_IMSS || 'No tiene'}
                />
                <InfoData title='Tipo Sangre' info={data?.dato?.tipO_SANGRE || 'No tiene'} />
                <InfoData
                  title='Entidad Nacimiento'
                  info={data?.dato?.nombrE_ENTIDAD_NACIMIENTO || 'No tiene'}
                />
                <InfoData
                  title='País Nacimiento'
                  info={data?.dato?.paiS_NACIMIENTO || 'No tiene'}
                />
                <InfoData title='Nacionalidad' info={data?.dato?.nacionalidad || 'No tiene'} />
                <div className='flex flex-col gap-3'>
                  <b className='text-gray-600'>Activo</b>
                  <Status status={data?.dato?.estatus} text={data?.dato?.estatus ? 'Si' : 'No'} />
                </div>
              </div>
            </div>

            {/* Direccion */}
            <div className='col-span-4 mt-5'>
              <div className='flex justify-between'>
                <h2 className='text-3xl font-medium capitalize'>Dirección</h2>
                <Button
                  size='small'
                  rounded
                  variant='primary'
                  text='Modificar Dirección'
                  icon='plus'
                  onClick={() => setShowModalDireccion(true)}
                />
              </div>

              {data?.dato?.calle ||
              data?.dato?.nO_EXTERIOR ||
              data?.dato?.colonia ||
              data?.dato?.codigO_POSTAL ||
              data?.dato?.nombrE_CIUDAD ||
              data?.dato?.nombrE_ENTIDAD ? (
                <div className='mt-4 mb-6 grid grid-cols-4 gap-1 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid'>
                  <InfoData title='Calle' info={data?.dato?.calle || 'No tiene'} />
                  <InfoData title='No Exterior' info={data?.dato?.nO_EXTERIOR || 'No tiene'} />
                  <InfoData title='Colonia' info={data?.dato?.colonia || 'No tiene'} />
                  <InfoData title='Codigo Postal' info={data?.dato?.codigO_POSTAL || 'No tiene'} />
                  <InfoData title='Ciudad' info={data?.dato?.nombrE_CIUDAD || 'No tiene'} />
                  <InfoData title='Entidad' info={data?.dato?.nombrE_ENTIDAD || 'No tiene'} />
                </div>
              ) : (
                <div className='col-span-4 mt-4 mb-5 rounded-xl bg-slate-200 p-3 text-center'>
                  <div className='py-10 font-semibold text-slate-500'>No tiene dirección</div>
                </div>
              )}
            </div>

            {/* Datos/Contrato */}
            <div className='col-span-4 mt-5'>
              <div className='flex justify-between'>
                <h2 className='text-3xl font-medium capitalize'>Contrato</h2>
                <Button
                  size='small'
                  rounded
                  variant='primary'
                  text='Modificar Contrato'
                  icon='plus'
                  onClick={() => setShowModalContrato(true)}
                />
              </div>

              {data?.dato?.fechA_INGRESO !== '1900-01-01T00:00:00' ? (
                <div className='mt-4 mb-6 grid grid-cols-4 gap-1 rounded-2xl border-2 border-slate-200 bg-white p-5 text-sm md:grid'>
                  <InfoData
                    title='Fecha de Ingreso'
                    info={
                      data?.dato?.fechA_INGRESO
                        ? new Date(data.dato.fechA_INGRESO).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : 'No tiene'
                    }
                  />
                  <InfoData
                    title='Fecha de Antigüedad'
                    info={
                      data?.dato?.fechA_ANTIGUEDAD !== '1900-01-01T00:00:00'
                        ? new Date(data.dato?.fechA_ANTIGUEDAD).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : 'No tiene'
                    }
                  />
                  <InfoData
                    title='Tipo de Pago'
                    info={data?.dato?.nombrE_TIPO_PAGO || 'No tiene'}
                  />
                  <InfoData
                    title='Tipo de Salario'
                    info={data?.dato?.nombrE_TIPO_SALARIO || 'No tiene'}
                  />
                  <InfoData
                    title='Motivo de Baja'
                    info={data?.dato?.nombrE_MOTIVO_BAJA || 'No tiene'}
                  />
                  <InfoData
                    title='Fecha de Finiquito'
                    info={
                      data?.dato?.fechA_FINIQUITO !== '1900-01-01T00:00:00'
                        ? new Date(data.dato?.fechA_FINIQUITO).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                        : 'No tiene'
                    }
                  />
                  <InfoData title='Área' info={data?.dato?.nombrE_AREA || 'No tiene'} />
                  <InfoData title='Correo' info={data?.dato?.correo || 'No tiene'} />
                  <InfoData title='Celular' info={data?.dato?.celular || 'No tiene'} />
                  <InfoData
                    title='Teléfono de Emergencia'
                    info={data?.dato?.telefonO_EMERGENCIA || 'No tiene'}
                  />
                </div>
              ) : (
                <div className='col-span-4 mt-4 mb-5 rounded-xl bg-slate-200 p-3 text-center'>
                  <div className='py-10 font-semibold text-slate-500'>No tiene contrato</div>
                </div>
              )}
            </div>

            {showModalPaciente && (
              //  ===================================
              //  Modal para modificar paciente
              <Modal
                title='Modificar Empleado'
                showModal={showModalPaciente}
                setShowModal={setShowModalPaciente}
                closeCross
              >
                <FormEmpleados
                  initialValues={{
                    iD_EMPLEADO: data?.dato?.iD_EMPLEADO,
                    nombre: data?.dato?.nombre,
                    apellidO_PATERNO: data?.dato?.apellidO_PATERNO,
                    apellidO_MATERNO: data?.dato?.apellidO_MATERNO,
                    fechA_NACIMIENTO: data?.dato?.fechA_NACIMIENTO
                      ? new Date(data.dato.fechA_NACIMIENTO).toISOString().split('T')[0]
                      : '',
                    sexo: data?.dato?.sexo,
                    curp: data?.dato?.curp,
                    rfc: data?.dato?.rfc,
                    afiliacioN_IMSS: data?.dato?.afiliacioN_IMSS,
                    tipO_SANGRE: data?.dato?.tipO_SANGRE,
                    iD_ENTIDAD_NACIMIENTO: data?.dato?.iD_ENTIDAD_NACIMIENTO,
                    paiS_NACIMIENTO: data?.dato?.paiS_NACIMIENTO,
                    nacionalidad: data?.dato?.nacionalidad,
                    estatus: data?.dato?.estatus
                  }}
                  closeModal={setShowModalPaciente}
                  isEditForm
                  url='empleados'
                />
              </Modal>
            )}

            {showModalDireccion && (
              //  ===================================
              //  Modal para agregar servicos
              <Modal
                title='Modificar dirección'
                showModal={showModalDireccion}
                setShowModal={setShowModalDireccion}
                closeCross
              >
                <FormDireccionEmpleados
                  initialValues={{
                    iD_EMPLEADO: data?.dato?.iD_EMPLEADO,
                    calle: data?.dato?.calle,
                    colonia: data?.dato?.colonia,
                    nO_EXTERIOR: data?.dato?.nO_EXTERIOR,
                    codigO_POSTAL: data?.dato?.codigO_POSTAL,
                    iD_ENTIDAD: data?.dato?.iD_ENTIDAD ? data?.dato?.iD_ENTIDAD : '',
                    iD_CIUDAD: data?.dato?.iD_CIUDAD ? data?.dato?.iD_CIUDAD : '',
                    estatus: data?.dato?.estatus
                  }}
                  closeModal={setShowModalDireccion}
                  url='empleados/direccion'
                />
              </Modal>
            )}

            {showModalContrato && (
              //  ===================================
              //  Modal para agregar servicos
              <Modal
                title='Modificar contrato'
                showModal={showModalContrato}
                setShowModal={setShowModalContrato}
                closeCross
              >
                <FormContratoEmpleados
                  initialValues={{
                    iD_EMPLEADO: data?.dato?.iD_EMPLEADO,
                    fechA_INGRESO:
                      data?.dato?.fechA_INGRESO !== '1900-01-01T00:00:00'
                        ? new Date(data.dato.fechA_INGRESO).toISOString().split('T')[0]
                        : '',
                    fechA_ANTIGUEDAD:
                      data?.dato?.fechA_ANTIGUEDAD !== '1900-01-01T00:00:00'
                        ? new Date(data.dato.fechA_ANTIGUEDAD).toISOString().split('T')[0]
                        : '',
                    iD_AREA: data?.dato?.iD_AREA ? data?.dato?.iD_AREA : '',
                    iD_TIPO_PAGO: data?.dato?.iD_TIPO_PAGO ? data?.dato?.iD_TIPO_PAGO : '',
                    iD_TIPO_SALARIO: data?.dato?.iD_TIPO_SALARIO ? data?.dato?.iD_TIPO_SALARIO : '',
                    iD_MOTIVO_BAJA: data?.dato?.iD_MOTIVO_BAJA,
                    fechA_FINIQUITO:
                      data?.dato?.fechA_FINIQUITO !== '1900-01-01T00:00:00'
                        ? new Date(data.dato.fechA_FINIQUITO).toISOString().split('T')[0]
                        : '',
                    correo: data?.dato?.correo,
                    celular: data?.dato?.celular,
                    telefonO_EMERGENCIA: data?.dato?.telefonO_EMERGENCIA
                  }}
                  closeModal={setShowModalContrato}
                  url='empleados/contrato'
                />
              </Modal>
            )}
          </>
        )}
      </LayoutPermiso>
    </MainLayout>
    // </Layout>
  );
}
