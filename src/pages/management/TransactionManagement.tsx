import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { OrderItemType, OrderType } from "../../types";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
		address: order.adress,
		city: order.city || "",
		country: order.country || "",
		state: order.state || "",
		pincode: order.pincode || 0,
		subtotal: order.subtotal,
		shippingCharges: order.shippingCharges || 0,
		tax: order.tax || 0,
		discount: order.discount || 0,
		// total: order.subtotal + (order.shippingCharges || 0) + (order.tax || 0) - (order.discount || 0),
		total: order.subtotal,
		status: order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1).toLowerCase()
	};

    const updateHandler = async () => {
        try {
            const updatedStatus = status.toUpperCase() === "PROCESSING" ? "SHIPPED" : "DELIVERED";
            await axios.put(`http://localhost:8080/orders/${order.id}/status/${updatedStatus}`);
            setOrder((prev: any) => prev ? { ...prev, status: updatedStatus } : null);
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
                <article className="shipping-info-card">
                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>Address: {`${address}, ${city}, ${state}, ${country} ${pincode}`}</p>
                    <h5>Amount Info</h5>
                    <p>Sub Total: {subtotal}</p>
                    <p>Shipping Charges: {shippingCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total Amount: {total}</p>
                    <h5>Status Info</h5>
                    <p>
                        Status: <span className={status === "Delivered" ? "purple" : status === "Shipped" ? "green" : "red"}>{status}</span>
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
