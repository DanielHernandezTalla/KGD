import React from 'react';
import { Form } from '@/components/atoms';
import { FORMINPUT } from '@/interface/types';

export const DairyFilter = ({
  setValues,
  optionalValues
}: {
  initialValues?: any;
  isEditForm?: boolean;
  setValues?: any;
  optionalValues?: {
    name: string;
    label: string;
    data: any[];
  }[];
}) => {
  const formInputs: FORMINPUT[] = [
    {
      name: 'FECHA1',
      label: 'Fecha de Incio',
      type: 'date'
    },
    {
      name: 'FECHA2',
      label: 'Fecha de Final',
      type: 'date'
    }
  ];

  optionalValues?.forEach((element) => {
    formInputs.push({
      name: element.name,
      label: element.label,
      type: 'select',
      options: element.data?.map((item: any) => ({
        value: item.id,
        label: item.nombre
      }))
    });
  });

  const handleSubmit = (values: Record<string, string>) => {
    const filteredValues = Object.keys(values).reduce<Record<string, string>>((obj, key) => {
      if (values[key].trim().length !== 0) {
        obj[key] = values[key];
      }
      return obj;
    }, {});
    setValues(filteredValues);
  };

  return (
    <Form
      initialValues={{}}
      formInputs={formInputs}
      cancelButton={false}
      submitButton={true}
      txtButton='Filtrar'
      sizeBtn='small'
      onSubmit={(values) => handleSubmit(values)}
    />
  );
};
