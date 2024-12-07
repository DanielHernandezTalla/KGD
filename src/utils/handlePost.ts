import { toMoney } from "./toMoney";
import { ToastIcon, ToastProps } from "@/components/atoms/Toast/Toast";

type HandlePost = {
  method?: 'POST' | 'PUT' | 'DELETE';
  id?: string;
  values: any;
  url: string;
  messageOk?: string;
  messageError?: string;
  callback?: () => void;
  closeModal?: (param: boolean) => void;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  toast?: (param1: string | ToastProps, param2?: string, param3?: ToastIcon, param4?: boolean) => void;
  isCifrado?: boolean;
};
export const handlePost = async ({
  method = 'POST',
  values,
  url,
  messageOk = 'Operación realizada con éxito',
  messageError = 'Error al realizar la operación',
  callback,
  closeModal,
  onSuccess,
  onError,
  toast,
  isCifrado = true
}: HandlePost) => {
  const dataToPost = Object.fromEntries(
    Object.entries(values).filter(([v]) => v !== '' && v !== null)
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(isCifrado ? dataToPost : values)
  });

  const data = await res.json();

  // console.log('+++++++++++++++++++++++++++++');
  // console.log(data);


  const tryToast = function (param1: string | ToastProps, param2?: string, param3?: ToastIcon, param4?: boolean) {
    if (toast) toast(param1, param2, param3, param4);
  }

  if (data.status === '200') {
    if (data.dataTicket) handleTicket(data.dataTicket);
    else {
      if (messageOk) tryToast(messageOk, "Solicitud realizada", "success");
    }
    if (values.isBack) values.isBack();
    if (callback) callback();
    if (closeModal) closeModal(false);
    if (onSuccess) onSuccess(data);
  }

  if (!data.ok) {
    if (onError) onError(data);
    if (data.msg) tryToast(data.msg, "Error", "error");
    else if (messageError && data.errors) {
      // const msg = `${messageError}. \nErrores: ${Object.entries(data.errors).map((v: any) => {
      //   return `\n ${v[1].msg}`;
      // })}`;
      tryToast(data?.errors?.msg || messageError, "Error", "error")
    }
    else if (typeof messageError === 'string') tryToast(messageError, "Error", "error");
    else if (messageError) {
      const msg = `${messageError}. \nErrores: ${Object.entries(data.errors).map(([v]: any) => {
        return ` \n${v.msg}`;
      })}`;
      tryToast(msg, "Error", "error")
    }

  }
};

const handleTicket = async (dataToPost: any) => {

  dataToPost = {
    ...dataToPost,
    totales: {
      subtotal: toMoney(dataToPost.pagos.reduce((acumulador: number, current: any) => acumulador + current.subTotal, 0) +
        dataToPost.pagos.reduce((acumulador: number, current: any) => acumulador + current.descuento, 0)),
      descuento: toMoney(dataToPost.pagos.reduce((acumulador: number, current: any) => acumulador + current.descuento, 0)),
      cantidad: toMoney(dataToPost.pagos.reduce((acumulador: number, current: any) => acumulador + current.cantidad, 0))
    }
  };

  dataToPost.pagos = dataToPost.pagos.map((item: any) => ({
    ...item,
    cantidad: toMoney(item.cantidad),
    precio: toMoney(item.precio),
    subTotal: toMoney(item.subTotal),
    total: toMoney(item.total),
    descuento: toMoney(item.descuento),
  }));

  try {
    const resTicket = await fetch(`http://127.0.0.1:62000/ticket.php`, {
      method: 'POST',
      body: JSON.stringify(dataToPost)
    });

    const data = await resTicket.json();

    if ((data.message = 'impresion correcta.')) alert('Operación realizada con exito.');
    else
      alert('Operacion realizada con exito. Error al imprimir.');
  } catch (e) {
    alert('Operacion realizada con exito. Error al imprimir.');
  }

};
