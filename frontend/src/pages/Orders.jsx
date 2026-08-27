import './Orders.css'
import { useEffect, useState } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`http://localhost:5000/orders`);

                if (!response.ok) {
                    throw new Error("Failed to load orders.")
                };

                const data = await response.json()

                setOrders(data);

            } catch (error) {
                console.error(error)
                setError("Unable to connect to the server.")
            } finally {
                setLoading(false)
            }
        };

        fetchOrders();
    }, []);

    const [orderId, setOrderId] = useState("");

    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);
    const [orderItemsError, setOrderItemsError] = useState(null);

    const findOrder = async (id) => {
        setOrderLoading(true);
        setOrderError(null);
        setOrder(null);
        setOrderItems([]);

        try {
            const response = await fetch(`http://localhost:5000/orders/${id}`);

            if (!response.ok) {
                throw new Error("Order not found.");
            }

            const data = await response.json();

            setOrder(data.order);
            setOrderItems(data.items);

        } catch (error) {
            console.error(error);
            setOrderError("Unable to find order.");
        } finally {
            setOrderLoading(false)
        };
    };

    const reverseOrders = [...orders].reverse()

    return (
        <div className="orders">
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p>{orderError}</p>
            ) : (
                <>
                    <header className="orders-header">
                        <h2>Orders</h2>
                    </header>

                    <section className="all-orders">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reverseOrders.length > 0 ? (
                                    reverseOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.status}</td>
                                            <td>{order.total}</td>
                                        </tr>
                                ))
                                ) : (
                                    <tr className="no-data">
                                        <td colSpan="3">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>

                    <section className="find-order">
                        <h2>Find Order</h2>

                        <input 
                            type="text"
                            value={orderId}
                            onChange={(event) => setOrderId(event.target.value)}
                        />

                        <button onClick={() => findOrder(orderId)}>
                            Search
                        </button>

                        <section className="find-order-table">
                            {orderLoading ? (
                                <p>Loading order...</p>
                            ) : orderError ? (
                                <p>{orderError}</p>
                            ) : order && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{order.id}</td>
                                            <td>{order.status}</td>
                                            <td>{order.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}

                            {orderItems.length > 0 ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Item ID</th>
                                                <th>Item Price</th>
                                                <th>Product ID</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                                {orderItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.product_id}</td>
                                                        <td>{item.quantity}</td>
                                                    </tr>
                                                ))
                                                }
                                        </tbody>
                                    </table>
                            ) : (
                                <p>No items found.</p>
                            )}
                        </section>
                    </section>
                </>
            )}
        </div>
    )
}

export default Orders;