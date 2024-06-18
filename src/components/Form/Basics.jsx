import React from 'react';
import { makeStyles, Grid, Box, Typography } from '@material-ui/core';
import FieldRow from '../FieldRow';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'ApercuMedium'
  },
}));

export default function Basics({ product, setProduct }) {
  const classes = useStyles();

  const handleChange = (name, value) => {
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Grid container className={classes.grid} spacing={4}>
      <Grid item className={classes.box} xs={4}>
        <Box>
          <Typography variant="h5" className={classes.title} gutterBottom>Basics</Typography>
          <Typography variant="subtitle1">Name, brand, description, and other essential details of the product.</Typography>
        </Box>
      </Grid>
      <Grid container item className={classes.box} xs={8} style={{ color: "rgb(234, 236, 239)" }}>
        <Grid item xs={12}>
          <FieldRow
            label="Tên sản phẩm"
            value={product.name}
            onChange={(e) => handleChange('name', e.target.value)}
            openModal={false}
            variant="input"
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Thương hiệu"
            value={product.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            openModal={false}
            variant="input"
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Mô tả"
            value={product.description}
            onChange={(e) => handleChange('description', e.target.value)}
            openModal={false}
            variant="input"
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Loại sản phẩm"
            value={product.category}
            onChange={(e) => handleChange('category', e.target.value)}
            openModal={false}
            variant="select"
            options={[
              { value: 'clothing', label: 'Clothing' },
              { value: 'electronics', label: 'Electronics' },
              { value: 'furniture', label: 'Furniture' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Mã sản phẩm"
            value={product.productCode}
            onChange={(e) => handleChange('productCode', e.target.value)}
            openModal={false}
            variant="input"
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Nhà cung cấp"
            value={product.supplier}
            onChange={(e) => handleChange('supplier', e.target.value)}
            openModal={false}
            variant="select"
            options={[
              { value: 'supplier1', label: 'Supplier 1' },
              { value: 'supplier2', label: 'Supplier 2' },
              { value: 'supplier3', label: 'Supplier 3' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Kích thước có sẵn"
            value={product.availableSizes}
            onChange={(e) => handleChange('availableSizes', e.target.value)}
            openModal={false}
            variant="input"
          />
        </Grid>
        <Grid item xs={12}>
          <FieldRow
            label="Trạng thái"
            value={product.status}
            onChange={(e) => handleChange('status', e.target.value)}
            openModal={false}
            variant="select"
            options={[
              { value: 'available', label: 'Available' },
              { value: 'out_of_stock', label: 'Out of Stock' },
            ]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
