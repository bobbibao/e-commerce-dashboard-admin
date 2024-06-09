// File: ./Form/Pricing.js
import React from 'react';
import { TextField, Grid } from '@material-ui/core';

export default function Pricing({ product, setProduct }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Price"
          name="price"
          value={product.price || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Discount"
          name="discount"
          value={product.discount || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
