import { useEffect, useState } from "react";
import "./SupplierRecommendation.css";

function SupplierRecommendation() {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getRecommendation = async () => {
    const controller = new AbortController();

    try {
      setLoading(true);
      setError("");

      // Stop the request if it takes more than 10 seconds
      const timeout = setTimeout(() => {
        controller.abort();
      }, 10000);

      const response = await fetch(
        "http://127.0.0.1:8000/supplier-recommendation/best",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(
          `Failed to get supplier recommendation (${response.status})`
        );
      }

      const data = await response.json();

      console.log("Supplier API Response:", data);

      if (data.message) {
        setSupplier(null);
        setError(data.message);
        return;
      }

      setSupplier(data);

    } catch (err) {
      console.error("Recommendation Error:", err);

      if (err.name === "AbortError") {
        setError("Request timed out. Please check the backend.");
      } else {
        setError(err.message);
      }

      setSupplier(null);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getRecommendation();
  }, []);


  return (
    <div className="recommendation-page">

      <h1>Supplier Recommendation</h1>

      <p>
        AI-powered recommendation for selecting the best supplier.
      </p>


      {loading && (
        <div className="loading">
          ⏳ Loading supplier recommendation...
        </div>
      )}


      {error && !loading && (
        <div className="error-message">
          ❌ {error}

          <br />

          <button onClick={getRecommendation}>
            Try Again
          </button>
        </div>
      )}


      {supplier && !loading && !error && (
        <div className="recommendation-card">

          <div className="supplier-icon">
            🏆
          </div>

          <h2>
            {supplier.supplier_name}
          </h2>

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


          <button
            onClick={getRecommendation}
            disabled={loading}
          >
            🔄 Refresh Recommendation
          </button>

        </div>
      )}

    </div>
  );
}

export default SupplierRecommendation;