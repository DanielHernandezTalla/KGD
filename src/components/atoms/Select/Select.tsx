import React, { ChangeEvent } from 'react'

interface SelectProps {
    label?: string,
    className?: string,
    setValue?: (value: any) => void,
    disabled?: boolean,
    options: { value: any, label: string }[]
}

export default function Select({ label, options, setValue, disabled = false, className }: SelectProps) {

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (setValue) setValue(selectedValue ? selectedValue : -1);
  }

  return (
    <div className={`flex flex-col ${className}`}>
        <label htmlFor="select" className='mb-2 text-sm font-bold'>{label}</label>
        {
            options ? 
                <select 
                    name="select"
                    id=""
                    disabled={disabled}
                    onChange={(e) => onChange(e)}
                    className='w-full py-2 px-4 border-2 border-gray-100 rounded-lg focus:outline-none'>
                    <option value={""} >Selecciona una opción</option>
                    {
                        options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
            :
                <input readOnly placeholder='No hay opciones' className='w-full py-2 px-4 border-2 border-gray-100 rounded-lg focus:outline-none'></input>
                
            
        } 
    </div>
  )
}
