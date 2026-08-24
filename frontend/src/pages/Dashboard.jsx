import './Dashboard.css'
import { useEffect, useState } from "react";

function Dashboard() {
    const [orders, setOrders] = useState([])
    const [payments, setPayments] = useState([])
    const [shipments, setShipments] = useState([])
    const [notifications, setNotifications] = useState([])
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            setError(null);

            try {
                const [
                    ordersResponse,
                    paymentsResponse,
                    shipmentsResponse,
                    notificationsResponse
                ] = await Promise.all([
                    fetch("http://localhost:5000/orders"),
                    fetch("http://localhost:5000/payments"),
                    fetch("http://localhost:5000/shipments"),
                    fetch("http://localhost:5000/notifications")
                ]);

                if (
                    !ordersResponse.ok ||
                    !paymentsResponse.ok ||
                    !shipmentsResponse.ok ||
                    !notificationsResponse.ok
                ) {
                    throw new Error("Failed to load dashboard data.");
                }

                const ordersData = await ordersResponse.json();
                const paymentsData = await paymentsResponse.json();
                const shipmentsData = await shipmentsResponse.json();
                const notificationsData = await notificationsResponse.json();

                setOrders(ordersData);
                setPayments(paymentsData);
                setShipments(shipmentsData);
                setNotifications(notificationsData);
            } catch (error) {
                console.error(error)
                setError("Unable to connect to the server.")
            } finally {
                setLoading(false)
            };
        };

        fetchDashboardData();
    }, []);

    const orderCount = orders.length;
    const paymentCount = payments.length;
    const shipmentCount = shipments.length;
    const notificationCount = notifications.length;

    const recentOrders = orders.slice(-5).reverse();
    const recentNotifications = notifications.slice(-5).reverse();

    return (
        <div className="dashboard">
            {loading ? (
                <p>Loading dashboard...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <header className="dashboard-header">
                        <h2>Dashboard</h2>
                        <p>Integration Hub Overview</p>
                    </header>

                    <div className="dashboard-sections">
                        <section className="dashboard-stats">

                            <div className="stat-card">
                                <h3>Orders</h3>
                                <p>{orderCount}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Payments</h3>
                                <p>{paymentCount}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Shipments</h3>
                                <p>{shipmentCount}</p>
                            </div>

                            <div className="stat-card">
                                <h3>Notifications</h3>
                                <p>{notificationCount}</p>
                            </div>

                        </section>

                        <section className="recent-orders">
                            <h2>Recent Orders</h2>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentOrders.length > 0 ? (
                                        recentOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.status}</td>
                                                <td>{order.total}</td>
                                            </tr>
                                    ))
                                    ) : (
                                        <tr className="no-data">
                                            <td colSpan="3">No recent orders.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </section>

                        <section className="recent-notifications">
                            <h2>Recent Notifications</h2>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Notification ID</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Sent At</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {recentNotifications.length > 0 ? (
                                    recentNotifications.map((notification) => (
                                        <tr key={notification.id}>
                                            <td>{notification.id}</td>
                                            <td>{notification.notification_type}</td>
                                            <td>{notification.status}</td>
                                            <td>{notification.sent_at ? notification.sent_at : "N/A"}</td>
                                        </tr>
                                    ))
                                    ) : (
                                        <tr className="no-data">
                                            <td colSpan="4">No recent notifications.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard