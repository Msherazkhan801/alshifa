    import React, { useEffect } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
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
        const navigate=useNavigate()
        const [data, setData] = React.useState({
          pname: '',
          codeno: '',
          date: '',
          address: '',
          madicine:[]
        });
      
        useEffect(() => {
          if (id) {
            sendGetRequest(`/patients/${id}`)
              .then((response) => {
                const { pname, codeno, date, address, madicine } = response.data;
                setData({ pname, codeno, date, address, madicine });
              })
              .catch((error) => {
                toast.error('Failed to fetch patient data');
                console.error(error);
              });
          }
        }, [id]);
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          if (name.startsWith("medicineName")) {
            const index = Number(name.slice(-1)) - 1;
            const newMedicine = [...data.madicine];
            newMedicine[index] = {
              ...newMedicine[index],
              medicineName: value,
            };
        
            setData({
              ...data,
              madicine: newMedicine,
            });
          } else if (name.startsWith("uses")) {
            const index = Number(name.slice(4)) - 1;
            const newMedicine = [...data.madicine];
            newMedicine[index] = {
              ...newMedicine[index],
              uses: Number(value),
            };
        
            setData({
              ...data,
              madicine: newMedicine,
            });
          } else {
            setData({
              ...data,
              [name]: value,
            });
          }
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
          // if (validation()) {
            if (id) {
              console.log('id',id);
              sendUpdateDataRequest(`/patients/${id}`, data)
                .then(() => {
                  toast.success('Patient updated successfully');
                  navigate('/detail')
                  // window.location.reload();
                })
                .catch((error) => {
                  toast.error('Failed to update patient');
                  console.error(error);
                });
            } else {
              toast.error('Please fill in all fields');
            }
          // }
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
            <Typography variant='h5' fontSize={18} sx={{ marginTop: "20px", marginInline: "20px" }}><u>Medicine Details</u></Typography>
            <Box display={'flex'}>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName1' value={data.madicine[0]?.medicineName} type='text' sx={{ width: "80%", marginInline: "20px", paddingTop: "20px" }} />
            <TextField placeholder='Use' onChange={handleChange} name='uses1' value={data.madicine[0]?.uses} type='text' sx={{ width: "10%", marginInline: "20px", paddingTop: "20px" }} />
            </Box>
            <Box display={'flex'}>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName2' value={data.madicine[1]?.medicineName} type='text' sx={{ width: "80%", marginInline: "20px", paddingTop: "20px" }} />
            <TextField placeholder='Use' onChange={handleChange} name='uses2' value={data.madicine[1]?.uses} type='text' sx={{ width: "10%", marginInline: "20px", paddingTop: "20px" }} />
            </Box>
            <Box display={'flex'}>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName3' value={data.madicine[2]?.medicineName} type='text' sx={{ width: "80%", marginInline: "20px", paddingTop: "20px" }} />
            <TextField placeholder='Use' onChange={handleChange} name='uses3' value={data.madicine[2]?.uses} type='text' sx={{ width: "10%", marginInline: "20px", paddingTop: "20px" }} />
            </Box>
            <Box display={'flex'}>
            <TextField placeholder='Madicine Name' onChange={handleChange} name='medicineName4' value={data.madicine[3]?.medicineName} type='text' sx={{ width: "80%", marginInline: "20px", paddingTop: "20px" }} />
            <TextField placeholder='Use' onChange={handleChange} name='uses4' value={data.madicine[3]?.uses} type='text' sx={{ width: "10%", marginInline: "20px", paddingTop: "20px" }} />
            </Box>
            <Box display={'flex'}>
            <TextField placeholder='Madicine Name' onChange={handleChange} name='medicineName5' value={data.madicine[4]?.medicineName} type='text' sx={{ width: "80%", marginInline: "20px", paddingTop: "20px" }} />
            <TextField placeholder='Use' onChange={handleChange} name='uses5' value={data.madicine[4]?.uses} type='text' sx={{ width: "10%", marginInline: "20px", paddingTop: "20px" }} />
            </Box>
            <Box display={'flex'}>
            <TextField placeholder='Madicine Name' onChange={handleChange} name='medicineName6' value={data.madicine[5]?.medicineName} type='text' sx={{ width: "80%", marginInline: "20px", paddingTop: "20px" }} />
            <TextField placeholder='Use' onChange={handleChange} name='uses6' value={data.madicine[5]?.uses} type='text' sx={{ width: "10%", marginInline: "20px", paddingTop: "20px" }} />
            </Box>
            <Box display={'flex'}>
            <TextField placeholder=' Madicine Name' onChange={handleChange} name='medicineName7' value={data.madicine[6]?.medicineName} type='text' sx={{ width: "80%", marginInline: "20px", paddingTop: "20px" }} />
            <TextField placeholder='Use' onChange={handleChange} name='uses7' value={data.madicine[6]?.uses} type='text' sx={{ width: "10%", marginInline: "20px", paddingTop: "20px" }} />
            </Box>
            <br />
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