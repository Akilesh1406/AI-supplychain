import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/products/`
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div>
      <h1>Products</h1>
      <p>Manage and view all supply chain products.</p>

      <br />

      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.current_stock}</td>
                <td>{product.reorder_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Products;