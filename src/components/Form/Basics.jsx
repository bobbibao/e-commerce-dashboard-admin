import React from 'react';
import { makeStyles, Grid, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import FieldRow from '../FieldRow';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'ApercuMedium'
  },
  
}));

export default function Basics(props) {
  const classes = useStyles();
  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  return (
    <Grid container className={classes.grid} spacing={4}>
      <Grid item className={classes.box} xs={4}>
        <Box>
          <Typography variant="h5" className={classes.title} gutterBottom>Basics</Typography>
          <Typography variant="subtitle1">Name, brand, and description let shoppers quickly scan through each product.</Typography>
        </Box>
      </Grid>
      <Grid container item className={classes.box} xs={8} style={{color: "rgb(234, 236, 239) !important"}}>
        <Grid item xs={12}>
          <FieldRow label="Tên sản phẩm"  openModal={false} variant="input"/>
        </Grid>
        <Grid item xs={12}>
          <FieldRow label="Thương hiệu" openModal={false} variant="input"/>
        </Grid>
        <Grid item xs={12}>
          <FieldRow label="Mô tả" openModal={false} variant="input"/>
        </Grid>
        <Grid item xs={12}>
          <FieldRow label="Họ" openModal={false} variant="input"/>
        </Grid>
        <Grid item xs={12}>
          <FieldRow label="Họ" openModal={false} variant="input"/>
        </Grid>
        <Grid item xs={12}>
          <FieldRow label="Họ" openModal={false} variant="input"/>
        </Grid>
        <Grid item xs={12}>
          <FieldRow label="Loại sản phẩm" value="category" openModal={false} variant="select"/>
        </Grid>
      </Grid>
    </Grid>
  );
}