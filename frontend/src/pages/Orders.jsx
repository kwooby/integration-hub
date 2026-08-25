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
                const response = await fetch("http://localhost:5000/orders");

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

    const reverseOrders = [...orders].reverse()

    return (
        <div className="orders">
            {loading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p>{error}</p>
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
                </>
            )}
        </div>
    )
}

export default Orders;