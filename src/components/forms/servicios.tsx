import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { FORMINPUT } from '@/interface/types';
import { Form } from '../atoms';
import { handlePost } from '@/utils/handlePost';
import { useRequest } from '@/hooks/useRequest';
import { IDataResponse } from '@/interface/request';
import { getData, getFilterEstudios } from '@/utils/dataToSelectOptions';
import { toMoney } from '@/utils/toMoney';
import { useToast } from '@/hooks/toast';

export const FormServicios = ({
  initialValues,
  url,
  isEditForm,
  closeModal
}: {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  closeModal?: (value: boolean) => any;
}) => {
  const { data }: IDataResponse<any> = useRequest(`form/servicios`);
  const { toast } = useToast();

  const [
    { cliente, servicio, estudio_id, medico_id, tecnico_id, requiere_medico, requiere_tecnico },
    setDataFilter
  ] = useState({
    cliente: {
      id: initialValues?.cliente_id || null,
      grupo_de_clientes_id: initialValues?.grupo_de_clientes_id || null
    },
    servicio: {
      precio: initialValues?.precio || 0,
      es_porcentaje: initialValues?.porcentaje || 0,
      descuento: initialValues?.descuento || 0,
      existDescuento: 0,
      descuentoInicial: 0,
      productividad: initialValues?.descuento || 0
    },
    fecha: { value: initialValues?.fecha || 0 },
    estudio_id: initialValues?.estudio_id || 0,
    medico_id: initialValues?.medico_id || null,
    tecnico_id: initialValues?.tecnico_id || null,
    requiere_medico: initialValues?.requiere_medico || false,
    requiere_tecnico: initialValues?.requiere_tecnico || false
  });

  const formInputs: FORMINPUT[] = [
    {
      name: 'cliente_id',
      label: 'Cliente',
      type: 'select',
      options: getData(data?.data?.clientes)
    },
    {
      name: 'implementaciones_de_estudio_id',
      label: 'Estudio',
      type: 'select',
      options: getFilterEstudios(data?.data?.estudios, cliente)
    },
    {
      name: 'interprete_id',
      label: 'Interprete',
      type: 'select',
      options: getData(data?.data?.empleados)
    },
    {
      name: 'codigos_descuento_id',
      label: 'Descuento',
      type: 'select',
      options: getData(data?.data?.codigo_descuentos)
    },
    {
      name: 'fecha_hora',
      label: 'Fecha y hora',
      type: 'datetime-local',
      placeholder: 'Selecciona la fecha y hora...'
    }
  ];

  if (requiere_medico) {
    formInputs.push({
      name: 'medico_id',
      label: 'Médico',
      type: 'select',
      options: getData(data?.data?.empleados)
    });
  }

  if (requiere_tecnico) {
    formInputs.push({
      name: 'tecnico_id',
      label: 'Técnico',
      type: 'select',
      options: getData(data?.data?.empleados)
    });
  }

  if (servicio.existDescuento != 0 && servicio.descuentoInicial == 0) {
    formInputs.push({
      name: 'cantidad_descuento',
      label: 'Cantidad descuento',
      type: 'number',
      placeholder: 'Escribe la cantidad a descontar'
    });
  }

  if (servicio.existDescuento != 0) {
    formInputs.push({
      name: 'nota',
      label: 'Nota',
      type: 'text',
      placeholder: 'Escribre el motivo de descuento'
    });
  }

  const validationSchema = Yup.object().shape({
    cliente_id: Yup.number().required('Este campo es requerido'),
    implementaciones_de_estudio_id: Yup.number().required('Este campo es requerido'),
    // medico_id: Yup.number().required('Este campo es requerido'),
    // tecnico_id: Yup.number().required('Este campo es requerido'),
    interprete_id: Yup.number().required('Este campo es requerido'),
    // descuento_id: Yup.number().required('Este campo es requerido'),
    nota: Yup.string().min(3, 'Ingresa un mensaje'),
    fecha_hora: Yup.date().required('Este campo es requerido'),
    cantidad_descuento: Yup.number().min(1, 'No puedes ingresar numeros negativos')
  });

  const onChange = (props: any) => {
    if (props?.target.name == 'implementaciones_de_estudio_id') {
      setDataFilter((rest) => ({
        ...rest,
        servicio: {
          ...servicio,
          precio:
            data?.data?.estudios?.find(
              (item: any) => item.implementacion_de_estudios_id == props?.target.value
            )?.precio || 0,
          productividad:
            data?.data?.estudios?.find(
              (item: any) => item.implementacion_de_estudios_id == props?.target.value
            )?.productividad || 0
        },
        medico_id: null,
        tecnico_id: null,
        requiere_medico:
          data?.data?.estudios?.find(
            (item: any) => item.implementacion_de_estudios_id == props?.target.value
          )?.requiere_medico || false,
        requiere_tecnico:
          data?.data?.estudios?.find(
            (item: any) => item.implementacion_de_estudios_id == props?.target.value
          )?.requiere_tecnico || false
      }));
    }

    if (props?.target.name == 'cliente_id') {
      setDataFilter((rest) => ({
        ...rest,
        cliente: {
          ...data?.data?.clientes.find((value: any) => value.id == Number(props?.target.value))
        },
        servicio: {
          ...servicio,
          precio: 0,
          productividad: 0
        },
        medico_id: null,
        tecnico_id: null,
        requiere_medico: false,
        requiere_tecnico: false
      }));
    }

    if (props?.target.name == 'codigos_descuento_id') {
      setDataFilter((rest) => ({
        ...rest,
        servicio: {
          ...servicio,
          descuento:
            data?.data?.codigo_descuentos?.find((item: any) => item.id == props?.target.value)
              ?.cantidad || 0,
          es_porcentaje:
            data?.data?.codigo_descuentos?.find((item: any) => item.id == props?.target.value)
              ?.es_porcentaje || 0,
          existDescuento: props?.target.value,
          descuentoInicial:
            data?.data?.codigo_descuentos?.find((item: any) => item.id == props?.target.value)
              ?.cantidad || 0
        }
      }));
    }

    if (props?.target.name == 'cantidad_descuento') {
      setDataFilter((rest) => ({
        ...rest,
        servicio: {
          ...servicio,
          descuento: props?.target.value,
          es_porcentaje: 0,
          existDescuento: 1
        }
      }));
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onChange={onChange}
      formInputs={formInputs}
      validationSchema={validationSchema}
      cancelButton={true}
      submitButton={true}
      onSubmit={(values) => {
        values = {
          ...values,
          codigos_descuento_id: !values.codigos_descuento_id ? null : values.codigos_descuento_id
        };

        console.log(values);

        handlePost({
          url: isEditForm ? url + '/edit' : url + '/add',
          values,
          method: isEditForm ? 'PUT' : 'POST',
          toast: toast,
          closeModal
        });
      }}
      isEditForm={isEditForm}
    >
      {servicio && (
        <>
          <div className='col-span-2 flex flex-row items-center rounded-lg bg-green-200 p-2'>
            <b className='mr-2 text-gray-500'>Precio del servicio en:</b>

            <b className='text-xl text-gray-600'>{toMoney(servicio.precio)}</b>
          </div>
          <div className='col-span-2 flex flex-row items-center rounded-lg bg-green-200 p-2'>
            <b className='mr-2 text-gray-500'>Descuento:</b>

            <b className='text-xl text-gray-600'>
              {servicio.es_porcentaje ? servicio.descuento + '%' : toMoney(servicio.descuento)}
            </b>
          </div>
          {/* <div className='col-span-2 flex flex-row items-center rounded-lg bg-green-200 p-2'>
            <b className='mr-2 text-gray-500'>Productividad:</b>

            <b className='text-xl text-gray-600'>{toMoney(servicio.productividad)}</b>
          </div> */}
          <div className='col-span-2 flex flex-row items-center rounded-lg bg-green-200 p-2'>
            <b className='mr-2 text-gray-500'>Total:</b>

            <b className='text-xl text-gray-600'>
              {toMoney(
                servicio.es_porcentaje
                  ? servicio.precio - (servicio.precio / 100) * servicio.descuento
                  : servicio.precio - servicio.descuento
              )}
            </b>
          </div>
        </>
      )}
    </Form>
  );
};
