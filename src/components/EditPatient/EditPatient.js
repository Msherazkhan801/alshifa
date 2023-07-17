import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { sendGetRequest, sendUpdateDataRequest } from '../../utils/api';

const style = {
  position: 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    pname: '',
    codeno: '',
    date: '',
    address: '',
    madicine: [],
  });

  const loadData = async () => {
    try {
      const response = await sendGetRequest(`/patients/${id}`);
      const { pname, codeno, date, address, madicine } = response.data;
      setData({ pname, codeno, date, address, madicine });
    } catch (error) {
      toast.error('Failed to fetch patient data');
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

 const handleChange = (e) => {
  const { name, value } = e.target;
  const updatedData = { ...data };

  if (name.startsWith("medicineName")) {
    const index = Number(name.slice(-1)) - 1;
    const newMedicine = {
      ...updatedData.madicine[index],
      medicineName: value,
    };

    updatedData.madicine[index] = newMedicine;
  } else if (name.startsWith("uses")) {
    const index = Number(name.slice(4)) - 1;
    const newMedicine = {
      ...updatedData.madicine[index],
      uses: Number(value),
    };

    updatedData.madicine[index] = newMedicine;
  } else {
    updatedData[name] = value;
  }

  setData(updatedData);
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
    if (id && validation()) {
      sendUpdateDataRequest(`/patients/${id}`, data)
        .then(() => {
          toast.success('Patient updated successfully');
          navigate('/detail');
        })
        .catch((error) => {
          toast.error('Failed to update patient');
          console.error(error);
        });
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <Box sx={{ marginTop: '20px' }}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" textAlign="center">
            Enter Patient Detail
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              placeholder="Name "
              onChange={handleChange}
              name="pname"
              value={data.pname}
              type="text"
              sx={{ width: '40%', marginInline: '20px', paddingTop: '20px' ,color:"red"}}
              required
            />
            <TextField
              placeholder="Code No"
              onChange={handleChange}
              name="codeno"
              value={data.codeno}
              type="number"
              sx={{ width: '40%', marginInline: '20px', paddingTop: '20px' }}
              required
            />
            <TextField
              placeholder="Date"
              onChange={handleChange}
              name="date"
              value={data.date}
              type="date"
              sx={{ width: '40%', marginInline: '20px', paddingTop: '20px' }}
              required
            />
            <TextField
              placeholder="Address"
              onChange={handleChange}
              name="address"
              value={data.address}
              type="text"
              sx={{ width: '40%', marginInline: '20px', paddingTop: '20px' }}
              required
            />
            <hr style={{ marginTop: '20px', width: '85%', marginInline: '20px' }} />
            <Typography variant="h5" fontSize={18} sx={{ marginTop: '20px', marginInline: '20px' }}>
              <u>Medicine Details</u>
            </Typography>
            {data.madicine.map((medicine, index) => (
              <Box display="flex" key={index}>
                <TextField
                  placeholder="Medicine Name"
                  onChange={handleChange}
                  name={`medicineName${index + 1}`}
                  value={medicine.medicineName}
                  type="text"
                  sx={{ width: '80%', marginInline: '20px', paddingTop: '20px' }}
                />
                <TextField
                  placeholder="Use"
                  onChange={handleChange}
                  name={`uses${index + 1}`}
                  value={medicine.uses}
                  type="text"
                  sx={{ width: '10%', marginInline: '20px', paddingTop: '20px' }}
                />
              </Box>
            ))}
            <br />
        <Box sx={{ width: "85%", marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button variant="contained" sx={{ width: "30%" }} onClick={handleSubmit}>Update</Button>
        </Box>
      </Box>
    </Box>
  </Box>
</div>

)
}

export default EditPatient