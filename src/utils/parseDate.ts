export const parseDate = (fecha: any, hora: any, restDate: any, now = false) => {
    if (now) {
        const date = new Date(Date.now() - restDate + _getTimeZoneOffsetInMs());
        return date.toISOString().slice(0, 19);
    } else if (getDate(fecha, hora)?.getTime()) {
        const date = new Date(getDate(fecha, hora)?.getTime() - restDate + _getTimeZoneOffsetInMs());
        return date.toISOString().slice(0, 19);
    }
    const date = new Date(Date.now() - restDate + _getTimeZoneOffsetInMs());
    return date.toISOString().slice(0, 19);
};

function getDate(myfecha: any, myhora: any) {
    let fecha = myfecha?.split('/');
    let hora = myhora?.split(':');

    let fechaF = '';

    if (fecha) fechaF = fecha[2] + ',' + (fecha[1] - 1) + ',' + fecha[0];
    if (hora) fechaF += ',' + hora[0].slice(-2) + ',' + hora[1] + ',00';

    if (fechaF) {
        let fechaS = fechaF.split(',');
        if (hora) {
            return new Date(
                parseInt(fechaS[0]),
                parseInt(fechaS[1]),
                parseInt(fechaS[2]),
                parseInt(fechaS[3]),
                parseInt(fechaS[4]),
                parseInt(fechaS[5])
            );
        }
        return new Date(parseInt(fechaS[0]), parseInt(fechaS[1]), parseInt(fechaS[2]));
    }
}

function _getTimeZoneOffsetInMs() {
    return new Date().getTimezoneOffset() * -60 * 1000;
}