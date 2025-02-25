import * as XLSX from 'xlsx';

export const exportData = (data: any, name?: string): XLSX.WorkBook => {
  let workbook = XLSX.utils.book_new();

  const worksheetJSON = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheetJSON, name, true);

  return workbook;
};
