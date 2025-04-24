import { FORMINPUT, InputType } from '@/interface/types'
import React from 'react'
import { Form } from '..';
import { Filter } from '@/utils/filtersUtils';

interface ColumnFilterProps {
    type: InputType;
    name: string;
    label: string;
    onSubmit: (filter: Filter | null) => void;
    initialValue?: any;
    options?: {
        value: string;
        label: string;
    }[];
};

const FILTER_VALUE_KEY = "filterValue";

export default function ColumnFilter({ type, name, label, onSubmit, initialValue, options }: ColumnFilterProps) {
    let formInput: FORMINPUT | undefined;
    
    switch(type) {
        case 'text':
            formInput = {
                name: FILTER_VALUE_KEY,
                label: label,
                type: 'text',
                fullWidth: true,
            };
            break;
        case 'number':
            formInput = {
                name: FILTER_VALUE_KEY,
                label: label,
                type: 'number',
                fullWidth: true, 
            };
            break;
        case 'checkbox':
            formInput = {
                name: FILTER_VALUE_KEY,
                label: label,
                type: 'checkbox',
                fullWidth: true,
            };
            break;
        case 'select': // Implementar: Forma de cambiar el name del filtro, porque cuando es select se guarda el X_id, pero el nombre la columna en realidad es X_nombre
            formInput = {
                name: FILTER_VALUE_KEY,
                label: label,
                type: 'select',
                fullWidth: true,
                options: options,
            };
            break;
    }

    if (!formInput) {
        return;
    }
    
    const formInputs: FORMINPUT[] = [formInput];

    return (
        <div className='min-w-12'>
            <Form
                initialValues={initialValue}
                formInputs={formInputs}
                cancelButton={false}
                submitButton={true}
                txtButton='Agregar filtro'
                sizeBtn='small'
                onSubmit={(value) => {

                    let filterValue = '' as any;

                    switch(type) {
                        case 'text':
                            filterValue = value[FILTER_VALUE_KEY];
                            break;
                        default:
                            filterValue = value[FILTER_VALUE_KEY];
                    }

                    if (filterValue === undefined) {
                        onSubmit(null);
                        return;
                    }

                    // Construir el filtro
                    const filter = {
                        name: name, // El nombre del filtro se toma del name recibido por parametro
                        value: filterValue,
                        label: label,
                    } as Filter;

                    onSubmit(filter);
                }}
            />
        </div>
    )
}
