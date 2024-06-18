import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Select, MenuItem } from '@material-ui/core';
import FieldRow from '../FieldRow';

export default function SupplierInfo({ product, setProduct }) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch supplier data from an API or define it here
    setSuppliers([
      { id: 1, name: 'Supplier A' },
      { id: 2, name: 'Supplier B' },
      { id: 3, name: 'Supplier C' },
    ]);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>Supplier Info</Typography>
          <Typography variant="subtitle1">Details about the supplier of the product.</Typography>
        </Box>
      </Grid>
      <Grid container item xs={8}>
        <Grid item xs={12}>
          <FieldRow
            label="Supplier"
            name="supplier"
            value={product.supplier || ''}
            variant="select"
            options={suppliers.map(supplier => ({
              value: supplier.name,
              label: supplier.name,
            }))}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Supplier Contact"
            name="supplierContact"
            value={product.supplierContact || ''}
            variant="input"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
