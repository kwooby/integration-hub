import './Sidebar.css'

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Navigation</h2>

            <nav className="sidebar-nav">
                <ul className="sidebar-list">
                    <li><a className="sidebar-links" href="dashboard">Dashboard</a></li>
                    <li><a className="sidebar-links" href="users">Users</a></li>
                    <li><a className="sidebar-links" href="orders">Orders</a></li>
                    <li><a className="sidebar-links" href="payments">Payments</a></li>
                    <li><a className="sidebar-links" href="shipments">Shipments</a></li>
                    <li><a className="sidebar-links" href="notifications">Notifications</a></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar