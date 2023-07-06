import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import {sendGetRequest,sendDeleteRequest } from "../utils/api"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularIndeterminate from "../components/spinner"
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables({loading,handleDelet,rows}) {
  return (
    <>
    {console.log("rows ",rows)}
    {loading ? 
      (<Box textAlign={'center'}
      sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
      >
        <CircularIndeterminate />
        </Box>):(
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
           {['ID','Name','codeNo','Date','Action'].map((heading,i)=>{
            return(
                <StyledTableCell key={i}>{heading}</StyledTableCell>
            )
           })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell >{row.pname}</StyledTableCell>
              <StyledTableCell >{row.codeno}</StyledTableCell>
              <StyledTableCell >{row.date}</StyledTableCell>
              <StyledTableCell >
                <Link to={`/patient-detail/${row.id}`} sx={{textDecoration:"none"}}><RemoveRedEyeIcon /></Link>
                <Link to={`/patient-edit/${row.id}`} sx={{textDecoration:"none"}}>   <EditIcon/></Link>
                <DeleteForeverIcon onClick={()=>handleDelet(row.id)}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )}
    </>
  );
}