import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'

import Orders from './pages/Orders.jsx'
import Dashboard from './pages/Dashboard.jsx';
import Payments from './pages/Payments.jsx';
import Shipments from './pages/Shipments.jsx';
import Notifications from './pages/Notifications.jsx';
import Products from './pages/Products.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
            
                <div className="app-layout">
                    <Sidebar />

                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/shipments" element={<Shipments />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/products" element={<Products />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App