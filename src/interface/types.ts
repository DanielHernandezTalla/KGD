import { ICONS } from '@/components/atoms/Icon/';

export type ICON = keyof typeof ICONS;

export type FORMINPUT = {
  name: string;
  label: string;
  type:
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
};

// name is the name of the obj property
// label is the label of the header
export type TABLECOLUMN = {
  name: string;
  label?: string;
  isId?: boolean;
  component?: any;
  isLink?: boolean;
  isRight?: boolean;
};

export type TABLECOLUMNTOTAL = { name: string; label: string; toMoney?: boolean };

export interface IForm {
  initialValues: any;
  url: string;
  isEditForm?: boolean;
  permisoToEdit?: boolean;
}
