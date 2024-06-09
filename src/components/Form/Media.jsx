// File: ./Form/Media.js
import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

export default function Media({ product, setProduct }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Media URL"
          name="media"
          value={product.media || ''}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Upload Media
        </Button>
      </Grid>
    </Grid>
  );
}
