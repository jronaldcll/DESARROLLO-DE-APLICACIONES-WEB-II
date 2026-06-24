import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { TableElement } from './TableElement';

const getFileName = (name: string) => {
  const timeSpan = new Date().toISOString();
  const sheetName = name || 'ExportResult';
  const fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName,
  };
};
export class TableExportUtil {
  static async exportToExcel(arr: Partial<TableElement>[], name: string) {
    const { sheetName, fileName } = getFileName(name);

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Extract headers from the first object's keys
    if (arr.length > 0) {
      const headers = Object.keys(arr[0]);
      worksheet.addRow(headers);

      // Style the header row
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true };
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4472C4' },
        };
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.alignment = { horizontal: 'center' };
      });

      // Add data rows
      for (const item of arr) {
        worksheet.addRow(Object.values(item));
      }

      // Auto-fit column widths
      worksheet.columns.forEach((column) => {
        let maxLength = 10;
        column.eachCell?.({ includeEmpty: true }, (cell) => {
          const cellLength = cell.value ? cell.value.toString().length : 0;
          if (cellLength > maxLength) {
            maxLength = cellLength;
          }
        });
        column.width = Math.min(maxLength + 2, 30);
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `${fileName}.xlsx`);
  }

  // static exportToPDF(exportData: any[]) {
  //   const doc = new jsPDF();
  //   const dataValue: any = Object.keys(exportData).map(function (
  //     personNamedIndex: any
  //   ) {
  //     return Object.values(exportData[personNamedIndex]);
  //   });
  //   const keys: any = Object.keys(exportData[0]);

  //   autoTable(doc, {
  //     head: [keys],
  //     body: dataValue,
  //   });

  //   const { fileName } = getFileName('pdf');

  //   doc.save(`${fileName}.pdf`);
  // }
}
