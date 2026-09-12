import './Shipments.css';
import { useEffect, useState } from 'react';

function Shipments() {
    const [shipments, setShipments] = useState([]);

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const [findOrderId, setFindOrderId] = useState("");

    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);

    const [findShipmentId, setFindShipmentId] = useState("");
    const [findShipmentIdError, setFindShipmentIdError] = useState("");

    const [shipmentLoading, setShipmentLoading] = useState(false);
    const [shipmentError, setShipmentError] = useState(null);

    const [creatingShipment, setCreatingShipment] = useState(false);
    const [creatingShipmentError, setCreatingShipmentError] = useState(null);

    const [shipment, setShipment] = useState("");

    const [updateShipmentId, setUpdateShipmentId] = useState("");
    const [updatingShipment, setUpdatingShipment] = useState(false);
    const [updateShipmentError, setUpdateShipmentError] = useState(null);

    const [deleteShipmentId, setDeleteShipmentId] = useState("");
    const [deletingShipment, setDeletingShipment] = useState(false);
    const [deletingShipmentError, setDeletingShipmentError] = useState(null);

    const fetchShipments = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("http://localhost:5000/shipments")

            if (!response.ok) {
                throw new Error("Failed to load shipments.")
            };

            const data = await response.json();

            setShipments(data);

        } catch (error) {
            console.error(error);
            setError("Unable to connect to server.");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

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

    const findShipment = async (id) => {
        setShipmentLoading(true);
        setShipmentError(null);
        setShipment(null);

        try {
            const response = await fetch(`http://localhost:5000/shipments/${id}`);

            if (!response.ok) {
                throw new Error("Shipment not found.");
            }

            const data = await response.json();

            setShipment(data);

        } catch (error) {
            console.error(error);
            setShipmentError("Unable to find shipment.")
        } finally {
            setShipmentLoading(false)
        }
    };

    const handleCreateShipmentSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const shipmentData = Object.fromEntries(formData);

        shipmentData.order_id = Number(shipmentData.order_id);

        createShipment(shipmentData);
    };

    const createShipment = async (shipmentData) => {
        setCreatingShipment(true);
        setCreatingShipmentError(null);

        try {
            const response = await fetch(`http://localhost:5000/shipments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(shipmentData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error)
        }

        const data = await response.json();

        await fetchShipments();

        return data;

        } catch (error) {
            setCreatingShipmentError(error.message)
        } finally {
            setCreatingShipment(false)
        }
    };

    const handleUpdateShipmentSubmit = (event) => {
        event.preventDefault();

        const shipmentFormData = new FormData(event.target);
        const shipmentData = Object.fromEntries(shipmentFormData);

        Object.keys(shipmentData).forEach((key) => {
            if (shipmentData[key] === "") {
                delete shipmentData[key];
            }
        });

        updateShipment(updateShipmentId, shipmentData);
    };

    const updateShipment = async (id, shipmentData) => {
        setUpdatingShipment(true);
        setUpdateShipmentError(null);

        try {
            const response = await fetch(`http://localhost:5000/shipments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(shipmentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = response.json();

            await fetchShipments();
            return data;
        } catch (error) {
            setUpdateShipmentError(error.message);
        } finally {
            setUpdatingShipment(false);
        }
    };

    const handleDeleteShipmentSubmit = (event) => {
        event.preventDefault();

        deleteShipment(deleteShipmentId);
    }

    const deleteShipment = async (id) => {
        setDeletingShipment(true);
        setDeletingShipmentError(null);

        try {
            const response = await fetch(`http://localhost:5000/shipments/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            await fetchShipments();

            return data;

        } catch (error) {
            setDeletingShipmentError(error.message);
        } finally {
            setDeletingShipment(false);
        }
    }

    const reverseShipments = [...shipments].reverse()

    return (
        <div className="shipments">
            {loading ? (
                <p>Loading shipments...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
            <>
                <header className="shipments-header">
                    <h2>Shipments</h2>
                </header>

                <section className="find-shipment">
                    <h2>Find Shipment</h2>
                    <p>Shipment ID: </p>
                    <input
                        type="text"
                        value={findShipmentId}
                        onChange={(event) => setFindShipmentId(event.target.value)}
                    />

                    <button onClick={() => findShipment(findShipmentId)}>
                        Search
                    </button>

                    <section className="find-shipment-table">
                        {shipmentLoading ? (
                            <p>Loading shipment...</p>
                        ) : shipmentError ? (
                            <p>{shipmentError}</p>
                        ) : shipment && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Carrier</th>
                                        <th>Shipment ID</th>
                                        <th>Order ID</th>
                                        <th>Status</th>
                                        <th>Delivered At</th>
                                        <th>Tracking Number</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>{shipment.carrier}</td>
                                        <td>{shipment.id}</td>
                                        <td>{shipment.order_id}</td>
                                        <td>{shipment.status}</td>
                                        <td>{shipment.delivered_at || "N/A"}</td>
                                        <td>{shipment.tracking_number}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </section>
                </section>

                <section className="all-shipments">
                    <h2>All Shipments</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Shipment ID</th>
                                <th>Order ID</th>
                                <th>Carrier</th>
                                <th>Status</th>
                                <th>Delivered At</th>
                                <th>Tracking Number</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reverseShipments.length > 0 ? (
                                reverseShipments.map((shipment) => (
                                    <tr key={shipment.id}>
                                        <td>{shipment.id}</td>
                                        <td>{shipment.order_id}</td>
                                        <td>{shipment.carrier}</td>
                                        <td>{shipment.status}</td>
                                        <td>{shipment.delivered_at || "N/A"}</td>
                                        <td>{shipment.tracking_number}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="no-data">
                                    <td colSpan="7">No shipments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                <section className="update-shipment">
                    <h2>Update Shipment</h2>

                    <form onSubmit={handleUpdateShipmentSubmit}>
                        <label>
                            Shipment ID:
                            <input
                                type="number"
                                value={updateShipmentId}
                                onChange={(event) => setUpdateShipmentId(event.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Carrier
                            <input type="text" name="carrier" />
                        </label>

                        <label>
                            Status
                            <select name="status">
                                <option value="">Select status</option>
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </label>

                        <div className="update-shipment-row">
                            <button type="submit">
                                Update Shipment
                            </button>
                        </div>

                    </form>
                </section>

                <section className="find-and-create">

                    <section className="create-shipment">
                        <h2>Create Shipment</h2>

                        <form onSubmit={handleCreateShipmentSubmit}>
                            <label>
                                Carrier:
                                <input type="text" name="carrier" required />
                            </label>

                            <label>
                                Order ID:
                                <input type="number" name="order_id" required />
                            </label>

                            <label>
                                Status:
                                <select name="status" required>
                                    <option value="">Select status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </label>

                            <button type="submit">
                                Create Shipment
                            </button>

                            {creatingShipment && <p>Creating shipment...</p>}
                            {creatingShipmentError && <p>{creatingShipmentError}</p>}
                        </form>
                    </section>

                    <section className="find-order">
                        <h2>Find Order</h2>

                        <label>
                            Order ID:
                            <input
                                type="text"
                                value={findOrderId}
                                onChange={(event) => setFindOrderId(event.target.value)}
                            />
                        </label>

                        <button onClick={() => findOrder(findOrderId)}>
                            Search
                        </button>

                        <section className="find-order-table">
                            {orderLoading ? (
                                <p>Loading orders...</p>
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
                                        ))}
                                    </tbody>

                                </table>
                            ) : (
                                <p>No items found.</p>
                            )}
                        </section>
                    </section>

                </section>

                <section className="delete-shipment">
                    <h2>Delete Shipment</h2>

                    <form onSubmit={handleDeleteShipmentSubmit}>
                        <label>
                            Shipment ID:
                            <input 
                                type="number"
                                value={deleteShipmentId}
                                onChange={(event) => setDeleteShipmentId(event.target.value)}
                                required
                            />
                        </label>


                        <div className="delete-shipment-row">
                            <button type="submit">
                                Delete Shipment
                            </button>
                        </div>

                        {deletingShipment && <p>Deleting shipment...</p>}
                        {deletingShipmentError && <p>{deletingShipmentError}</p>}
                    </form>
                </section>
            </>
            )}
        </div>
    );
};

export default Shipments;