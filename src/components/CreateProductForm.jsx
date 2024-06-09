import React from "react";
import { Container, Box, makeStyles, Button, Stepper, Step, StepLabel, Grid } from "@material-ui/core";

import Basics from './Form/Basics';
import Media from './Form/Media';
import Pricing from './Form/Pricing';
import Shipping from './Form/Shipping';
import Inventory from './Form/Inventory';

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  box: {
  },
  root: {
    width: "80vw",
    overflow: "scroll"
  },
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(2)
  },
  button: {
    boxShadow: 'none',
  },
  content: {
    minHeight: 400,
  }
}));

function getSteps() {
  return ['Basics', 'Media', 'Pricing', 'Shipping', 'Inventory'];
}

export default function CreateProductForm() {
  const classes = useStyles();
  const [createProductModal, setCreateProductModal] = React.useState(false);


  const [product, setProduct] = React.useState({
    name: '',
    brand: '',
    description: '',
    category: '',
    media: '',
    price: '',
    discount: '',
    weight: '',
    dimensions: '',
    stock: '',
    sku: ''
  });

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Basics product={product} setProduct={setProduct} />;
      case 1:
        return <Media product={product} setProduct={setProduct} />;
      case 2:
        return <Pricing product={product} setProduct={setProduct} />;
      case 3:
        return <Shipping product={product} setProduct={setProduct} />;
      case 4:
        return <Inventory product={product} setProduct={setProduct} />;
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
    console.log('Quit clicked');
    handleReset(); // Reset the stepper for now
  };

  const handleFinish = () => {
    // Define the action for the Finish button, e.g., submit the form
    console.log('Finish clicked');
    console.log('Product details:', product);
    handleReset(); // Reset the stepper for now
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <Box className={classes.content}>
        {getStepContent(activeStep)}
      </Box>

      <Grid container style={{ marginTop: '2em' }}>
        <Grid item xs={6}>
          <Button variant="outlined" color="secondary" className={classes.button} onClick={handleQuit}>
            Quit
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="flex-end">
            {activeStep > 0 ? <Button color="primary" className={classes.button} style={{ marginRight: '1em' }} onClick={handleBack}>Back</Button> : null}
            {activeStep === steps.length - 1 ?
              (
                <Button variant="contained" color="primary" className={classes.button} onClick={handleFinish}>
                  Finish
                </Button>
              ) : (
                <Button variant="contained" color="primary" className={classes.button} onClick={handleNext}>
                  Next
                </Button>
              )}
          </Box>
        </Grid>
      </Grid>
      {/* <Modal
        disableAutoFocus={true}
        className={classes.modal}
        open={true}
        // onClose={closeSearchModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        disableBackdropClick
      >
        <Fade in={createProductModal}>
          <div className={classes.paper}>
            <CreateProductForm />
          </div>
        </Fade>
      </Modal> */}
    </Container>
  );
}
