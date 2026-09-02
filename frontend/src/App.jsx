import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import DemandPrediction from "./pages/DemandPrediction";
import Inventory from "./pages/Inventory";
import Products from "./pages/Products";
import SupplierRecommendation from "./pages/SupplierRecommendation";
import Suppliers from "./pages/Suppliers";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <aside className="sidebar">
          <div className="logo">
            AI SupplyChain
          </div>

          <nav>
            <NavLink to="/">
              Dashboard
            </NavLink>

            <NavLink to="/products">
              Products
            </NavLink>

            <NavLink to="/inventory">
              Inventory
            </NavLink>

            <NavLink to="/demand-prediction">
              Demand Prediction
            </NavLink>

            <NavLink to="/suppliers">
              Suppliers
            </NavLink>

            <NavLink to="/supplier-recommendation">
              Supplier Recommendation
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            <Route
              path="/demand-prediction"
              element={<DemandPrediction />}
            />

            <Route
              path="/suppliers"
              element={<Suppliers />}
            />

            <Route
              path="/supplier-recommendation"
              element={<SupplierRecommendation />}
            />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;