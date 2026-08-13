import './Sidebar.css'

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Navigation</h2>

            <nav className="sidebar-nav">
                <ul className="sidebar-list">
                    <li>Dashboard</li>
                    <li>Users</li>
                    <li>Orders</li>
                    <li>Payments</li>
                    <li>Shipments</li>
                    <li>Notifications</li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar