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

    const [findOrderId, setFindOrderId] = useState("");
    const [updateOrderId, setUpdateOrderId] = useState("");
    const [deleteOrderId, setDeleteOrderId] = useState("");

    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);

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

    const [creatingOrder, setCreatingOrder] = useState(false);
    const [createOrderError, setCreateOrderError] = useState(null);

    const handleCreateSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const orderData = Object.fromEntries(formData);

        orderData.user_id = Number(orderData.user_id);
        orderData.product_id = Number(orderData.product_id);
        orderData.quantity = Number(orderData.quantity);

        createOrder(orderData)
    }

    const createOrder=  async (orderData) => {
        setCreatingOrder(true);
        setCreateOrderError(null);

        try {
            const response = await fetch("http://localhost:5000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            return data;

        } catch (error) {
            setCreateOrderError(error.message);
        } finally {
            setCreatingOrder(false);
        }
    };

    const [updatingOrder, setUpdatingOrder] = useState(false);
    const [updateOrderError, setUpdateOrderError] = useState(null);

    const handleUpdateSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const orderData = Object.fromEntries(formData);

        updateOrder(updateOrderId, orderData);
    };

    const updateOrder = async (id, orderData) => {
        setUpdatingOrder(true);
        setUpdateOrderError(null);

        try {
            const response = await fetch(`http://localhost:5000/orders/${id}`,  {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            return data;

        } catch (error) {
            setUpdateOrderError(error.message);
        } finally {
            setUpdatingOrder(false);
        }
    };

    const [deletingOrder, setDeletingOrder] = useState(false);
    const [deleteOrderError, setDeleteOrderError] = useState(null);

    const handleDeleteSubmit = (event) => {
        event.preventDefault();

        deleteOrder(deleteOrderId)
    };

    const deleteOrder = async (id) => {
        setDeletingOrder(true);
        setDeleteOrderError(null);

        try {

            const response = await fetch(`http://localhost:5000/orders/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            return data;

        } catch (error) {
            setDeleteOrderError(error.message);
        } finally {
            setDeletingOrder(false);
        }
    };

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

                    <section className="find-order">
                        <h2>Find Order</h2>

                        <input 
                            type="text"
                            value={findOrderId}
                            onChange={(event) => setFindOrderId(event.target.value)}
                        />

                        <button onClick={() => findOrder(findOrderId)}>
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

                    <section className="create-order">
                        <h2>Create Order</h2>

                        <form onSubmit={handleCreateSubmit}>
                            <label>
                                User ID: 
                                <input type="number" name="user_id" required />
                            </label>

                            <label>
                                Status:

                                <select name="status" required>
                                    <option value="">Select status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </label>

                            <label>
                                Product ID: 
                                <input type="number" name="product_id" required />
                            </label>

                            <label>
                                Quantity:
                                <input type="number" name="quantity" required />
                            </label>

                            <button type="submit">
                                Create Order
                            </button>
                        </form>

                        {creatingOrder && <p>Creating order...</p>}
                        {createOrderError && <p>{createOrderError}</p>}
                    </section>

                    <section className="update-order">
                        <h2>Update Order Status</h2>

                        <form onSubmit={handleUpdateSubmit}>
                            <label>
                                OrderID: 
                                <input
                                    type="number"
                                    value={updateOrderId}
                                    onChange={(event) => setUpdateOrderId(event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Status: 
                                <select name="status" required>
                                    <option calue="">Select status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </label>

                            <button type="submit">
                                Update Order
                            </button>
                        </form>

                        {updatingOrder && <p>Updating order...</p>}
                        {updateOrderError && <p>{updateOrderError}</p>}
                    </section>

                    <section className="delete-order">
                        <h2>Delete Order</h2>

                        <form onSubmit={handleDeleteSubmit}>
                            <label>
                                Order ID:
                                <input 
                                    type="number"
                                    value={deleteOrderId}
                                    onChange={(event) => setDeleteOrderId(event.target.value)}
                                    required
                                />
                            </label>

                            <button type="submit">
                                Delete Order
                            </button>
                        </form>

                        {deletingOrder && <p>Deleting order...</p>}
                        {deleteOrderError && <p>{deleteOrderError}</p>}
                    </section>
                </>
            )}
        </div>
    )
}

export default Orders;