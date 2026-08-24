import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'

import Orders from './pages/Orders.jsx'
import Dashboard from './pages/Dashboard.jsx';

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
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App