import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CircularIndeterminate from '../spinner';
import { Link } from 'react-router-dom';


export default function OutlinedCard({loading,handleDelet,rows}) {
    console.log(rows,"<<");
  return (
    <>
    {loading ?  (<Box textAlign={'center'}
      sx={{display:"flex",justifyContent:"center",alignItems:"center"}}
      >
        <CircularIndeterminate />
        </Box>):
     <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">   
     {rows.map((data)=>{
        return(
            <Box sx={{ minWidth: 275 ,maxWidth:275}} key={data.id}>
            <Card variant="outlined" sx={{backgroundColor:'#6288c4',color:'#fff'}} >
            <React.Fragment>
          <CardContent>
            <Box sx={{borderRadius:'50px',border:'1px solid white',margin:'0 auto',width:'20px'}}>{data.id}</Box>
            <Typography sx={{ fontSize: 14,color:'#fff' }}  gutterBottom>
            Patient info
            </Typography>
            <Typography variant="h5" component="div">
             Name: {data.pname}
            </Typography>
            <Typography sx={{ mb: 1.5 }} >
              Code No: {data.codeno}
            </Typography>
            <Typography variant="body2">
            Date:{data.date}
            </Typography>
          </CardContent>
          <CardActions sx={{marginInline:4}}>
          <Link to={`/patient-detail/${data.id}`} sx={{textDecoration:"none"}}>  <Button size="small"><RemoveRedEyeIcon  style={{ color:'#000' }}/></Button></Link>
          <Link to={`/patient-edit/${data.id}`} sx={{textDecoration:"none"}}>  <Button size="small"><EditIcon style={{ color:'green' }}/></Button></Link>
            <Button size="small" onClick={()=>handleDelet(data.id)}><DeleteForeverIcon style={{ color:'red' }}/></Button>
          </CardActions>
        </React.Fragment>
            </Card>
            </Box>
        )
     })}
  
    </Box>}
    </>
  );
}