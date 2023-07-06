import React, { useState } from 'react'
import CustomizedTables from './table'
import { Box, Typography } from '@mui/material'
import BasicModal from "./Modal"
import { sendDeleteRequest, sendGetRequest } from '../utils/api'
import { toast } from 'react-toastify'
import Excel from './Excel/Excel'
import SearchBox from './SearchBox/SearchBox'
const Detail = ({variant}) => {
  const [rows, setRows] = useState([])
  const [search, setSearch] = useState('')

  const [loading, setLoading] = useState(true)
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
    item.pname && item.pname.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filtered);
  return (
    <Box height={'100vh'} bgcolor={'#e9e9e9'} display='flex' justifyContent={'center'}>
      <Box mt={variant ? '50px':'0px'}>
    {!variant &&    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* <Typography variant='h1' textAlign={'center'} fontSize={50} mb={'10px'}> Alshifa Patients Details</Typography> */}
          <BasicModal rows={rows} />
          <SearchBox search={search} setSearch={setSearch} />
        </Box>}
        <CustomizedTables
          loading={loading}
          handleDelet={(id) => handleDelet(id)}
          rows={filtered}
        />
        <Excel data={rows} />
      </Box>
    </Box>
  )
}

export default Detail