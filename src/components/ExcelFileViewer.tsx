import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelFileViewerProps {
  documentUrl: string;
}

const ExcelFileViewer: React.FC<ExcelFileViewerProps> = ({ documentUrl }) => {
  const [excelData, setExcelData] = useState<any[][] | null>(null);
  const [mergedCells, setMergedCells] = useState<XLSX.Range[] | null>(null);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch(documentUrl);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        setExcelData(jsonData);
        setMergedCells(worksheet['!merges'] || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExcelData();
  }, [documentUrl]);

  const renderTable = () => {
    if (!excelData) return null;

    const tableRows = excelData.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, cellIndex) => {
          const cellKey = XLSX.utils.encode_cell({ r: rowIndex, c: cellIndex });
          const merge = mergedCells?.find(
            (merge) => merge.s.r === rowIndex && merge.s.c === cellIndex
          );

          if (merge) {
            const colspan = merge.e.c - merge.s.c + 1;
            const rowspan = merge.e.r - merge.s.r + 1;
            return (
              <td key={cellKey} colSpan={colspan} rowSpan={rowspan}>
                {cell}
              </td>
            );
          }

          return <td key={cellKey}>{cell}</td>;
        })}
      </tr>
    ));

    return <tbody>{tableRows}</tbody>;
  };

  return <div>{excelData ? <table>{renderTable()}</table> : <p>Loading...</p>}</div>;
};

export default ExcelFileViewer;
