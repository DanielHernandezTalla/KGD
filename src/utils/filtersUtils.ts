export interface Filter {
  name: string;
  value: any;
  label: string;
};

/**
* Convierte una lista de filtros en un objeto de tipo `T`, donde las propiedades corresponden a los nombres de los filtros
* y sus valores respectivos. La conversión asegura que el tipo de datos de los filtros se respete en el objeto resultante.
* 
* @param filters - Una lista de filtros, cada uno con un nombre y valor, que se transformarán en propiedades de un objeto.
* 
* @returns Un objeto de tipo `T` donde las propiedades corresponden a los nombres de los filtros y sus valores son asignados 
* a dichas propiedades, respetando el tipo de dato `T` definido.
*/
export function mapFilters<T extends Record<string, any>>(filters: Filter[]) {
  // Generar el nuevo objeto de filtros a partir de currentFilters
  const mappedFilters = filters.reduce((mapped, filter) => {
    // Si el nombre del filtro es una propiedad del objeto mapped de tipo T entonces agregarla con su respectivo valor.
    if (tienePropiedad(filter.name, mapped)) {
      (mapped as any)[filter.name] = filter.value;  // Se añade la propiedad de manera segura
    }

    return mapped;
  }, {} as T);

  return mappedFilters;
}

// IMPLEMENTAR
function tienePropiedad(key: string, obj: any) {
  return true;
}

export function updateFilters<T extends Record<string, any>>(currentFilterObject: T, priorFilterObject: T, filterNamesToAffect: string[]) {
  // Clonar el estado anterior para evitar la mutación directa
  const updatedFilters: T = { ...priorFilterObject };

  // Actualizar filtros
  for (let filterName of filterNamesToAffect) {
    if (!(filterName in currentFilterObject)) {
      // Eliminar el filtro si no está presente en currentFilterObject
      if (filterName in updatedFilters) {
        delete updatedFilters[filterName];
      }
    } else {
      // Aseguramos que filterName sea una clave de T
      updatedFilters[filterName as keyof T] = currentFilterObject[filterName as keyof T];
    }
  }

  // Verificar si los filtros han cambiado, y solo devolver los actualizados si es necesario
  if (JSON.stringify(priorFilterObject) !== JSON.stringify(updatedFilters)) {
    return updatedFilters;
  }
  return priorFilterObject;
}