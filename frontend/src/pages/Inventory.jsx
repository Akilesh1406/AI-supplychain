import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error loading inventory:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading inventory...</h2>;
  }

  return (
    <div className="page">
      <h1>Inventory</h1>

      <p>Monitor current stock and inventory levels.</p>

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

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
            <th>Status</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;