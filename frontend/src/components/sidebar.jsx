import './Sidebar.css';
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Navigation</h2>

            <nav className="sidebar-nav">
                <ul className="sidebar-list">
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><a href="payments">Payments</a></li>
                    <li><a href="shipments">Shipments</a></li>
                    <li><a href="notifications">Notifications</a></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar