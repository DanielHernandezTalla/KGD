export interface IDataResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: any;
}
