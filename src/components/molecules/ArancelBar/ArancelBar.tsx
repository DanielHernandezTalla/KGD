import React, { useEffect, useState } from 'react';
import { ArancelDataActions } from '@/app/arancel/page';
import { Button } from '@/components/atoms';
import "./ArancelBar.css"

interface ArancelBarProps {
  selectedIds: string[] 
  arancelDataActions: ArancelDataActions
}

export default function ArancelBar({ selectedIds, arancelDataActions }: ArancelBarProps) {

  const [ value, setValue ] = useState("");
  const [ lastCopiedValue, setLastCopiedValue ] = useState("");
  const [ noSelectedElements, setNoSelectedElements ] = useState(false);
  
  const disabledStyle = noSelectedElements ? "" : "";
  const valueChanged = value !== lastCopiedValue;

  // Comportamiento cuando cambia los id seleccionados
  useEffect(() => {
    switch (selectedIds.length) {
      case 0:
        setNoSelectedElements(true);
        setValue("");
        break;
      case 1: 
        const precioDeEstudio = arancelDataActions.getPrecio(selectedIds[0]);
        if (precioDeEstudio) {
          setNoSelectedElements(false);
          setLastCopiedValue(precioDeEstudio.precio === null ? "" : precioDeEstudio.precio.toString())
          setValue(precioDeEstudio.precio === null ? "" : precioDeEstudio.precio.toString());
        }
        break;
      default:
        setNoSelectedElements(false);
        setValue("");
        break;
    }
  }, [selectedIds])

  const updateValue = () => {
    if (value === "") 
      arancelDataActions.updatePrecios(selectedIds, null);
    else
      arancelDataActions.updatePrecios(selectedIds, parseFloat(value));
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 pl-4 w-full max-w-xs h-12 rounded-2xl border-2 text-sm border-gray-200 bg-white ${disabledStyle}`}
      onClick={handleClick}
    >
      <input
        className='no-numeric-up-down w-full bg-transparent outline-none'
        type='number'
        value={value}
        placeholder={noSelectedElements ? 'Selecciona un precio' : 'Agrega un valor...'}
        disabled={noSelectedElements}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && valueChanged) updateValue();
        }}
      />
      <div className='flex gap-2'>
        {
          !noSelectedElements && (
            <>
              <Button
                size='small'
                icon='check'
                variant='transparent'
                disabled={!valueChanged}
                tooltip='Agregar nuevo valor'
                onClick={() => updateValue()}
                className={`w-8 h-8 text-[18px] ${(!valueChanged) ? 'hover:bg-transparent' : '' }`}/>
              <Button
                size='small'
                icon='xmark'
                variant='transparent'
                disabled={!value}
                tooltip='Borrar valor'
                onClick={() => {
                  arancelDataActions.updatePrecios(selectedIds, null);
                  setValue('');
                }}
                className={`w-8 h-8 text-[18px] ${(!value) ? 'hover:bg-transparent' : 'hover:bg-red-400 hover:text-white' }`}/>
            </>
          )
        }
      </div>
    </div>
  );
}
