import React, { FC, useState } from 'react';

interface Props {
  service: { idServicio: number; servicio: string; precio?: number | string; activo?: boolean };
  arrayServices: Array<{ id: number; precio: number | string; activo?: boolean }>;
  setArrayServices: (
    value: Array<{ id: number; precio: number | string; activo?: boolean }>
  ) => void;
  added?: boolean;
  edit?: boolean;
}

export const CheckBoxInput: FC<Props> = ({
  service,
  arrayServices,
  setArrayServices,
  added = false,
  edit = false
}) => {
  const [editForm, setedit] = useState(edit);
  const [formCheckInput, setformCheckInput] = useState({
    activo: service.activo || false,
    id: service.idServicio,
    precio: service.precio || ''
  });

  const onBlur = () => {
    setedit(true);
    if (added) {
      return;
    }
    if (formCheckInput.activo) {
      if (arrayServices?.find((ser) => ser.id === service.idServicio)) {
        const value = arrayServices?.find((ser) => ser.id === service.idServicio);
        const newValue = arrayServices?.filter((service) => service.id !== value?.id);

        newValue?.push({
          id: formCheckInput.id,
          precio: formCheckInput.precio,
          activo: formCheckInput.activo
        });

        setArrayServices(newValue);
      } else {
        arrayServices?.push({
          id: formCheckInput.id,
          precio: formCheckInput.precio,
          activo: formCheckInput.activo
        });
      }
    } else {
      if (edit) {
        if (arrayServices?.find((ser) => ser.id === service.idServicio)) {
          const value = arrayServices?.find((ser) => ser.id === service.idServicio);
          const newValue = arrayServices?.filter((service) => service.id !== value?.id);
          setArrayServices([...newValue, formCheckInput]);
        } else {
          setArrayServices([...arrayServices, formCheckInput]);
        }
      } else {
        setArrayServices(arrayServices?.filter((service) => service.id !== formCheckInput.id));
      }
    }
  };

  return (
    <div className='container-checkInput' onBlur={onBlur} onClick={() => setedit(false)}>
      <label
        htmlFor={`${service.idServicio}`}
        className='mb-2 block text-sm font-bold text-gray-400'
      >
        {service.servicio}
      </label>
      <div className='checkbox-input'>
        {!added ? (
          <input
            type='checkbox'
            id={`${service.idServicio}`}
            name='activo'
            className="customCheck 'focus:border-blue-300' my-1
                mr-2 focus:outline-none disabled:opacity-50"
            checked={formCheckInput.activo}
            onChange={(value) =>
              setformCheckInput((rest) => ({
                ...rest,
                activo: value.target.checked
              }))
            }
          />
        ) : (
          <div
            className={`flex flex-row items-center ${
              service.activo ? 'bg-green-100' : 'bg-slate-300'
            }  rounded-lg p-2`}
          >
            <b className='mr-1 w-max font-sans font-medium text-slate-600 outline-2'>Precio:</b>
            <span className='w-max font-sans font-medium text-slate-600 outline-2'>
              {' '}
              $ {service.precio}
            </span>
          </div>
        )}
        {!added && formCheckInput.activo && (
          <input
            type='number'
            name='precio'
            placeholder='Precio'
            // className={editForm ? 'disabled:opacity-75' : `border-b-2`}
            value={formCheckInput.precio}
            // disabled={editForm}
            onChange={(value) =>
              setformCheckInput((rest) => ({
                ...rest,
                precio: Number(value.target.value)
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
