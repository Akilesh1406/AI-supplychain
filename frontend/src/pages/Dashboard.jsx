import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_products: 0,
    total_stock: 0,
    total_suppliers: 0,
    low_stock_items: 0,
    insights: {
      inventory_status: "",
      inventory_message: "",
      recommended_supplier: "",
      supply_chain_score: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Get dashboard statistics
      const dashboardResponse = await fetch(
        "http://127.0.0.1:8000/dashboard/"
      );

      // Get the same supplier recommendation
      // used by the Supplier Recommendation page
      const supplierResponse = await fetch(
        "http://127.0.0.1:8000/supplier-recommendation/best"
      );

      if (!dashboardResponse.ok) {
        throw new Error("Failed to load dashboard data");
      }

      if (!supplierResponse.ok) {
        throw new Error("Failed to load supplier recommendation");
      }

      const dashboard = await dashboardResponse.json();
      const supplier = await supplierResponse.json();

      setDashboardData({
        ...dashboard,

        insights: {
          ...dashboard.insights,

          // Use the actual supplier recommendation API
          recommended_supplier:
            supplier.supplier_name || "No supplier available",
        },
      });
    } catch (err) {
      console.error("Dashboard Error:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">

        <div>
          <h1>Supply Chain Dashboard</h1>

          <p>
            Overview of your supply chain operations.
          </p>
        </div>

        <button onClick={fetchDashboardData}>
          🔄 Refresh
        </button>

      </div>


      {/* Statistics Cards */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            📦
          </div>

          <div>
            <p>Total Products</p>

            <h2>
              {dashboardData.total_products}
            </h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            📊
          </div>

          <div>
            <p>Total Stock</p>

            <h2>
              {dashboardData.total_stock}
            </h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            🚚
          </div>

          <div>
            <p>Total Suppliers</p>

            <h2>
              {dashboardData.total_suppliers}
            </h2>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon">
            ⚠️
          </div>

          <div>
            <p>Low Stock Items</p>

            <h2>
              {dashboardData.low_stock_items}
            </h2>
          </div>
        </div>

      </div>


      {/* AI Supply Chain Insights */}
      <div className="insights-section">

        <h2>🤖 AI Supply Chain Insights</h2>

        <div className="insights-grid">

          {/* Inventory Insight */}
          <div className="insight-card">

            <div className="insight-icon">
              📦
            </div>

            <div>
              <h3>
                Inventory Status
              </h3>

              <p className="insight-value">
                {dashboardData.insights?.inventory_status}
              </p>

              <p>
                {dashboardData.insights?.inventory_message}
              </p>
            </div>

          </div>


          {/* Supplier Insight */}
          <div className="insight-card">

            <div className="insight-icon">
              🏆
            </div>

            <div>
              <h3>
                Recommended Supplier
              </h3>

              <p className="insight-value">
                {dashboardData.insights?.recommended_supplier}
              </p>

              <p>
                Based on supplier reliability and delivery performance.
              </p>
            </div>

          </div>


          {/* Supply Chain Health */}
          <div className="insight-card">

            <div className="insight-icon">
              📈
            </div>

            <div>
              <h3>
                Supply Chain Health
              </h3>

              <p className="health-score">
                {dashboardData.insights?.supply_chain_score}%
              </p>

              <p>
                Overall supply chain performance score.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;