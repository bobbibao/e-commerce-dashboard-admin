import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Select, MenuItem, TextField, makeStyles } from '@material-ui/core';
import FieldRow from '../FieldRow';
import axios from "axios";
import Autocomplete from '@material-ui/lab/Autocomplete';
const useStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  box: {},
  root: {
    width: "100%",
    overflow: "scroll",
    backgroundColor: "rgb(30, 35, 41)",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    boxShadow: 'none',
    backgroundColor: "rgb(252, 213, 53)",
    color: "rgb(32, 38, 48)",
    '&:hover': {
      opacity: 0.8
    }
  },
  content: {
    minHeight: 400,
    color: "rgb(234, 236, 239)",
    flexGrow: 1,
    width: "100%",
  },
  stepper: {
    backgroundColor: "rgb(30, 35, 41)",
    color: "rgb(234, 236, 239)"
  },
  stepLabel: {
    '& .MuiStepIcon-root': {
      color: 'rgba(255, 255, 255, 0.5) !important',
    },
    '& .MuiStepIcon-active': {
      color: '#fcd535 !important',
      "& .MuiStepIcon-text": {
        fill: "rgb(32, 38, 48)"
      }
    },
    '& .MuiStepIcon-completed': {
      color: '#fcd535 !important',
    },
    '& .MuiStepLabel-label': {
      color: "rgb(234, 236, 239)"
    }
  },
  addButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: "inherit",
    color: "#fff",
    '&:hover': {
      color: "rgb(32, 38, 48)",
      backgroundColor: "rgb(240, 185, 11) !important"
    }
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: "rgb(244, 67, 54)",
    color: "#fff",
    '&:hover': {
      backgroundColor: "rgb(229, 57, 53)"
    }
  },
  textfield: {
    width: '100%',
    color: 'white',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5f6368',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      color: 'white !important',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgb(252, 213, 53)',
    }
  },
  formControl: {
    color: 'white',
    marginTop: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5f6368',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      color: 'white !important',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgb(252, 213, 53)',
    },
  },
}));
export default function SupplierInfo({ product, setProduct }) {
  const [supplierList, setSupplierList] = useState([]);
  const classes = useStyles();

  const handleChange = (name, value) => {
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };


  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/suppliers');
        console.log('Suppliers:', response.data);
        setSupplierList(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setSupplierList([]);
      }
    }
    fetchSuppliers();
  }, []);
  console.log("supplierList", supplierList);
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>Thông tin nhà cung cấp</Typography>
          <Typography variant="subtitle1">Chọn ID nhà cung cấp sản phẩm</Typography>
        </Box>
      </Grid>
      <Grid container item xs={8}>
        <Grid item xs={12}>
        <Autocomplete
              options={supplierList.map(supplier => supplier.supplierID + ' - ' + supplier.supplierName)}
              getOptionLabel={(option) => option}
              value={product.supplier || ''}
              onChange={(e, newValue) => handleChange("supplier", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ID - Tên nhà cung cấp"
                  variant="outlined"
                  className={classes.textfield}
                  InputProps={{
                    ...params.InputProps,
                    classes: {
                      root: classes.textfield,
                      focused: classes.textfield,
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.textfield,
                      focused: classes.textfield,
                    }
                  }}
                  required
                />
              )}
            />
        </Grid>
        {/* <Grid item xs={12}>
          <FieldRow
            label="Supplier Contact"
            name="supplierContact"
            value={product.supplierContact || ''}
            variant="input"
            onChange={handleChange}
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
}
