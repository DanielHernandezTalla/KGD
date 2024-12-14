import useSWR, { SWRConfiguration } from 'swr';
import { useToast } from '@/hooks/toast';

interface DataResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: any;
}

export function useRequest<T>(
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}?${stringParams}`, {
          method: 'GET',
          headers: {
            route: route,
            params: searchParams.toString(),
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();

        if (!data.ok) {
          let error = data?.errors?.id?.msg || 'Error al realizar la operación';
          toast(error, 'Error', 'error');
        }

        return data;
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
