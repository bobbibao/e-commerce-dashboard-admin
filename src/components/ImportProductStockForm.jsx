import React, { useState, useEffect } from "react";
import { Container, Box, makeStyles, Button, Typography, Stepper, Step, StepLabel, Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
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

function getSteps() {
  return ['Select Products', 'Provide Supplier Information', 'Review and Confirm'];
}

export default function ImportProductStockForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [products, setProducts] = useState([{ product: '', quantity: '' }]);
  const [supplier, setSupplier] = useState('');
  const [supplierDetails, setSupplierDetails] = useState(null);
  const steps = getSteps();

  const handleProductChange = (index, event) => {
    const newProducts = [...products];
    newProducts[index][event.target.name] = event.target.value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { product: '', quantity: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const fetchSupplierDetails = async (supplierName) => {
    try {
      const response = await axios.get(`/api/suppliers/${supplierName}`);
      setSupplierDetails(response.data);
    } catch (error) {
      console.error('Error fetching supplier details:', error);
      setSupplierDetails(null);
    }
  };

  const handleSupplierChange = (event, newValue) => {
    setSupplier(newValue);
    if (newValue) {
      fetchSupplierDetails(newValue);
    } else {
      setSupplierDetails(null);
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            {products.map((product, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item xs={6}>
                  <Autocomplete
                    options={["product1", "product2", "product3", "product4"]}
                    getOptionLabel={(option) => option}
                    value={product.product}
                    onChange={(e, newValue) => handleProductChange(index, { target: { name: "product", value: newValue } })}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product"
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    variant="outlined"
                    className={classes.textfield}
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, e)}
                    InputProps={{
                      classes: {
                        root: classes.textfield,
                        focused: classes.textfield,
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton style={{ padding: "5px" }}
                    className={classes.deleteButton}
                    onClick={() => handleRemoveProduct(index)}
                    disabled={products.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              style={{ marginTop: "30px" }}
              variant="contained"
              className={classes.addButton}
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
            >
              Thêm
            </Button>
          </div>
        );
      case 1:
        return (
          <div>
            <Autocomplete
              options={["supplier1", "supplier2", "supplier3", "supplier4"]}
              getOptionLabel={(option) => option}
              value={supplier}
              onChange={handleSupplierChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Supplier"
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
                />
              )}
            />
            {supplierDetails && (
              <Box mt={2} style={{marginTop: 10}}>
                <Typography variant="h6">Supplier Details</Typography>
                <Typography><strong>Name:</strong> {supplierDetails.name}</Typography>
                <Typography><strong>Address:</strong> {supplierDetails.address}</Typography>
                <Typography><strong>Phone:</strong> {supplierDetails.phone}</Typography>
              </Box>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <Typography variant="h6">Products</Typography>
            <ul>
              {products.map((product, index) => (
                <li key={index}>{product.product} - {product.quantity}</li>
              ))}
            </ul>
            <Typography variant="h6">Supplier</Typography>
            <Typography>{supplier}</Typography>
          </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setProducts([{ product: '', quantity: '' }]);
    setSupplier('');
    setSupplierDetails(null);
  };

  const handleQuit = () => {
    navigate(-1);
  };

  const handleFinish = async () => {
    try {
      await axios.post('/api/import', { products, supplier });
      handleReset();
      alert('Products imported successfully!');
    } catch (error) {
      console.error('Error importing products:', error);
      alert('Failed to import products.');
    }
  };


  return (
    <Container maxWidth="lg" className={classes.root} style={{ padding: "2rem", height: "100vh", }}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: "inherit" }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel className={classes.stepLabel}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <Box className={classes.content}>
      <Grid container spacing={4}>
        <Grid item  xs={4}>
          <Box>
            <Typography variant="h5" className={classes.title} gutterBottom>Basics</Typography>
            <Typography variant="subtitle1">Name, brand, description, and other essential details of the product.</Typography>
          </Box>
        </Grid>
        <Grid container item xs={8} style={{ color: "rgb(234, 236, 239)" }}>
          <Grid item xs={12}>
          {getStepContent(activeStep)}
          </Grid>
        </Grid>
      </Grid>
       
      </Box>

      <Grid container style={{ marginTop: '2em', width: "100%" }}>
        <Grid item xs={6}>
          <Button variant="outlined" color="secondary" className={classes.button} onClick={handleQuit} style={{ backgroundColor: "inherit", color: "#f50057" }}>
            Quit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep > 0 ? <Button className={classes.button} style={{ marginRight: '1em', backgroundColor: "inherit", color: "rgb(240, 185, 11)" }} onClick={handleBack}>Back</Button> : null}
            {activeStep === steps.length - 1 ?
              (
                <Button variant="contained" className={classes.button} onClick={handleFinish}>
                  Finish
                </Button>
              ) : (
                <Button variant="contained" color="default"
                  className={classes.button} onClick={handleNext}>
                  Next
                </Button>
              )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
