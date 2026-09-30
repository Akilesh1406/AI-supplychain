import axios from "axios";
import { useEffect, useState } from "react";
import "./Inventory.css";

const API_URL = "http://127.0.0.1:8000";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  // Load products
  useEffect(() => {
    axios
      .get(`${API_URL}/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error loading inventory:", error);
        setError("Failed to load inventory.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Analyze inventory using FastAPI
  const analyzeProduct = async (product) => {
    try {
      setSelectedProduct(product);
      setAnalysis(null);
      setAnalyzing(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/inventory/analyze`,
        {
          params: {
            current_stock: product.current_stock,
            reorder_level: product.reorder_level,
          },
        }
      );

      setAnalysis(response.data);
    } catch (error) {
      console.error("Error analyzing inventory:", error);
      setError("Failed to analyze inventory.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <h2>Loading inventory...</h2>;
  }

  return (
    <div className="page">
      <h1>Inventory</h1>

      <p>
        Monitor current stock and AI-powered inventory recommendations.
      </p>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Inventory Summary */}
      <div className="inventory-summary">

        <div className="inventory-card">
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div className="inventory-card">
          <h3>Total Stock</h3>

          <h2>
            {products.reduce(
              (total, product) =>
                total + product.current_stock,
              0
            )}
          </h2>
        </div>

        <div className="inventory-card">
          <h3>Low Stock Items</h3>

          <h2>
            {
              products.filter(
                (product) =>
                  product.current_stock <=
                  product.reorder_level
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Inventory Table */}
      <div className="table-container">

        <table className="data-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>AI Analysis</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {

              const isLowStock =
                product.current_stock <=
                product.reorder_level;

              return (
                <tr key={product.id}>

                  <td>{product.id}</td>

                  <td>{product.name}</td>

                  <td>{product.current_stock}</td>

                  <td>{product.reorder_level}</td>

                  <td>
                    <span
                      className={
                        isLowStock
                          ? "low-stock"
                          : "in-stock"
                      }
                    >
                      {isLowStock
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="analyze-btn"
                      onClick={() =>
                        analyzeProduct(product)
                      }
                    >
                      🤖 Analyze
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>

      </div>

      {/* AI Analysis Result */}
      {selectedProduct && (
        <div className="ai-analysis-section">

          <h2>🤖 AI Inventory Analysis</h2>

          {analyzing && (
            <p className="analyzing-text">
              Analyzing inventory...
            </p>
          )}

          {analysis && (
            <div className="analysis-card">

              <h3>
                Product: {selectedProduct.name}
              </h3>

              <div className="analysis-details">

                <div>
                  <span>Current Stock</span>
                  <strong>
                    {analysis.current_stock}
                  </strong>
                </div>

                <div>
                  <span>Reorder Level</span>
                  <strong>
                    {analysis.reorder_level}
                  </strong>
                </div>

                <div>
                  <span>Status</span>

                  <strong
                    className={
                      analysis.status === "LOW_STOCK"
                        ? "status-low"
                        : "status-good"
                    }
                  >
                    {analysis.status}
                  </strong>
                </div>

              </div>

              <div className="recommendation-box">

                <h3>
                  💡 AI Recommendation
                </h3>

                <p>
                  {analysis.recommendation}
                </p>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Inventory;