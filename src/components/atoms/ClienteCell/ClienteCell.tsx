import { ArancelDataActions } from '@/app/arancel/page';
import { Cliente } from '@/interface/models';
import React, { useEffect, useState } from 'react'

export default function ClienteCell({ cliente, onClick, readOnly, arancelDataActions }: {cliente: Cliente, readOnly: boolean, onClick: () => void, arancelDataActions: ArancelDataActions}) {

  const [ initialGrupoDeClientesId, setInitialGrupoDeClientesId ] = useState(undefined as undefined | number | null );
  const [ changeStatusColor, setChangeStatusColor ] = useState('');

  // Asignando el valor inicial del componente
  useEffect(() => {
    // Tomando el valor enviado por parametro como valor inicial
    if (initialGrupoDeClientesId === undefined && cliente.initialGrupoDeClientesId !== undefined) {
      setInitialGrupoDeClientesId(cliente.initialGrupoDeClientesId);
    }
    // Tomando el valor actual como valor inicial
    else if (initialGrupoDeClientesId === undefined && cliente.grupo_de_clientes_id !== undefined) {
      setInitialGrupoDeClientesId(cliente.grupo_de_clientes_id);
    }
  }, [cliente.initialGrupoDeClientesId, cliente.grupo_de_clientes_id, initialGrupoDeClientesId]);

  // Cuando el valor inicial cambie en el componente, y no se haya inicializado el modelo, se debe actualizar el modelo (inicializar cliente)
  useEffect(() => {
    if (cliente.initialGrupoDeClientesId === undefined && initialGrupoDeClientesId !== undefined) {
      cliente.initialGrupoDeClientesId = initialGrupoDeClientesId;
    }
  }, [initialGrupoDeClientesId]);

  // Cuando el valor inicial cambie en el modelo se debe actualizar en el componente (despues de que el componente tenga valor inicial)
  useEffect(() => {
    // Evitar que actualice si el componente no tiene valor inicial
    if (initialGrupoDeClientesId === undefined) return

    if (initialGrupoDeClientesId !== cliente.initialGrupoDeClientesId)  {
      setInitialGrupoDeClientesId(cliente.initialGrupoDeClientesId);
    }
  }, [cliente.initialGrupoDeClientesId])
  
  // Cuando el valor cambie
  useEffect(() => {
      if (initialGrupoDeClientesId === undefined) {
          return;
      }
      if (initialGrupoDeClientesId === cliente.grupo_de_clientes_id) {
          arancelDataActions.changeStatusCliente(cliente.id, 'none');
      }
      else if (initialGrupoDeClientesId && cliente.grupo_de_clientes_id && cliente.grupo_de_clientes_id !== initialGrupoDeClientesId) {
          arancelDataActions.changeStatusCliente(cliente.id, 'modified');
      }
      else if (!initialGrupoDeClientesId && cliente.grupo_de_clientes_id) {
          arancelDataActions.changeStatusCliente(cliente.id, 'new');
      }
      else if (initialGrupoDeClientesId && cliente.grupo_de_clientes_id === null) {
          arancelDataActions.changeStatusCliente(cliente.id, 'deleted');
      }
  }, [initialGrupoDeClientesId, cliente.grupo_de_clientes_id]);

  // Cuando el changeStatus cambie
  useEffect(() => {
    switch (cliente.changeStatus) {
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
  }, [cliente.changeStatus]);

  const handleOnDrag = function(e: React.DragEvent) {
    e.dataTransfer.setData("clienteId_string", cliente.id.toString());
  }

  return (
    <div
      className={`relative flex items-center gap-2 font-normal text-left text-xs py-1 px-2 rounded-lg 
                  border border-gray-200' ${readOnly ? 'bg-white' : 'bg-white hover:bg-gray-100 cursor-pointer'}`}
      onClick={() => { if (onClick && !readOnly) { onClick()} }}
      draggable={!readOnly}
      onDragStart={handleOnDrag}
    >
      <p className='line-clamp-2 w-full text-center'>{cliente.nombre}</p>
      <div className={`w-2 h-2 rounded absolute right-[-2px] top-[-2px] ${changeStatusColor}`}/>
    </div>
  );
}
