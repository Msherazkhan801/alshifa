import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {sendSingleGetRequest} from "../utils/api"
import { useParams } from 'react-router-dom';
import BasicTable from "../components/MadicineTable"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from "react-router-dom"
export default function SinglePatientDetail() {
  const [data,setData]=useState()
  const {id}=useParams()
  const loadData = async () => {
    try {
      const { data } = await sendSingleGetRequest(`/patients`,`/${id}`);
      setData(data)
    } catch(error){
      alert(error.message);
    } finally {
    }
  };
React.useEffect(()=>{
    loadData()
},[])



  return (
    <Box sx={{ maxWidth: 600 ,paddingInline:"29%",backgroundColor:"#2aa0b9",height:"100vh", overflow:"scroll"}}>
      <Typography variant='h2' fontSize={36} mb={'20px'}  sx={{paddingTop:"20px",color:"white"}}> <u>Patient Detail</u></Typography>
      <Card variant="outlined">
      <React.Fragment>
    <CardContent>
     <Link to='/detail'> <span style={{float:"left"}}>
      <ArrowBackIcon/>
      </span>
      </Link>
      <Box display={'flex'} justifyContent={'center'} gap={'20px'} >
      <Typography variant="h5" component="div">
        Patient Name: 
      </Typography>
      <Typography variant="h5" component="div">
        {data?.pname}
      </Typography>
      </Box>
      <Box display={'flex'} justifyContent={'center'} gap={'20px'} >
      <Typography sx={{ mb: 1.5 ,ml:3}} color="text.secondary">
        Code No: 
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {data?.codeno}
      </Typography>
      </Box>
      <Box display={'flex'} justifyContent={'center'} gap={'20px'} >
      <Typography textAlign={'center'} sx={{ ml:'112px'}}>
        Date:
      </Typography>
      <Typography variant="body2" textAlign={'center'}>
       {data?.date}
      </Typography>
      </Box>
      <Typography variant="body2" textAlign={'center'}>
        <span style={{fontSize:"26px",fontFamily:"cursive "}}>Medicine </span>
          <BasicTable item={data?.madicine}/>
      </Typography>
    </CardContent>

  </React.Fragment>

      </Card>
    </Box>
  );
}