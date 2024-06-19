import React, {useEffect} from "react";
import { Container, Box, makeStyles, Button, Stepper, Step, StepLabel, Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Basics from './Form/Basics';
import Media from './Form/Media';
import Pricing from './Form/Pricing';
import Shipping from './Form/Shipping';
import Inventory from './Form/Inventory';
import SupplierInfo from './Form/SupplierInfo';  // New import
import Reviews from './Form/Reviews';            // New import
import RestockHistory from './Form/RestockHistory'; // New import

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
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(2)
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
  }
}));

function getSteps() {
  return ['Basics', 'Media', 'Pricing', 'Inventory', 'Supplier Info'];
}

export default function CreateProductForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [createProductModal, setCreateProductModal] = React.useState(false);

  const [product, setProduct] = React.useState({
    name: '',
    brand: '',
    description: '',
    category: '',
    availableSizes: '',
    price: '',
    importPrice: '',
    stock: '',
    sku: '',
    supplier: '',
    mainImage: '',
    additionalImages: [],
  });

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Basics product={product} setProduct={setProduct} />;
      case 1:
        return <Media product={product} setProduct={setProduct} />;
      case 2:
        return <Pricing product={product} setProduct={setProduct} />;
      // case 3:
      //   return <Shipping product={product} setProduct={setProduct} />;
      case 3:
        return <Inventory product={product} setProduct={setProduct} />;
      case 4:
        return <SupplierInfo product={product} setProduct={setProduct} />;
      // case 5:
      //   return <Reviews product={product} setProduct={setProduct} />;
      // case 6:
      //   return <RestockHistory product={product} setProduct={setProduct} />;
      default:
        return 'Unknown stepIndex';
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleQuit = () => {
    navigate(-1);
  };
  const uploadImages = async () => {
    const formData = new FormData();
    formData.append('mainImage', product.mainImage);

    product.additionalImages.forEach((image, index) => {
      formData.append('additionalImages', image);
    });
  
  
    try {
      const res = await axios.post('http://localhost:8080/products/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { mainImage, additionalImages } = res.data;
      setProduct(prevProduct => ({
        ...prevProduct,
        mainImage,
        additionalImages
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };
  
  const handleFinish = async () => {
 
    await uploadImages();
    console.log(product);
    try {
      const res = await axios.post('http://localhost:8080/products', product);
      console.log(res);
      if (res.status === 201) {
        navigate('/admin/product', replace = true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root} style={{ padding: "2rem" }}>
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
        {getStepContent(activeStep)}
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
