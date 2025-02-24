import useSWR, { SWRConfiguration } from 'swr';
import { useToast } from '@/hooks/toast';

interface DataResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: any;
}

export function useRequestImages<T>(
  route: string,
  params?: any,
  config: SWRConfiguration = {}
): DataResponse<T> {
  const { toast } = useToast();
  const searchParams = new URLSearchParams({
    ...params
  });

  const token = localStorage.getItem('token');
  let arrParams = params ? Object.entries(params) : [];
  let stringParams = '';
  arrParams.forEach((item: any, index: number) => {
    stringParams += `${item[0]}=${item[1]}${index + 1 < arrParams.length ? '&' : ''}`;
  });

  const { data: payload, error } = useSWR<T>(['/api', route, searchParams.toString()], {
    fetcher: async () => {
      try {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}?${stringParams}`, {
          method: 'GET',
          headers: {
            route: route,
            params: searchParams.toString(),
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.blob())  // Obtener la imagen como Blob
          .then(blob => {
            const url = URL.createObjectURL(blob); // Crear una URL temporal para el Blob
            const img = document.createElement('img');
            img.src = url;  // Establecer la fuente de la imagen

            document.getElementById('imagen-container')?.appendChild(img); // Agregar la imagen al contenedor

            return url;

            // const img = document.createElement('img');
            // img.src = url;  // Establecer la fuente de la imagen
            // document.getElementById('imagen-container').appendChild(img); // Agregar la imagen al contenedor
          })
          .catch(error => {
            console.error('Error al cargar la imagen:', error);
          });
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}?${stringParams}`, {
        //   method: 'GET',
        //   headers: {
        //     route: route,
        //     params: searchParams.toString(),
        //     Authorization: `Bearer ${token}`
        //   }
        // });
        // const data = await res.blob();

        // const url = URL.createObjectURL(data); // Crear una URL temporal para el Blob

        // if (!data.ok && data.status != 403) {
        //   let error = data?.errors?.id?.msg || 'Error al realizar la operación';
        //   toast(error, 'Error', 'error');
        // }

        // return url;
      } catch (error) {
        return error;
      }
    },
    ...config
  });

  const data = payload || null;
  return {
    data,
    isLoading: !data && !error,
    isError: error
  };
}
