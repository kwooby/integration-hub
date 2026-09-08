import './Payments.css';
import { useEffect, useState } from 'react';

function Payments() {
    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [findOrderId, setFindOrderId] = useState("");

    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderError, setOrderError] = useState(null);

    const [findPaymentId, setFindPaymentId] = useState("");
    const [deletePaymentId, setDeletePaymentId] = useState("");

    const [payment, setPayment] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const [creatingPayment, setCreatingPayment] = useState(false);
    const [createPaymentError, setCreatePaymentError] = useState(null);

    const [updatePaymentId, setUpdatePaymentId] = useState("");
    const [updatingPayment, setUpdatingPayment] = useState(false);
    const [updatePaymentError, setUpdatePaymentError] = useState(null);

    const [deletingPayment, setDeletingPayment] = useState(false);
    const [deletePaymentError, setDeletePaymentError] = useState(null);

    const fetchPayments = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`http://localhost:5000/payments`)

            if (!response.ok) {
                throw new Error("Failed to load payments.")
            };

            const data = await response.json();

            setPayments(data);

        } catch (error) {
            console.error(error);
            setError("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
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

    const findPayment = async (id) => {
        setPaymentLoading(true);
        setPaymentError(null);
        setPayment(null);

        try {
            const response = await fetch(`http://localhost:5000/payments/${id}`);

            if (!response.ok) {
                throw new Error("Payment not found.");
            }

            const data = await response.json();

            setPayment(data);

        } catch (error) {
            console.error(error);
            setPaymentError("Unable to find payment.");
        } finally {
            setPaymentLoading(false)
        };
    };

    const handleCreateSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const paymentData = Object.fromEntries(formData);

        paymentData.amount = Number(paymentData.amount);
        paymentData.order_id = Number(paymentData.order_id);

        createPayment(paymentData);
    };

    const createPayment = async (paymentData) => {
        setCreatingPayment(true);
        setCreatePaymentError(null);

        try {
            const response = await fetch(`http://localhost:5000/payments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error)
            }

            const data = await response.json();
            
            await fetchPayments();

            return data;

        } catch (error) {
            setCreatePaymentError(error.message)
        } finally {
            setCreatingPayment(false)
        }
    };

    const handleUpdatePaymentSubmit = (event) => {
        event.preventDefault();

        const paymentFormData = new FormData(event.target);
        const paymentData = Object.fromEntries(paymentFormData);

        Object.keys(paymentData).forEach((key) => {
        
            if (paymentData[key] === "") {
                delete paymentData[key];
            }
        });

        if (paymentData.amount) {
            paymentData.amount = Number(paymentData.amount)
        };

        updatePayment(updatePaymentId, paymentData)
    }

    const updatePayment = async (id, paymentData) => {
        setUpdatingPayment(true);
        setUpdatePaymentError(null);

        try {
            const response = await fetch(`http://localhost:5000/payments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();

            await fetchPayments();

            return data;

        } catch (error) {
            setUpdatePaymentError(error.message);
        } finally {
            setUpdatingPayment(false);
        }
    };

    const handleDeletePaymentSubmit = (event) => {
        event.preventDefault();

        deletePayment(deletePaymentId)
    };

    const deletePayment = async (id) => {
        setDeletingPayment(true);
        setDeletePaymentError(null);

        try {

            const response = await fetch(`http://localhost:5000/payments/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            await fetchPayments();

            return data;

        } catch (error) {
            setDeletePaymentError(error.message);
        } finally {
            setDeletingPayment(false);
        }
    };

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
                        <section className="find-payment">
                            <h2>Find Payment</h2>
                            <p>Payment ID: </p>
                            <input 
                                type="text"
                                value={findPaymentId}
                                onChange={(event) => setFindPaymentId(event.target.value)}
                            />

                            <button onClick={() => findPayment(findPaymentId)}>
                                Search
                            </button>

                            <section className="find-payment-table">
                                {paymentLoading ? (
                                    <p>Loading payment...</p>
                                ) : paymentError ? (
                                    <p>{paymentError}</p>
                                ) : payment && (
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
                                            <tr>
                                                <td>{payment.amount}</td>
                                                <td>{payment.id}</td>
                                                <td>{payment.order_id}</td>
                                                <td>{payment.status}</td>
                                                <td>{payment.transaction_id}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </section>
                        </section>

                        <section className="all-payments-page">
                            <h2>All Payments</h2>
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
                    </section>

                    <div className="find-and-create">
                        <section className="create-payment">
                            <h2>Create Payment</h2>

                            <form onSubmit={handleCreateSubmit}>

                                <label>
                                    Amount:
                                    <input type="number" name="amount" required />
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
                                            <option value="Paid">Paid</option>
                                            <option value="Failed">Failed</option>
                                            <option value="Refunded">Refunded</option>
                                        </select>
                                </label>

                                <button type="submit">
                                    Create Payment
                                </button>
                            </form>

                            {creatingPayment && <p>Creating payment...</p>}
                            {createPaymentError && <p>{createPaymentError}</p>}
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
                    </div>

                    <section className="update-payment">
                        <h2>Update Payment</h2>

                        <form onSubmit={handleUpdatePaymentSubmit}>
                            <label>
                                Payment ID:
                                <input
                                    type="number"
                                    value={updatePaymentId}
                                    onChange={(event) => setUpdatePaymentId(event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Amount:
                                <input type="number" name="amount" />
                            </label>

                            <label>
                                Status:
                                <select name="status" >
                                    <option value="">Select status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Refunded">Refunded</option>
                                </select>
                            </label>

                            <button type="submit">
                                Update Payment
                            </button>
                        </form>

                    </section>

                    <section className="delete-payment">
                        <h2>Delete Payment</h2>

                        <form onSubmit={handleDeletePaymentSubmit}>
                            <label>
                                Payment ID:
                                <input
                                    type="number"
                                    value={deletePaymentId}
                                    onChange={(event) => setDeletePaymentId(event.target.value)}
                                    required
                                />
                            </label>

                            <button type="submit">
                                Delete Payment
                            </button>

                            {deletingPayment && <p>Deleting payment...</p>}
                            {deletePaymentError && <p>{deletePaymentError}</p>}
                        </form>
                    </section>
                </>
            )}
        </div>
    )
};

export default Payments;