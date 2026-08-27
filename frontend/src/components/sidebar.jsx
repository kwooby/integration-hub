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
                    <li><Link to="payments">Payments</Link></li>
                    <li><Link to="shipments">Shipments</Link></li>
                    <li><Link to="notifications">Notifications</Link></li>
                    <li><Link to="products">Products</Link></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar