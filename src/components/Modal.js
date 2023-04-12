import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';
import {sendCreateDataRequest} from '../utils/api'
const style = {
  position: 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [data ,setData]=React.useState({
    pname:'',
    codeno:'',
    date:new Date(),
    adress:'',
    madicine:""
  })
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("medicineName")) {
      const index = Number(name.slice(-1)) - 1;
      const newMedicine = [...data.madicine];
      newMedicine[index] = {
        ...newMedicine[index],
        [name.slice(0, -1)]: value,
      };
    
      setData({
        ...data,
        madicine: newMedicine,
      });
    }
    else if (name.startsWith("use")) {
        const index = Number(name.slice(1));
        const newMedicine = [...data.madicine];
        newMedicine[index] = {
          ...newMedicine[index],
          [name.slice(0, 1)]: value,
        }
          setData({
        ...data,
        madicine: newMedicine,
      });
    }
    else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };
const handleSubmit =(e)=>{
    e.preventDefault();
    sendCreateDataRequest('/patients',data)
    window.location.reload()
    handleClose()
}

console.log(data);

  return (
    <div>
      <Button onClick={handleOpen} 
      sx={{background:"none" ,
        "& :hover":{
         background:"none"
      }}}>
      <AddCircleIcon  sx={{
        fontSize:"40px", 
    
    }}/>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow:"scroll"}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
            Enter Patient Detail
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2  }}>
            <TextField placeholder='Name'  onChange={handleChange} name='pname' value={data.pname} type='text' sx={{width:"40%",marginInline:"20px", paddingTop:"20px",}} required/>
            <TextField placeholder='Code No' onChange={handleChange} name='codeno' value={data.codeno} type='number' sx={{width:"40%",marginInline:"20px",paddingTop:"20px"}} required/>
            <TextField placeholder='Date' onChange={handleChange} name='date' value={data.date} type='date' sx={{width:"40%",marginInline:"20px",paddingTop:"20px"}} required/>
            <TextField placeholder='Address' onChange={handleChange} name='adress' value={data.adress} type='text' sx={{width:"40%",marginInline:"20px",paddingTop:"20px"}} required/>
            <hr style={{marginTop:"20px",width:"85%",marginInline:"20px"}}/>
            <Typography variant='h5' fontSize={18} sx={{marginTop:"20px",marginInline:"20px"}}><u>Medicine Details</u></Typography>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName1' value={data.madicine.medicineName7} type='text' sx={{width:"90%",marginInline:"20px",paddingTop:"20px"}}/>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName2' value={data.madicine.medicineName1} type='text' sx={{width:"90%",marginInline:"20px",paddingTop:"20px"}}/>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName3' value={data.madicine.medicineName2} type='text' sx={{width:"90%",marginInline:"20px",paddingTop:"20px"}}/>
            <TextField placeholder='Madicine Name' onChange={handleChange} name='medicineName4' value={data.madicine.medicineName3} type='text' sx={{width:"90%",marginInline:"20px",paddingTop:"20px"}}/>
            <TextField placeholder='Madicine Name' onChange={handleChange} name='medicineName5' value={data.madicine.medicineName4} type='text' sx={{width:"90%",marginInline:"20px",paddingTop:"20px"}}/>
            <TextField placeholder='Madicine Name' onChange={handleChange} name='medicineName6' value={data.madicine.medicineName5} type='text' sx={{width:"90%",marginInline:"20px",paddingTop:"20px"}}/>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName7' value={data.madicine.medicineName6} type='text' sx={{width:"90%",marginInline:"20px",paddingTop:"20px"}}/>
             <br/>
            <Box sx={{width:"85%",marginTop:"20px",display:"flex",justifyContent:"center",alignItems:"center"}}>
             <Button variant="contained" sx={{width:"30%"}} onClick={handleSubmit}>ADD</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}