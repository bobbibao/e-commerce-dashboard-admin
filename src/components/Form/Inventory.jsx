// File: ./Form/Inventory.js
import React from 'react';
import { TextField, Grid } from '@material-ui/core';

export default function Inventory({ product, setProduct }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Stock Quantity"
          name="stock"
          value={product.stock || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="SKU"
          name="sku"
          value={product.sku || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
