import './Payments.css';
import { useEffect, useState } from 'react';

function Payments() {
    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch("http://localhost:5000/payments")

                if (!response.ok) {
                    throw new Error("Failed to load payments.")
                };

                const data = await response.json();

                setPayments(data);

            } catch (error) {
                console.error(error);
                setError("Unable to connect to server.")
            } finally {
                setLoading(false)
            }
        };
    
    fetchPayments();
    }, []);

    const reversePayments = [...payments].reverse()

    return (
        <div className="payments">
            {loading ? (
                <p>Loading payments...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <header className="payments-header">
                        <h2>Payments</h2>
                    </header>

                    <section className="all-payments">
                        <table>
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Payment ID</th>
                                    <th>Order ID</th>
                                    <th>Status</th>
                                    <th>Transaction ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reversePayments.length > 0 ? (
                                    reversePayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td>{payment.amount}</td>
                                            <td>{payment.id}</td>
                                            <td>{payment.order_id}</td>
                                            <td>{payment.status}</td>
                                            <td>{payment.transaction_id}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="no-data">
                                        <td colSpan="4">No payments found.</td>
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

export default Payments;