import { useEffect, useState } from "react";
import "./Suppliers.css";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/suppliers/"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suppliers");
      }

      const data = await response.json();

      setSuppliers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading suppliers...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Suppliers</h1>
          <p>View and manage your supply chain suppliers.</p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchSuppliers}
        >
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!error && suppliers.length === 0 && (
        <div className="empty-message">
          No suppliers found.
        </div>
      )}

      {!error && suppliers.length > 0 && (
        <div className="suppliers-grid">
          {suppliers.map((supplier) => (
            <div
              className="supplier-card"
              key={supplier.id}
            >
              <div className="supplier-icon">
                🚚
              </div>

              <h2>{supplier.name}</h2>

              <p className="location">
                📍 {supplier.location}
              </p>

              <div className="supplier-details">
                <div className="detail-box">
                  <span>Reliability</span>

                  <strong>
                    {supplier.reliability_score}/10
                  </strong>
                </div>

                <div className="detail-box">
                  <span>Delivery</span>

                  <strong>
                    {supplier.delivery_days} days
                  </strong>
                </div>
              </div>

              <div className="supplier-status">
                Active Supplier
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Suppliers;