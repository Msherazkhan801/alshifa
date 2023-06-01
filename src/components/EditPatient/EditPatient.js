    import React, { useEffect } from 'react';
    import { useParams } from 'react-router-dom';
    import Box from '@mui/material/Box';
    import Button from '@mui/material/Button';
    import Typography from '@mui/material/Typography';
    import Modal from '@mui/material/Modal';
    import AddCircleIcon from '@mui/icons-material/AddCircle';
    import { TextField } from '@mui/material';
    import { toast } from 'react-toastify';
import { sendGetRequest, sendUpdateDataRequest } from '../../utils/api';
    
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
    const EditPatient = () => {
        const { id } = useParams();
        const [data, setData] = React.useState({
          pname: '',
          codeno: '',
          date: '',
          address: '',
          medicine: [],
        });
      
        useEffect(() => {
          if (id) {
            // If id exists, fetch the patient data and populate the form
            sendGetRequest(`/patients/${id}`)
              .then((response) => {
                const { pname, codeno, date, address, medicine } = response.data;
                setData({ pname, codeno, date, address, medicine });
              })
              .catch((error) => {
                toast.error('Failed to fetch patient data');
                console.error(error);
              });
          }
        }, [id]);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setData({
            ...data,
            [name]: value,
          });
        };
      
        const validation = () => {
          return (
            data.pname?.length > 0 &&
            data.codeno?.length > 0 &&
            data.address?.length > 0
          );
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          if (validation()) {
            if (id) {
              // If id exists, it means we are updating an existing patient
              sendUpdateDataRequest(`/patients/${id}`, data)
                .then(() => {
                  toast.success('Patient updated successfully');
                  window.location.reload();
                })
                .catch((error) => {
                  toast.error('Failed to update patient');
                  console.error(error);
                });
            } else {
              toast.error('Please fill in all fields');
            }
          }
        };
      
  return (
    <div>
      
      <Box
        sx={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
            Enter Patient Detail
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField placeholder='Name' onChange={handleChange} name='pname' value={data.pname} type='text' sx={{ width: "40%", marginInline: "20px", paddingTop: "20px", }} required />
            <TextField placeholder='Code No' onChange={handleChange} name='codeno' value={data.codeno} type='number' sx={{ width: "40%", marginInline: "20px", paddingTop: "20px" }} required />
            <TextField placeholder='Date' onChange={handleChange} name='date' value={data.date} type='date' sx={{ width: "40%", marginInline: "20px", paddingTop: "20px" }} required />
            <TextField placeholder='Address' onChange={handleChange} name='adress' value={data.adress} type='text' sx={{ width: "40%", marginInline: "20px", paddingTop: "20px" }} required />
            <hr style={{ marginTop: "20px", width: "85%", marginInline: "20px" }} />
            <Box sx={{ width: "85%", marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button variant="contained" sx={{ width: "30%" }} onClick={handleSubmit}>ADD</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>

  )
}

export default EditPatient