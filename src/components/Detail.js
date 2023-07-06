import React, { useState } from 'react'
import CustomizedTables from './table'
import { Box, Button, Typography } from '@mui/material'
import BasicModal from "./Modal"
import { sendDeleteRequest, sendGetRequest } from '../utils/api'
import { toast } from 'react-toastify'
import Excel from './Excel/Excel'
import SearchBox from './SearchBox/SearchBox'
import OutlinedCard from './card/Card'
const Detail = ({variant}) => {
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)
  const [dataLimit, setDataLimit] = useState(3)
  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await sendGetRequest('/patients');
      setRows(data)
      setLoading(false);
    } catch (error) {
      alert(error.message);
      toast(error.message)
    } finally {
      setLoading(false);
    }
  };
  const handleDelet = async (id) => {
    try {
      await sendDeleteRequest('/patients', `/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      toast('Data deleted successfully ')


    } catch (error) {
      alert(error.message);
    } finally {
      // window.location.reload()

    }
  }
  React.useEffect(() => {
    loadData()

  }, [])
  const filtered = rows.filter((item) =>
    item.pname && item.pname.toLowerCase().startsWith(search.toLowerCase())
  );
  console.log(filtered);
  return (
    <Box  bgcolor={'#e9e9e9'} display='flex' justifyContent={'center'}>
      <Box mt={variant ? '50px':'0px'}>
    {   <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center",  }}>
        <Box sx={{border:'2px solid #fff',borderRadius:'50px',marginTop:'-10px'}}>
        <Excel data={rows} />
        </Box>
          <Typography variant='h1' textAlign={'center'} fontSize={50} mb={'10px'}> Patients Details</Typography><br/>
          <BasicModal rows={rows} />
          <SearchBox search={search} setSearch={setSearch} />
        </Box>}
        <OutlinedCard 
          loading={loading}
          handleDelet={(id) => handleDelet(id)}
          rows={filtered.slice(0,dataLimit)}
        />
        {/* <CustomizedTables
          loading={loading}
          handleDelet={(id) => handleDelet(id)}
          rows={filtered}
        /> */}
        {rows.length < dataLimit  ? 
      <Button onClick={()=>setDataLimit(dataLimit-3)}>{'Show Less'}</Button>:
      <Button onClick={()=>setDataLimit(dataLimit+3)}>{'Show More'}</Button>}
      </Box>
    </Box>
  )
}

export default Detail