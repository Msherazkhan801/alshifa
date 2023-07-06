import { Button } from '@mui/material';
import React from 'react'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';

const Excel = ({data}) => {
    const downloadExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data); 
      
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
      
        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });
      
        const excelData = new Blob([excelBuffer], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });
      
        saveAs(excelData, 'data.xlsx'); // Change the file name as desired
      };
  return (
    <Button onClick={downloadExcel}><BrowserUpdatedIcon/></Button>
  )
}

export default Excel