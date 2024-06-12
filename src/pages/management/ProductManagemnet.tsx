import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { useParams } from "react-router";

const img = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2hvZXN8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
    const { id } = useParams();
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

    return (
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main className="product-management">
                <section>
                    <strong>ID - {product.id}</strong>
                    <img src={productUpdate.imageUrl} alt={productUpdate.name} />
                    {productUpdate.stock > 0 ? <span className="green">{productUpdate.stock} Available</span> : <span className="red">Not Available</span>}
                    <h3>
						{productUpdate.price.toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
						</h3>
                </section>
                <article>
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
                </article>
            </main>
        </div>
    );
};

export default ProductManagement;
