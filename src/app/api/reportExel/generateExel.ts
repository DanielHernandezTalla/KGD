import { exportData } from '@/utils/exportDataExel';
import * as XLSX from 'xlsx';

export const generateExel = async (url: string, params: any, name: string) => {
  try {
    const token = localStorage.getItem('token');

    const download = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
      }
    });

    const data = await download.json();
    const nameFile = `${name} ${new Date().toLocaleDateString('es-ES')}`;

    const workbook = exportData(data.listado, name.toLowerCase());
    XLSX.writeFile(workbook, nameFile + '.xlsx');
  } catch (e) {
    console.log(e);
  }
};