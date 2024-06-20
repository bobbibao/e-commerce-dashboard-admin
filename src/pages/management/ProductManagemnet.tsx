import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { useParams } from "react-router";
import { makeStyles, Grid, Box, Typography, Button, IconButton } from '@material-ui/core';
import FieldRow from "../../components/FieldRow";
import { Delete } from '@material-ui/icons';
import { FaPlus } from 'react-icons/fa';

import CheckBox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
        sold: 0,
        imageUrl: "",
        brandName: "",
        category: "",
        description: "",
        gender: "",
        productCode: "",
        productionDate: "",
        availableSizes: [],
        rating: 0,
        additionalImages: [],
        isArchived: false,
        isFeatured: false
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/products/${id}`);
                console.log('data', data);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return "<div> loading... </div>";
    }

    useEffect(() => {
        if (product) {
            setProductUpdate({
                name: product.name || "",
                price: product.price || 0,
                stock: product.stock || 0,
                sold: product.sold || 0,
                imageUrl: `https://${product.imageUrl || ""}`,
                brandName: product.brandName || "",
                category: product.category || "",
                description: product.description || "",
                gender: product.gender || "",
                productCode: product.productCode || "",
                productionDate: product.productionDate || "",
                rating: product.rating || 0,
                availableSizes: product.availableSizes || [],
                additionalImages: product.additionalImageUrls?.map((url: string) => `https://${url}`) || [],
                isArchived: product.isArchived || false,
                isFeatured: product.isFeatured || false
            });
        }
    }, [product]);

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

    const handleMainImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setProductUpdate({ ...productUpdate, imageUrl: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdditionalImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    const newImages = [...productUpdate.additionalImages, reader.result];
                    setProductUpdate({ ...productUpdate, additionalImages: newImages });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAdditionalImage = (index: number) => {
        const newImages = productUpdate.additionalImages.filter((_, i) => i !== index);
        setProductUpdate({ ...productUpdate, additionalImages: newImages });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main className="dashboard-product-box">
                <Typography variant="h4" style={{ fontWeight: 700 }} >Chỉnh sửa sản phẩm</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="subtitle1"  style={{letterSpacing: 2, opacity: 0.8}}>
                                Thông tin sản phẩm <span style={{ color: "rgb(252, 213, 53)" }}>(*)</span>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container xs={12} spacing={4} style={{ color: "rgb(234, 236, 239)", borderTopWidth: "1px", borderTopColor: "rgb(131, 131, 131)", borderTopStyle: "solid", margin: "10px" }}>
                        <Grid item xs={3}>
                            <FieldRow
                                label="Tên sản phẩm"
                                value={productUpdate.name}
                                onChange={handleChange}
                                openModal={false}
                                variant="input"
                                style={{ width: "100px" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FieldRow
                                label="Giá bán"
                                value={formatCurrency(productUpdate.price)}
                                onChange={handleChange}
                                openModal={false}
                                variant="number"
                                style={{ width: "100px" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FieldRow
                                label="Tồn kho"
                                value={productUpdate.stock || "0"}
                                onChange={handleChange}
                                openModal={false}
                                variant="number"
                                style={{ width: "100px" }}
                            />
                        </Grid>

                        <Grid item xs={3}>
                            <FieldRow
                                label="Số lượng đã bán/ Tổng số lượng"
                                value={productUpdate.sold + "/ " +   productUpdate.stock}
                                onChange={handleChange}
                                openModal={false}
                                variant="input"
                            />
                        </Grid>

                        <Grid container xs={12} spacing={3} style={{paddingLeft: 16}}>
                            <Grid item xs={3}>
                                <FieldRow
                                    label="Mô tả"
                                    value={productUpdate.description}
                                    onChange={handleChange}
                                    openModal={false}
                                    variant="textarea"
                                />
                            </Grid>

                            <Grid container xs={9} spacing={3} style={{padding: 16}}>
                                <Grid item xs={4}>
                                    <FieldRow
                                        label="Loại sản phẩm"
                                        value={productUpdate.category}
                                        onChange={handleChange}
                                        openModal={false}
                                        variant="select"
                                        options={[
                                            { value: 'SHOES' },
                                            { value: 'T_SHIRTS' },
                                            { value: 'SHORTS' },
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FieldRow
                                        label="Kích thước có sẵn"
                                        value={productUpdate.availableSizes}
                                        onChange={handleChange}
                                        openModal={false}
                                        variant="input"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FieldRow
                                        label="Thương hiệu"
                                        value={productUpdate.brandName}
                                        onChange={handleChange}
                                        openModal={false}
                                        variant="input"
                                    />
                                </Grid >
                                {/* <Grid item xs={3}>
                                    <FieldRow
                                        label="Mức đánh giá"
                                        value={productUpdate.rating + "/5" || "Chưa có đánh giá"}
                                        onChange={handleChange}
                                        openModal={false}
                                        variant="input"
                                    />
                                </Grid> */}
                                <Grid  style={{paddingLeft: 16}}>
                                    <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" style={{color: "white"}}>Tạm ngưng</FormLabel>
                                    <FormControlLabel
                                        control={<CheckBox checked={productUpdate.isArchived} name="checkedA"
                                        onChange={() => setProductUpdate({ ...productUpdate, isArchived: !productUpdate.isArchived })} />}
                                        label="Sản phẩm này sẽ không còn hiển thị trên trang web"
                                        style={{ opacity: 0.6, border: "1px solid rgb(99, 93, 93)", borderRadius: "5px", padding: "3px", paddingRight: "15px", margin: "5px" }}
                                    />
                                    </FormControl>
                                </Grid>    
                                <Grid>
                                    <FormControl>
                                    <FormLabel style={{marginLeft: 25, color: "white"}} id="demo-radio-buttons-group-label" >Nổi bật</FormLabel>
                                    <FormControlLabel
                                        control={<CheckBox checked={productUpdate.isFeatured} name="checkedA"
                                        onChange={() => setProductUpdate({ ...productUpdate, isFeatured: !productUpdate.isFeatured })} />}
                                        label="Sản phẩm này sẽ được hiển thị ở trang chủ"
                                        style={{ opacity: 0.6, border: "1px solid rgb(99, 93, 93)", borderRadius: "5px", padding: "3px", paddingRight: "15px", margin: "5px", marginLeft: "30px"}}
                                    />
                                    </FormControl>
                                </Grid>     
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Box>
                            <Typography variant="subtitle1"  style={{letterSpacing: 2, opacity: 0.8}}>Hình ảnh sản phẩm</Typography>
                        </Box>
                    </Grid>
                    <Grid container xs={12} spacing={3} style={{ color: "rgb(234, 236, 239)", borderWidth: "1px", borderColor: "rgb(131, 131, 131)", borderStyle: "dashed", margin: "10px" }}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Ảnh chính</Typography>
                            <Box display="flex" alignItems="center" marginBottom={2} style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                                <Box position="relative">
                                    <img src={productUpdate.imageUrl} alt="Main product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    <IconButton
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                        onClick={() => {
                                            setProductUpdate({ ...productUpdate, imageUrl: '' });
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                                <Button variant="contained" component="label">
                                    Sửa ảnh chính
                                    <input type="file" hidden onChange={handleMainImageUpload} />
                                </Button>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Typography variant="h6">Các ảnh phụ</Typography>
                            <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {productUpdate.additionalImages?.map((img, index) => (
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
                                <Button variant="contained" component="label" style={{ marginRight: '8px', marginBottom: '15px' }}>
                                    <FaPlus />
                                    <input type="file" hidden onChange={handleAdditionalImageUpload} />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button className={classes.button} style={{ marginRight: 10, backgroundColor: "inherit", color: "rgb(252, 213, 53)" }}>Cancel</Button>
                            <Button variant="contained" className={classes.button} onClick={submitHandler}>Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default ProductManagement;
