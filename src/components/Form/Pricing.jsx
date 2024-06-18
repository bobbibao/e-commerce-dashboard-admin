import React from 'react';
import { Grid, Button, IconButton, Box, Typography } from '@material-ui/core';
import FieldRow from '../FieldRow';

export default function Pricing({ product, setProduct }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>Pricing</Typography>
          <Typography variant="subtitle1">Enter the cost price, selling price, and discount details.</Typography>
        </Box>
      </Grid>
      <Grid container item xs={8}>
        <Grid item xs={12}>
          <FieldRow
            label="Cost Price"
            name="costPrice"
            value={product.costPrice || ''}
            variant="input"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Selling Price"
            name="price"
            value={product.price || ''}
            variant="input"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Discount"
            name="discount"
            value={product.discount || ''}
            variant="input"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
