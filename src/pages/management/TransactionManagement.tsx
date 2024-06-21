import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { OrderItemType, OrderType } from "../../types";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionManagement = () => {
    const [order, setOrder] = useState<any | null>(null);
	const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/orders/" + id);
				console.log(data);
                setOrder(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, []);

    if (!order) {
        return <div>Loading...</div>;
    }

    const { name, address, city, country, state, pincode, subtotal, shippingCharges, tax, discount, total, status } = {
		name: order.userId,
		address: order.adress || "123 Vạn Kiếp",
		city: order.city || "Phường 3",
		country: order.country || "HCM",
		state: order.state || "Bình Thạnh",
		pincode: order.pincode || 70000,
		subtotal: order.subtotal,
		shippingCharges: order.shippingCharges || 10000,
		tax: order.tax || 0.1,
		discount: order.discount || 0,
		// total: order.subtotal + (order.shsippingCharges || 0) + (order.tax || 0) - (order.discount || 0),
		total: order.subtotal + (order.shsippingCharges || 10000) + (order.subtotal * 0.1),
		status: order.orderStatus
	};

    const updateHandler = async () => {
        try {
            const updatedStatus = status.toUpperCase() === "PROCESSING" ? "SHIPPED" : "DELIVERED";
            await axios.put(`http://localhost:8080/orders/${order.id}/status/${updatedStatus}`);
            setOrder((prev: any) => prev ? { ...prev, status: updatedStatus } : null);
            toast.success("Thay đổi trạng thái thành công");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="admin-container" style={{color: "rgb(234, 236, 239)"}}>
            <AdminSidebar />
            <main className="product-management">
                <section>
                    <h2>Order Items</h2>
                    {order.cartItems.map((i: any) => (
                        <ProductCard key={i._id} name={i.title} photo={"https://"+i.image} price={i.price} quantity={i.amount} _id={i.id} />
                    ))}
                </section>
                <ToastContainer />
                <article className="shipping-info-card">
                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>User ID: {name}</p>
                    <p>Address: {`${address}, ${city}, ${state}, ${country} ${pincode}`}</p>
                    <h5>Amount Info</h5>
                    <p>Sub Total: {subtotal}</p>
                    <p>Shipping Charges: {shippingCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total Amount: {total}</p>
                    <h5>Status Info</h5>
                    <p>
                        Status: <span style={{color: (order.orderStatus === "DELIVERED")? "rgb(122, 200, 180)": order.orderStatus === "PROCESSING" ? "rgb(157, 90, 98)": "rgb(240, 185, 11)"}}>{order.orderStatus}</span>
                    </p>
                    <button onClick={updateHandler}>Process Order</button>
                </article>
            </main>
        </div>
    );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
    <div className="transaction-product-card">
        <img src={photo} alt={name} />
        <Link to={`/product/${_id}`} style={{color: "rgb(234, 236, 239)"}}>{name}</Link>
        <span>
            ${price} X {quantity} = ${price * quantity}
        </span>
    </div>
);

export default TransactionManagement;
