import { useEffect, useState } from "react";
import "./DemandPrediction.css";

function DemandPrediction() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(`${API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);

        if (data.length > 0) {
          setSelectedProduct(data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });
  }, []);

  const predictDemand = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(
        `${API_URL}/demand/analyze/${selectedProduct}`
      );

      if (!response.ok) {
        throw new Error("Failed to predict demand");
      }

      const data = await response.json();

      setPrediction(data);
    } catch (error) {
      console.error(error);

      setPrediction({
        error: "Failed to get demand prediction. Make sure the backend is running."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demand-page">
      <div className="demand-header">
        <h1>Demand Prediction</h1>
        <p>AI-powered demand forecasting and inventory recommendations.</p>
      </div>

      <div className="prediction-container">
        <div className="prediction-controls">
          <label>Select Product</label>

          <div className="control-row">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <button onClick={predictDemand} disabled={loading}>
              {loading ? "Predicting..." : "Predict Demand"}
            </button>
          </div>
        </div>

        {prediction && !prediction.error && (
          <div className="prediction-result">
            <h2>Prediction Result</h2>

            <div className="result-grid">
              <div className="result-card">
                <span>Product</span>
                <strong>{prediction.product_name}</strong>
              </div>

              <div className="result-card">
                <span>Current Stock</span>
                <strong>{prediction.current_stock}</strong>
              </div>

              <div className="result-card">
                <span>Reorder Level</span>
                <strong>{prediction.reorder_level}</strong>
              </div>

              <div className="result-card highlight">
                <span>Predicted Demand</span>
                <strong>{prediction.predicted_demand}</strong>
              </div>
            </div>

            <div className="recommendation">
              <span>AI Recommendation</span>
              <strong>{prediction.recommendation}</strong>
            </div>
          </div>
        )}

        {prediction?.error && (
          <div className="error-message">
            {prediction.error}
          </div>
        )}
      </div>
    </div>
  );
}

export default DemandPrediction;