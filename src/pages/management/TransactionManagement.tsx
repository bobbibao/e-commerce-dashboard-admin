import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { OrderItemType } from "../../types";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionManagement = () => {
    const [order, setOrder] = useState<any | null>(null);
	const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/orders/" + id);
                setOrder(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrder();
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const updateHandler = async () => {
        try {
            const updatedStatus = order.orderStatus.toUpperCase() === "PROCESSING" ? "SHIPPED" : "DELIVERED";
            await axios.put(`http://localhost:8080/orders/${order.id}/status/${updatedStatus}`)
            .then((res) => {
                setOrder((prev: any) => prev ? { ...prev, orderStatus: updatedStatus } : null);
                toast.success("Thay đổi trạng thái đơn hàng thành công");
            });
        } catch (error) {
            console.log(error);
        }
    };

    const { name, address, city, country, state, pincode, subtotal, shippingCharges, tax, discount, total, orderStatus } = {
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
        total: order.subtotal + (order.shippingCharges || 10000) + (order.subtotal * 0.1),
        orderStatus: order.orderStatus
    };

    return (
        <div className="admin-container" style={{ color: "rgb(234, 236, 239)" }}>
            <AdminSidebar />
            <main className="product-management">
                <section>
                    <h2>Order Items</h2>
                    {order.cartItems.map((i: any) => (
                        <ProductCard key={i._id} name={i.title} photo={"https://" + i.image} price={i.price} quantity={i.amount} _id={i.id} />
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
                        Status: <span style={{ color: (orderStatus === "DELIVERED") ? "rgb(122, 200, 180)" : orderStatus === "PROCESSING" ? "rgb(157, 90, 98)" : "rgb(240, 185, 11)" }}>{orderStatus}</span>
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
        <Link to={`/product/${_id}`} style={{ color: "rgb(234, 236, 239)" }}>{name}</Link>
        <span>
            ${price} X {quantity} = ${price * quantity}
        </span>
    </div>
);

export default TransactionManagement;
