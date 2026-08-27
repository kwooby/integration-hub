import './Notifications.css';
import { useEffect, useState } from "react";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchNotifications();
    }, []);

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

                    <section className="all-notifications">
                        <table>
                            <thead>
                                <tr>
                                    <th>Notification ID</th>
                                    <th>Notification Type</th>
                                    <th>Order ID</th>
                                    <th>Sent At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reverseNotifications.length > 0 ? (
                                    reverseNotifications.map((notification) => (
                                        <tr key={notification.id}>
                                            <td>{notification.id}</td>
                                            <td>{notification.notification_type}</td>
                                            <td>{notification.order_id}</td>
                                            <td>{notification.sent_at || "Not sent"}</td>
                                            <td>{notification.status}</td>
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
                </>
            )}
        </div>
    )
}

export default Notifications