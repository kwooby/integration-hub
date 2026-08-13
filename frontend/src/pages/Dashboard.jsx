import './Dashboard.css'

function Dashboard() {
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
                        <p>124</p>
                    </div>

                    <div className="stat-card">
                        <h3>Payments</h3>
                        <p>110</p>
                    </div>

                    <div className="stat-card">
                        <h3>Shipments</h3>
                        <p>97</p>
                    </div>

                    <div className="stat-card">
                        <h3>Notifications</h3>
                        <p>154</p>
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