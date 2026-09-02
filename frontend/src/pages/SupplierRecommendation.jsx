import { useEffect, useState } from "react";
import "./SupplierRecommendation.css";

function SupplierRecommendation() {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getRecommendation = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/supplier-recommendation/best"
      );

      if (!response.ok) {
        throw new Error("Failed to get supplier recommendation");
      }

      const data = await response.json();

      setSupplier(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendation();
  }, []);

  if (loading) {
    return <h2>Loading supplier recommendation...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div className="recommendation-page">
      <h1>Supplier Recommendation</h1>

      <p>
        AI-powered recommendation for selecting the best supplier.
      </p>

      {supplier && (
        <div className="recommendation-card">
          <div className="supplier-icon">🏆</div>

          <h2>{supplier.supplier_name}</h2>

          <p className="location">
            📍 {supplier.location}
          </p>

          <div className="score-container">

            <div className="score-box">
              <span>Reliability Score</span>
              <strong>
                {supplier.reliability_score}/10
              </strong>
            </div>

            <div className="score-box">
              <span>Delivery Time</span>
              <strong>
                {supplier.delivery_days} days
              </strong>
            </div>

            <div className="score-box">
              <span>AI Supplier Score</span>
              <strong>
                {supplier.ai_supplier_score}
              </strong>
            </div>

          </div>

          <div className="recommendation-result">
            🤖 {supplier.recommendation}
          </div>

          <button onClick={getRecommendation}>
            🔄 Refresh Recommendation
          </button>

        </div>
      )}
    </div>
  );
}

export default SupplierRecommendation;