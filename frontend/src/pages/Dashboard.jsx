import './Dashboard.css'
import { useEffect, useState } from "react";

function Dashboard() {

    const [orders, setOrders] = useState([])
    const [payments, setPayments] = useState([])
    const [shipments, setShipments] = useState([])
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/orders")
            .then(response => response.json())
            .then(data => {
                setOrders(data);
            })
        }, []);

    useEffect(() => {
        fetch("http://localhost:5000/payments")
            .then(response => response.json())
            .then(data => {
                setPayments(data)
            })
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/shipments")
            .then(response => response.json())
            .then(data => {
                setShipments(data)
            })
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/notifications")
            .then(response => response.json())
            .then(data => {
                setNotifications(data)
            })
    }, []);

    const orderCount = orders.length;
    const paymentCount = payments.length;
    const shipmentCount = shipments.length;
    const notificationCount = notifications.length;

    return (
        <div className="dashboard">
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
                            <tr>
                                <td>#1111</td>
                                <td>Paid</td>
                                <td>$89.99</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="recent-notifications">
                    <h2>Recent Notifications</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>Notification Type</th>
                                <th>Status</th>
                                <th>Sent At</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>Out For Delivery</td>
                                <td>Sent</td>
                                <td>2PM</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}

export default Dashboard