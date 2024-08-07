'use client';

import { ArancelDataActions } from "@/app/arancel/page";
import { PrecioDeEstudio } from "@/interface/models";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface ArancelCellProps {
    precioDeEstudio: PrecioDeEstudio,
    selected: boolean,
    focus: boolean,
    readOnly: boolean,
    arancelDataActions: ArancelDataActions
}

export type ChangeStatusType = 'none' | 'new' | 'modified' | 'deleted';
const expresionRegularPrecio = /^\d{0,8}(\.(\d{0,8})?)?$/; 

export default function ArancelCell({ precioDeEstudio, selected, focus, readOnly, arancelDataActions }: ArancelCellProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    const [ initialValue, setInitialValue ] = useState(undefined as number | null | undefined);

    const [ changeStatusColor, setChangeStatusColor ] = useState('');

    const selectedStyle = selected ? 'border-blue-300' : 'border-gray-200';
    const focusStyle = focus ? 'scale-105 bg-white shadow-xl': '';
    const copiedStyle = precioDeEstudio.copied ? 'bg-blue-200/20 border-dashed' : '';

    const handleClick = (event: React.MouseEvent) => {
        // Logica de selección
        if (event.ctrlKey) {
            if (selected) arancelDataActions.deselect(precioDeEstudio.id);
            else arancelDataActions.select(precioDeEstudio.id);
        }
        else arancelDataActions.selectOnly(precioDeEstudio.id);

        // Dejar de modificar siempre, a menos que se de click en un ArancelCell que si se esta modificando
        if (!precioDeEstudio.modifying) arancelDataActions.stopModifying();

        event.stopPropagation();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === ""){
            arancelDataActions.updatePrecio(precioDeEstudio.id, null);}
        else 
            arancelDataActions.updatePrecio(precioDeEstudio.id, parseFloat(event.target.value));
        return;
    };

    const handleOnDoubleClick = () => {
        arancelDataActions.startModifying(precioDeEstudio.id);
    }
    // Asignando el valor inicial del componente
    useEffect(() => {
        // Tomando el valor enviado por parametro como valor inicial
        if (initialValue === undefined && precioDeEstudio.initialPrecio !== undefined) {
            setInitialValue(precioDeEstudio.initialPrecio);
        }
        // Tomando el valor actual como valor inicial
        else if (initialValue === undefined && precioDeEstudio.precio !== undefined) {
            setInitialValue(precioDeEstudio.precio);
        }
    }, [precioDeEstudio.initialPrecio, precioDeEstudio.precio, initialValue]);

    // Cuando el valor inicial cambie en el componente, y no se haya inicializado el modelo, se debe actualizar el modelo
    // ...

    // Cuando el valor inicial cambie en el modelo se debe actualizar en el componente (despues de que el componente tenga valor inicial)
    useEffect(() => {
        // Evitar que actualice si el componente no tiene valor inicial
        if (initialValue === undefined) return

        if (initialValue !== precioDeEstudio.initialPrecio)  {
            setInitialValue(precioDeEstudio.initialPrecio);
        }
    }, [precioDeEstudio.initialPrecio]);

    // Cuando el value cambie
    useEffect(() => {
        if (initialValue === undefined) {
            return;
        }
        if (initialValue === precioDeEstudio.precio) {
            arancelDataActions.changeStatus(precioDeEstudio.id, 'none');
        }
        else if (initialValue && precioDeEstudio.precio && precioDeEstudio.precio !== initialValue) {
            arancelDataActions.changeStatus(precioDeEstudio.id, 'modified');
        }
        else if (!initialValue && precioDeEstudio.precio) {
            arancelDataActions.changeStatus(precioDeEstudio.id, 'new');
        }
        else if (initialValue && !precioDeEstudio.precio) {
            arancelDataActions.changeStatus(precioDeEstudio.id, 'deleted');
        }
    }, [initialValue, precioDeEstudio.precio]);

    // Cuando el changeStatus cambie
    useEffect(() => {
        switch (precioDeEstudio.changeStatus) {
            case 'new':
                setChangeStatusColor('bg-green-600');
                break;
            case 'modified':
                setChangeStatusColor('bg-yellow-500');
                break;
            case 'deleted':
                setChangeStatusColor('bg-red-600');
                break;
            default:
                setChangeStatusColor('');
                break;
        }
    }, [precioDeEstudio.changeStatus]);

    // Dar focus al input cuando se le de focus al componente
    useEffect(() => {
        if (focus && inputRef && inputRef.current) inputRef.current.focus();
    }, [focus])

    return (
        <div 
            className={`arancel-cell-element p-2 w-32 text-center rounded-3xl border-2 relative mx-auto ${selectedStyle} ${focusStyle} ${copiedStyle}`}
            onClick={handleClick}
            onDoubleClick={handleOnDoubleClick}
            >
            {
                readOnly ?
                <p
                    className="arancel-cell-element w-full text-center outline-none cursor-default"
                    onDoubleClick={handleOnDoubleClick}>
                    {formatPrecio(precioDeEstudio.precio)}
                </p>
                :
                <input
                    ref={inputRef}
                    type="number"
                    value={precioDeEstudio.precio === null ? "" : precioDeEstudio.precio }
                    className="arancel-cell-element w-full text-center outline-none bg-transparent"
                    onChange={handleChange}
                    onKeyDown={(event) => { if (event.key === "Enter") arancelDataActions.stopModifying() }}/> 
                
            }
            <div className={`arancel-cell-element w-2 h-2 rounded absolute right-0 top-0 ${changeStatusColor}` }/>
        </div>
        
    );
};

function formatPrecio(value: number | null) {
    if (value === null) return "-";

    if (isNaN(value)) return "Error";
    
    return "$ " + value.toFixed(2).replace(/\.?0*$/, '');  
}