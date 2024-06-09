// File: ./Form/Shipping.js
import React from 'react';
import { TextField, Grid } from '@material-ui/core';

export default function Shipping({ product, setProduct }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Weight"
          name="weight"
          value={product.weight || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Dimensions"
          name="dimensions"
          value={product.dimensions || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
