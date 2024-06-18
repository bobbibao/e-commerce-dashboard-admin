import React from 'react';
import { makeStyles, Grid, Box, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'ApercuMedium'
  }
}));

export default function Reviews({ product, setProduct }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid} spacing={4}>
      <Grid item className={classes.box} xs={4}>
        <Box>
          <Typography variant="h5" className={classes.title} gutterBottom>Reviews</Typography>
          <Typography variant="subtitle1">Manage product reviews.</Typography>
        </Box>
      </Grid>
      <Grid container item className={classes.box} xs={8} style={{ color: "rgb(234, 236, 239) !important" }}>
        {/* Reviews management logic here */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Customer Reviews"
            multiline
            rows={4}
            variant="outlined"
            value={product.reviews}
            onChange={(e) => setProduct({ ...product, reviews: e.target.value })}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
