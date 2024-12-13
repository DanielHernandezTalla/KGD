import { handlePost } from "./handlePost";

export const handrePermisos = (rutasToCheck: string[], setChecked: any) => {
    let values = rutasToCheck.map((item) => ({ ROULE_NAME: item }));

    const request = {
        url: 'permisopagina',
        values: values,
        isCifrado: false,
        onSuccess: (data: any) => {
            let listadoArray: { [key: string]: boolean } = {};

            data.listado.forEach((item: { roulE_NAME: string; asignado: boolean }) => {
                listadoArray[item.roulE_NAME] = item.asignado;
            });

            setChecked(listadoArray);
        },
        onError: () => {
            setChecked([]);
            console.log('error');
        }
    };

    handlePost(request);
};
