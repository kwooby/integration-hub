import './Shipments.css';
import { useEffect, useState } from 'react';

function Shipments() {
    const [shipments, setShipments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    fetchShipments();
    }, []);


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

                <section className="all-shipments">
                    <table>
                        <thead>
                            <tr>
                                <th>Carrier</th>
                                <th>Delivered At</th>
                                <th>Shipment ID</th>
                                <th>Order ID</th>
                                <th>Shipped At</th>
                                <th>Status</th>
                                <th>Tracking Number</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reverseShipments.length > 0 ? (
                                reverseShipments.map((shipment) => (
                                    <tr key={shipment.id}>
                                        <td>{shipment.carrier}</td>
                                        <td>{shipment.delivered_at || "Not delivered"}</td>
                                        <td>{shipment.id}</td>
                                        <td>{shipment.order_id}</td>
                                        <td>{shipment.shipped_at || "Not shipped"}</td>
                                        <td>{shipment.status}</td>
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
            </>
            )}
        </div>
    )
};

export default Shipments;