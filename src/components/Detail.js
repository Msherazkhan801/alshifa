import React from 'react'
import CustomizedTables from './table'
import { Box, Typography } from '@mui/material'
import BasicModal from "./Modal"
const Detail = () => {
  return (
    <Box padding={5}>
      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Typography variant='h1' textAlign={'center'} fontSize={50} mb={'10px'}> Alshifa Patients Details</Typography>
        <BasicModal/>
      </Box>
      <CustomizedTables />
    </Box>
  )
}

export default Detail