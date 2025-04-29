import { ICONS } from '@/components/atoms/Icon/';
import { RowState } from '@/components/atoms/Table/Table';

export type ICON = keyof typeof ICONS;

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'select'
  | 'selectmultiple'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'date'
  | 'datetime-local';

export type FORMINPUT = {
  name: string;
  label: string;
  type: InputType;
  placeholder?: string;
  value?: string | number | undefined | never[];
  setValue?: any;
  options?: {
    value: string;
    label: string;
  }[];
  fullWidth?: boolean;
  disabled?: boolean;
  min?: any;
  hidden?: boolean;
  /**
   * Función que permite formatear libremente el valor del input, sin embargo, el valor enviado al final será el real antes del formateo.
   * Implementado solo para input de tipo 'text'.
   * @param value Valor real almacenado por el input.
   * @returns Retorna el valor despues del formateo.
   */
  formatter?: (value: any) => any;
  /**
   * Propiedades para mostrar un botón que te permita hacer una asignación compleja, por ejemplo lanzar un modal.
   * Implementado solo para input de tipo 'text'.
   */
  complexAssignment?: ComplexAssignment;
};

export interface ComplexAssignment {
  buttonText?: string;
  buttonIcon?: ICON;
  /**
   * Función onClick que además recibe la función setFieldValue que actualiza el valor directamente en Formik.
   * @param setFieldValue 
   * @returns 
   */
  onClick: (setFieldValue: (newValue: any) => void) => void; // 
  /**
   * Obliga a que el input este deshabilitado
   */
  disabledInput?: boolean;
}

// name is the name of the obj property
// label is the label of the header
export type TABLECOLUMN = {
  name: string;
  label?: string;
  isId?: boolean;
  component?: ((value?: any, rowState?: RowState) => void);
  isLink?: boolean;
  isRight?: boolean;
  /**
   * Función que permite formatear libremente el valor que se mostrará en las celdas.
   * @param value Valor real.
   * @returns Retorna el valor despues del formateo.
   */
  formatter?: (value: any) => any;
  filter?: ColumnFilterType;

};

export type TABLECOLUMNTOTAL = { name: string; label: string; toMoney?: boolean };

export type ColumnFilterType = {
  type: InputType;
  showButton?: boolean;
  initialValue?: any;
  showing?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
}
