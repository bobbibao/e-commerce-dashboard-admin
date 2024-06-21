import React, { useState, useEffect } from "react";
import { Container, Box, makeStyles, Button, Typography, Stepper, Step, StepLabel, Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FieldRow from './FieldRow';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  return ['Chọn sản phẩm và số lượng', 'Cung cấp thông tin nhà cung cấp', 'Xác nhận thông tin'];
}

export default function ImportProductStockForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [productList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [products, setProducts] = useState([{ product: '', quantity: '' }]);
  const [supplier, setSupplier] = useState('');
  const [supplierDetails, setSupplierDetails] = useState({});
  const steps = getSteps();

  const handleProductChange = (index, event) => {
    const newProducts = [...products];
    newProducts[index][event.target.name] = event.target.value;
    setProducts(newProducts);
    setProductList(
      productList.filter(product => product.id+"" !== newProducts[index].product.split(' - ')[0])
    );
  };

  const handleAddProduct = () => {
    setProducts([...products, { product: '', quantity: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const fetchSupplierDetails = async (supplierName) => {
    const supplierID = supplierName.split(' - ')[0];
    supplierList.forEach(supplier => {
      if (supplier.supplierID+"" === supplierID) {
        setSupplierDetails(supplier);
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        console.log('Products:', response.data);
        setProductList(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductList([]);
      }
    };
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
    fetchProducts();
    fetchSuppliers();
  }, []);

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
                    options={productList.map(product => product.id + " - " + product.name)}
                    getOptionLabel={(option) => option}
                    value={product.product}
                    onChange={(e, newValue) => handleProductChange(index, { target: { name: "product", value: newValue } })}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="ID - Tên sản phẩm"
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
                    label="Số lượng"
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
              options={supplierList.map(supplier => supplier.supplierID + ' - ' + supplier.supplierName)}
              getOptionLabel={(option) => option}
              value={supplier}
              onChange={handleSupplierChange}
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
          </div>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" style={{letterSpacing: 2, opacity: 0.8}}>Sản phẩm nhập kho</Typography>
              {products.map((product, index) => (
                <Grid container spacing={1} key={index}>
                  <Grid item xs={2}>
                  <FieldRow
                      label="ID"
                      value={product.product.split(' - ')[0]}
                      openModal={false}
                      variant="input"
                    />
                  </Grid>
                  <Grid item xs={7}>
                  <FieldRow
                      label="Tên sản phẩm"
                      value={product.product.split(' - ')[1]}
                      openModal={false}
                      variant="input"
                    />
                  </Grid>
                  <Grid item xs={3}>
                  <FieldRow
                      label="Số lượng"
                      value={product.quantity}
                      openModal={false}
                      variant="input"
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Typography variant="h6" style={{letterSpacing: 2, opacity: 0.8}}>Thông tin nhà cung cấp</Typography>
              <Grid container spacing={1}>
                  <Grid item xs={2}>
                  <FieldRow
                      label="ID"
                      value={supplierDetails ? supplierDetails.supplierID : ''}
                      openModal={false}
                      variant="input"
                    />
                  </Grid>
                  <Grid item xs={7}>
                  <FieldRow
                      label="Tên nhà cung cấp"
                      value={supplierDetails ? supplierDetails.supplierName : ''}
                      openModal={false}
                      variant="input"
                    />
                  </Grid>
                  <Grid item xs={3}>
                  <FieldRow
                      label="Số điện thoại"
                      value={supplierDetails ? supplierDetails.contactPhone : ''}
                      openModal={false}
                      variant="input"
                    />
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
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
      await axios.post('http://localhost:8080/products/import?supplier='+supplier.split(' - ')[0], 
        products.map(product => {
          return {
            productId: product.product.split(' - ')[0],
            quantity: product.quantity
          };
        })
      );
      toast.success('Nhập kho thành công.');
      handleReset();
    } catch (error) {
      console.error('Error importing products:', error);
      toast.error('Nhập kho không thành công.');
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root} style={{ padding: "2rem", height: "100vh", }}>
      <div className={classes.root}>
      <ToastContainer />
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
          <Grid item xs={4}>
            <Box>
              {
                activeStep === 0 ?(
                <><Typography variant="h6" style={{ color: "rgb(234, 236, 239)" }}>Danh sách sản phẩm</Typography><Typography variant="subtitle1" style={{ color: "rgb(234, 236, 239)" }}>Chọn sản phẩm và số lượng nhập kho.</Typography></>)
                : activeStep === 1 ? (
                <><Typography variant="h6" style={{ color: "rgb(234, 236, 239)" }}>Thông tin nhà cung cấp</Typography><Typography variant="subtitle1" style={{ color: "rgb(234, 236, 239)" }}>Chọn nhà cung cấp cung cấp sản phẩm.</Typography></>)
                : (
                <><Typography variant="h6" style={{ color: "rgb(234, 236, 239)" }}>Xác nhận thông tin</Typography><Typography variant="subtitle1" style={{ color: "rgb(234, 236, 239)" }}>Xem lại thông tin trước khi nhập kho.</Typography></>)

              }
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
            Thoát
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep > 0 ? <Button className={classes.button} style={{ marginRight: '1em', backgroundColor: "inherit", color: "rgb(240, 185, 11)" }} onClick={handleBack}>Quay lại</Button> : null}
            {activeStep === steps.length - 1 ?
              (
                <Button variant="contained" className={classes.button} onClick={handleFinish}>
                  Hoàn thành
                </Button>
              ) : (
                <Button variant="contained" color="default"
                  className={classes.button} onClick={handleNext}>
                  Tiếp
                </Button>
              )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
