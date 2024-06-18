import React from 'react';
import { Grid, IconButton, Box, Typography, Button } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import FieldRow from '../FieldRow';

export default function Inventory({ product, setProduct }) {
  if (!product.inventory) {
    setProduct(prevProduct => ({ ...prevProduct, inventory: [] }));
  }
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInventory = [...product.inventory];
    updatedInventory[index] = { ...updatedInventory[index], [name]: value };
    setProduct(prevProduct => ({ ...prevProduct, inventory: updatedInventory }));
  };

  const handleAddWarehouse = () => {
    setProduct(prevProduct => ({
      ...prevProduct,
      inventory: [...prevProduct.inventory, { warehouse: '', stock: '' }]
    }));
  };

  const handleRemoveWarehouse = (index) => {
    const updatedInventory = product.inventory.filter((_, i) => i !== index);
    setProduct(prevProduct => ({ ...prevProduct, inventory: updatedInventory }));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>Inventory</Typography>
          <Typography variant="subtitle1">Manage stock quantities for different warehouses.</Typography>
        </Box>
      </Grid>
      <Grid container item xs={8}>
        {/* {product.inventory.map((inv, index) => (
          <Grid item xs={12} key={index}>
            <FieldRow
              label={`Warehouse ${index + 1}`}
              name="warehouse"
              value={inv.warehouse}
              variant="input"
              onChange={(event) => handleChange(index, event)}
            />
            <FieldRow
              label="Stock Quantity"
              name="stock"
              value={inv.stock}
              variant="input"
              onChange={(event) => handleChange(index, event)}
            />
            <IconButton onClick={() => handleRemoveWarehouse(index)}><Remove /></IconButton>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddWarehouse}>
            Add Warehouse
          </Button>
        </Grid> */}
         <Grid item xs={12}>
        <FieldRow
          label="Stock Quantity"
          value={product.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
          openModal={false}
          variant="input"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldRow
          label="SKU"
          value={product.sku}
          onChange={(e) => handleChange('sku', e.target.value)}
          openModal={false}
          variant="input"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldRow
          label="Weight"
          value={product.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          openModal={false}
          variant="input"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldRow
          label="Dimensions"
          value={product.dimensions}
          onChange={(e) => handleChange('dimensions', e.target.value)}
          openModal={false}
          variant="input"
        />
      </Grid>
      </Grid>
    </Grid>
  );
}
