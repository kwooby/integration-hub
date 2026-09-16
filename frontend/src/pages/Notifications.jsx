import './Notifications.css';
import { useEffect, useState } from "react";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [findOrderId, setFindOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);

    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);

    const [findNotificationId, setFindNotificationId] = useState("");
    const [deleteNotificationId, setDeleteNotificationId] = useState("");

    const [notification, setNotification] = useState(null);
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [notificationError, setNotificationError] = useState(null);

    const [creatingNotification, setCreatingNotification] = useState(false);
    const [createNotificationError, setCreateNotificationError] = useState(null);

    const [updateNotificationId, setUpdateNotificationId] = useState("");
    const [updatingNotification, setUpdatingNotification] = useState(false);
    const [updateNotificationError, setUpdateNotificationError] = useState(null);

    const [deletingNotification, setDeletingNotification] = useState(false);
    const [deleteNotificationError, setDeleteNotificationError] = useState(null);

    const fetchNotifications = async () => {
        setLoading(true)
        setError(null)

        try {
            const response= await fetch("http://localhost:5000/notifications");

            if (!response.ok) {
                throw new Error("Failed to load notifications.")
            };

            const data = await response.json()

            setNotifications(data);
        } catch (error) {
            console.error(error);
            setError("Unable to connect to server.")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const findOrder = async (id) => {
        setOrderLoading(true);
        setOrderError(null);
        setOrder(null);
        setOrderItems([]);

        try {
            const response = await fetch(`http://localhost:5000/orders/${id}`)

            if (!response.ok) {
                throw new Error("Order not found.")
            }

            const data = await response.json();

            setOrder(data.order);
            setOrderItems(data.items);

        } catch (error) {
            console.error(error);
            setOrderError("Unable to find order.")
        } finally {
            setOrderLoading(false);
        }
    }

    const findNotification = async (id) => {
        setNotificationLoading(true);
        setNotificationError(null);
        setNotification(null);

        try {
            const response = await fetch(`http://localhost:5000/notifications/${id}`);

            if (!response.ok) {
                throw new Error("Notification not found.");
            }

            const data = await response.json();

            setNotification(data);
        } catch (error) {
            console.error(error);
            setNotificationError("Unable to find notification.");
        } finally {
            setNotificationLoading(false);
        }

    }

    const handleUpdateNotificationSubmit = (event) => {
        event.preventDefault();

        const notificationFormData = new FormData(event.target);
        const notificationData = Object.fromEntries(notificationFormData);

        Object.keys(notificationData).forEach((key) => {

            if (notificationData[key] === "") {
                delete notificationData[key];
            }
        });

        updateNotification(updateNotificationId, notificationData);
    }

    const updateNotification = async (id, notificationData) => {
        setUpdatingNotification(true);
        setUpdateNotificationError(null);

        try {
            const response = await fetch(`http://localhost:5000/notifications/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(notificationData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Update notification failed.");
            }

            const data = await response.json();

            await fetchNotifications();

            return data;

        } catch (error) {
            setUpdateNotificationError(error.message);
        } finally {
            setUpdatingNotification(false);
        }
    };

    const handleCreateNotificationSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const notificationData = Object.fromEntries(formData);

        notificationData.order_id = Number(notificationData.order_id);

        createNotification(notificationData);
    }

    const createNotification = async (notificationData) => {
        setCreatingNotification(true);
        setCreateNotificationError(null);

        try {
            const response = await fetch(`http://localhost:5000/notifications`, {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(notificationData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Create notification failed.");
            };

            const data = await response.json();

            await fetchNotifications();

            return data;

        } catch (error) {
            setCreateNotificationError(error.message);
        } finally {
            setCreatingNotification(false);
        }
    };

    const handleDeleteNotificationSubmit = (event) => {
        event.preventDefault();

        deleteNotification(deleteNotificationId);
    };

    const deleteNotification = async (id) => {
        setDeletingNotification(true);
        setDeleteNotificationError(null);

        try {
            const response = await fetch(`http://localhost:5000/notifications/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Delete notification failed.");
            }

            const data = await response.json();
            await fetchNotifications();

            return data;
        } catch (error) {
            setDeleteNotificationError(error.message);
        } finally {
            setDeletingNotification(false);
        }
    };

    const reverseNotifications = [...notifications].reverse()

    return (
        <div className="notifications">
            {loading ? (
                <p>Loading notifications...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <header className="notifications-header">
                        <h2>Notifications</h2>
                    </header>

                    <section className="find-notification">
                        <h2>Find Notification</h2>

                        <label>
                            Notification ID:
                            <input 
                                type="text"
                                value={findNotificationId}
                                onChange={(event) => setFindNotificationId(event.target.value)}
                                required
                            />
                        </label>

                        <button onClick={() => findNotification(findNotificationId)}>
                            Search
                        </button>

                        <section className="find-notification-table">
                            {notificationLoading ? (
                                <p>Loading notification...</p>
                            ) : notificationError ? (
                                <p>{notificationError}</p>
                            ) : notification && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Notification ID</th>
                                            <th>Order ID</th>
                                            <th>Status</th>
                                            <th>Type</th>
                                            <th>Sent At</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{notification.id}</td>
                                            <td>{notification.order_id}</td>
                                            <td>{notification.status}</td>
                                            <td>{notification.notification_type}</td>
                                            <td>{notification.sent_at || "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </section>

                    </section>

                    <section className="all-notifications">
                        <h2>All Notifications</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Notification ID</th>
                                    <th>Order ID</th>
                                    <th>Status</th>
                                    <th>Type</th>
                                    <th>Sent At</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reverseNotifications.length > 0 ? (
                                    reverseNotifications.map((notification) => (
                                        <tr key={notification.id}>
                                            <td>{notification.id}</td>
                                            <td>{notification.order_id}</td>
                                            <td>{notification.status}</td>
                                            <td>{notification.notification_type}</td>
                                            <td>{notification.sent_at || "N/A"}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="no-data">
                                        <td colSpan="5">No notifications found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>

                    <section className="update-notification">
                        <h2>Update Notification Status</h2>

                        <form onSubmit={handleUpdateNotificationSubmit}>
                            <label>
                                Notification ID:
                                <input
                                    type="text"
                                    value={updateNotificationId}
                                    onChange={(event) => setUpdateNotificationId(event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Status
                                <select name="status">
                                    <option value="">Select status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Sent">Sent</option>
                                    <option value="Failed">Failed</option>
                                </select>
                            </label>

                            <div className="update-notification-row">
                                <button type="submit">
                                    Update
                                </button>
                            </div>

                            {updatingNotification && <p>Updating notification...</p>}
                            {updateNotificationError && <p>{updateNotificationError}</p>}
                        </form>

                    </section>

                    <section className="find-and-create">

                        <section className="create-notification">
                            <h2>Create Notification</h2>

                            <form onSubmit={handleCreateNotificationSubmit}>

                                <label>
                                    Order ID:
                                    <input type="number" name="order_id" required />
                                </label>
                                
                                <label>
                                    Status
                                    <select name="status" required>
                                        <option value="">Select status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Sent">Sent</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                </label>

                                <label>
                                    Type
                                    <select name="notification_type" required>
                                        <option value="">Select notification type</option>
                                        <option value="Order Confirmation">Order Confirmation</option>
                                        <option value="Payment Confirmation">Payment Confirmation</option>
                                        <option value="Shipment Created">Shipment Created</option>
                                        <option value="Out For Delivery">Out For Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </label>

                                <button type="submit">
                                    Create Notification
                                </button>

                                {creatingNotification && <p>Creating notification...</p>}
                                {createNotificationError && <p>{createNotificationError}</p>}
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
                                            ))}
                                        </tbody>

                                    </table>
                                ) : (
                                    <p>No items found.</p>
                                )}
                            </section>
                        </section>
                    </section>
                    
                    <section className="delete-notification">
                        <h2>Delete Notification</h2>

                        <form onSubmit={handleDeleteNotificationSubmit}>
                            <label>
                                Notification ID:
                                <input
                                    type="text"
                                    value={deleteNotificationId}
                                    onChange={(event) => setDeleteNotificationId(event.target.value)}
                                    required
                                />
                            </label>

                            <button type="submit">
                                Delete Notification
                            </button>

                            {deletingNotification && <p>Deleting notification...</p>}
                            {deleteNotificationError && <p>{deleteNotificationError}</p>}
                        </form>
                    </section>
                </>
            )}
        </div>
    )
}

export default Notifications