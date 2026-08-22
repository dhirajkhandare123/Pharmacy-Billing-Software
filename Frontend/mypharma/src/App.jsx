import React from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Medicines from "./pages/Medicines";
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import NewPurchases from './pages/NewPurchases';
import PurchaseList from "./pages/PurchaseList";
import PurchaseDetails from "./pages/PurchaseDetails";
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Reports from './pages/Reports';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/purchases/new" element={<NewPurchases />} />
            <Route
              path="/purchases"
              element={<PurchaseList />}
            />

            <Route
              path="/purchases/:id"
              element={<PurchaseDetails />}
            />

            <Route path='/inventory' element={<Inventory/>}/>

            <Route path='/sales' element={<Sales/>}/>

            <Route path='/reports' element={<Reports/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App