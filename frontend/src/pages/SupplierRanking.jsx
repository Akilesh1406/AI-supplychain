import { useEffect, useState } from "react";
import "./SupplierRanking.css";

function SupplierRanking() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRanking = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/supplier-recommendation/ranking"
      );

      if (!response.ok) {
        throw new Error("Failed to load supplier ranking");
      }

      const data = await response.json();

      console.log("Supplier Ranking:", data);

      setSuppliers(data);
    } catch (err) {
      console.error("Ranking Error:", err);
      setError(
        "Unable to load supplier ranking. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  if (loading) {
    return (
      <div className="ranking-page">
        <div className="ranking-loading">
          ⏳ Loading supplier ranking...
        </div>
      </div>
    );
  }

  return (
    <div className="ranking-page">

      {/* Header */}
      <div className="ranking-header">
        <div>
          <h1>Supplier Ranking</h1>
          <p>
            AI-ranked suppliers based on reliability and delivery performance.
          </p>
        </div>

        <button
          className="refresh-ranking-btn"
          onClick={fetchRanking}
        >
          🔄 Refresh Ranking
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="ranking-error">
          ❌ {error}
        </div>
      )}

      {/* Ranking Table */}
      {!error && suppliers.length > 0 && (
        <div className="ranking-card">

          <div className="table-wrapper">

            <table className="ranking-table">

              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Supplier</th>
                  <th>Location</th>
                  <th>Reliability</th>
                  <th>Delivery</th>
                  <th>AI Score</th>
                </tr>
              </thead>

              <tbody>

                {suppliers.map((supplier, index) => (

                  <tr key={supplier.supplier_id}>

                    <td>
                      <span className="rank-badge">
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : supplier.rank}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {supplier.supplier_name}
                      </strong>
                    </td>

                    <td>
                      📍 {supplier.location}
                    </td>

                    <td>
                      {supplier.reliability_score}/10
                    </td>

                    <td>
                      {supplier.delivery_days} days
                    </td>

                    <td>
                      <span className="ai-score">
                        {supplier.ai_supplier_score}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* No suppliers */}
      {!error && suppliers.length === 0 && (
        <div className="no-suppliers">
          No suppliers available.
        </div>
      )}

    </div>
  );
}

export default SupplierRanking;