'use client';
// context/PermisosContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { handrePermisos } from '@/utils/handlePermisos';

interface PermisosContextType {
  checked: { [key: string]: boolean };
  setChecked: React.Dispatch<React.SetStateAction<any>>;
}

const PermisosContext = createContext<PermisosContextType | undefined>(undefined);

export const PermisosProvider = ({ children }: { children: React.ReactNode }) => {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    // Aquí solo se consulta una vez al montar el componente principal de la app
    const rutasToCheck: string[] = [
      'movimientos.movimientos.index',
      'empresa.empresa.index',
      'personal.personal.index',
      'articulos.articulo.index',
      'contabilidad.contabilidad.index',
      'reportes.reportes.index',
      'auth.auth.index'
    ];
    handrePermisos(rutasToCheck, setChecked);
  }, []);

  return (
    <PermisosContext.Provider value={{ checked, setChecked }}>{children}</PermisosContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const usePermisos = () => {
  const context = useContext(PermisosContext);
  if (!context) {
    throw new Error('usePermisos must be used within a PermisosProvider');
  }
  return context;
};
