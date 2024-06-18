import React, { useState } from 'react';
import { Grid, Box, Typography, Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import FieldRow from '../FieldRow';

export default function Media({ product, setProduct }) {
  const [mainImage, setMainImage] = useState(product.mainImage || '');
  const [additionalImages, setAdditionalImages] = useState(product.additionalImages || []);

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result);
        setProduct(prevProduct => ({ ...prevProduct, mainImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...additionalImages, reader.result];
        setAdditionalImages(newImages);
        setProduct(prevProduct => ({ ...prevProduct, additionalImages: newImages }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAdditionalImage = (index) => {
    const newImages = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(newImages);
    setProduct(prevProduct => ({ ...prevProduct, additionalImages: newImages }));
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h5" gutterBottom>Media</Typography>
          <Typography variant="subtitle1">Upload the main image and additional images for your product.</Typography>
        </Box>
      </Grid>
      <Grid container item xs={8} spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Main Image</Typography>
          <Box display="flex" alignItems="center" marginBottom={2} style={{ display: 'flex', alignItems: 'center' }}>
            {mainImage ? (
              <Box position="relative">
                <img src={mainImage} alt="Main product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <IconButton 
                  style={{ position: 'absolute', top: 0, right: 0 }} 
                  onClick={() => {
                    setMainImage('');
                    setProduct(prevProduct => ({ ...prevProduct, mainImage: '' }));
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            ) : (
              <Button variant="contained" component="label">
                Upload Main Image
                <input type="file" hidden onChange={handleMainImageUpload} />
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Additional Images</Typography>
          <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {additionalImages.map((img, index) => (
              <Box key={index} position="relative" marginRight={2} marginBottom={2} style={{ position: 'relative', marginRight: '8px', marginBottom: '8px' }}>
                <img src={img} alt={`Additional ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <IconButton 
                  style={{ position: 'absolute', top: 0, right: 0 }} 
                  onClick={() => handleRemoveAdditionalImage(index)}
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button variant="contained" component="label" style={{ marginRight: '8px', marginBottom: '8px' }}>
              Upload Additional Image
              <input type="file" hidden onChange={handleAdditionalImageUpload} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
