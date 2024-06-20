import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { useParams } from "react-router";
import { makeStyles, Grid, Box, Typography, Button, IconButton } from '@material-ui/core';
import FieldRow from "../../components/FieldRow";
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    title: {
      fontFamily: 'ApercuMedium'
    },
    button: {
        boxShadow: 'none',
        backgroundColor: "rgb(252, 213, 53)",
        color: "rgb(32, 38, 48)",
        '&:hover': {
          opacity: 0.8
        }
      },
  }));
  
const ProductManagement = () => {
    const { id } = useParams();
    const classes = useStyles();

    const [product, setProduct] = useState<any>({});
    const [productUpdate, setProductUpdate] = useState<any>({
        name: "",
        price: 0,
        stock: 0,
        imageUrl: "",
        brandName: "",
        category: "",
        description: "",
        gender: "",
        productCode: "",
        productionDate: "",
        rating: 0
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    if(!product){
        return "<div> loading... </div>";
    }
    useEffect(() => {
        if (product) {
            setProductUpdate({
                name: product.name || "",
                price: product.price || 0,
                stock: product.stock || 0,
                imageUrl: `https://${product.imageUrl || ""}`,
                brandName: product.brandName || "",
                category: product.category || "",
                description: product.description || "",
                gender: product.gender || "",
                productCode: product.productCode || "",
                productionDate: product.productionDate || "",
                rating: product.rating || 0
            });
        }
    }, [product]);

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        const reader: FileReader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") setProductUpdate({ ...productUpdate, imageUrl: reader.result });
            };
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductUpdate({ ...productUpdate, [name]: value });
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/products/${id}`, {
                ...productUpdate,
                imageUrl: productUpdate.imageUrl.replace('https://', '')
            });
            setProduct({ ...productUpdate, imageUrl: productUpdate.imageUrl.replace('https://', '') });
            alert("Product updated successfully");
        } catch (error) {
            console.log(error);
            alert("Error updating product");
        }
    };

    const [mainImage, setMainImage] = useState(product.mainImage || '');
    const [additionalImages, setAdditionalImages] = useState(product.additionalImages || []);
  
    const handleMainImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMainImage(reader.result);
          setProduct(prevProduct => ({ ...prevProduct, mainImage: file }));
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
          setProduct(prevProduct => ({ ...prevProduct, additionalImages: [
            ...prevProduct.additionalImages,
            file
          ] }));
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
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main className="dashboard-product-box">
          <Typography variant="h3" style={{fontWeight: 800}} >Chỉnh sửa sản phẩm</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box>
                    <Typography variant="subtitle1">Name, brand, description, and other essential details of the product.</Typography>
                    </Box>
                </Grid>
                <Grid container  xs={12} spacing={4} style={{ color: "rgb(234, 236, 239)" , borderTopWidth: "1px", borderTopColor: "rgb(131, 131, 131)", borderTopStyle: "solid", margin: "10px"}}>
                    <Grid item xs={3}>
                    <FieldRow
                        label="Tên sản phẩm"
                        value={product.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        openModal={false}
                        variant="input"
                        style={{width: "100px"}}
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <FieldRow
                        label="Thương hiệu"
                        value={product.brand}
                        onChange={(e) => handleChange('brand', e.target.value)}
                        openModal={false}
                        variant="input"
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <FieldRow
                        label="Mô tả"
                        value={product.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        openModal={false}
                        variant="input"
                    />
                    </Grid>
                    <Grid item xs={3}>
                    <FieldRow
                        label="Loại sản phẩm"
                        value={product.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        openModal={false}
                        variant="select"
                        options={[
                        { value: 'SHOES' },
                        { value: 'T_SHIRTS'},
                        { value: 'SHORTS'},
                        ]}
                    />
                    </Grid>
        <Grid item xs={3}>
          <FieldRow
            label="Kích thước có sẵn"
            value={product.availableSizes}
            onChange={(e) => handleChange('availableSizes', e.target.value)}
            openModal={false}
            variant="input"
          />
        </Grid>
                </Grid>
             
                <Grid container xs={12} >
                    <Box>
                    <Typography variant="subtitle1">Hình ảnh</Typography>
                    </Box>

                </Grid>
                <Grid container xs={12} spacing={3} style={{ color: "rgb(234, 236, 239)" , borderWidth: "1px", borderColor: "rgb(131, 131, 131)", borderStyle: "dashed", margin: "10px"}}>
                <Grid item xs={12}>
          <Typography variant="h6">Ảnh chính</Typography>
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
                Sửa ảnh chính
                <input type="file" hidden onChange={handleMainImageUpload} />
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Các ảnh phụ</Typography>
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
              Thêm ảnh phụ
              <input type="file" hidden onChange={handleAdditionalImageUpload} />
            </Button>
          </Box>
        </Grid>
                </Grid>
                <Grid item xs={12}>
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button className={classes.button} style={{marginRight: 10, backgroundColor: "inherit", color: "rgb(252, 213, 53)" }} >Cancel</Button>
            <Button variant="contained" className={classes.button} >Save</Button>
          </Box>
        </Grid>
        
            </Grid>
                {/* <section>
                    <strong>Thông tin chi tiết sản phẩm ID - {product.id}</strong>
                    <img src={productUpdate.imageUrl} alt={productUpdate.name} />
                    {productUpdate.stock > 0 ? <span className="green">{productUpdate.stock} có sẳn</span> : <span className="red">Không có sẳn</span>}
                   <h3>
						{productUpdate.price.toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
						</h3>
                </section> */}
                {/* <article>
                    <form onSubmit={submitHandler} style={{ color: "rgb(234, 236, 239)" }}>
                        <h2>Manage Product</h2>
                        {productUpdate.imageUrl && <img src={productUpdate.imageUrl} alt={productUpdate.name} />}
                        <div>
                            <input type="file" placeholder="Choose Photo" onChange={changeImageHandler} />
                        </div>
                        <div>
                            <label>Name</label>
                            <input required type="text" name="name" placeholder="Name" value={productUpdate.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Price</label>
                            <input required type="number" name="price" placeholder="Price" value={productUpdate.price} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Stock</label>
                            <input required type="number" name="stock" placeholder="Stock" value={productUpdate.stock} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Brand Name</label>
                            <input type="text" name="brandName" placeholder="Brand Name" value={productUpdate.brandName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Category</label>
                            <input type="text" name="category" placeholder="Category" value={productUpdate.category} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea name="description" placeholder="Description" value={productUpdate.description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label>Gender</label>
                            <input type="text" name="gender" placeholder="Gender" value={productUpdate.gender} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Product Code</label>
                            <input type="text" name="productCode" placeholder="Product Code" value={productUpdate.productCode} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Production Date</label>
                            <input type="date" name="productionDate" placeholder="Production Date" value={productUpdate.productionDate} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Rating</label>
                            <input type="number" name="rating" placeholder="Rating" value={productUpdate.rating} onChange={handleChange} />
                        </div>
                        <button type="submit">Update Product</button>
                    </form>
                </article> */}
            </main>
        </div>
    );
};

export default ProductManagement;
