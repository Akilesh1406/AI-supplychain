# AI Supply Chain 🚚🤖

An AI-powered Supply Chain Management application built using **FastAPI**, **React**, **SQLAlchemy**, and Machine Learning concepts.

The application helps businesses manage products, inventory, suppliers, demand prediction, and AI-based supplier recommendations.

---

## 🚀 Features

### 📊 Dashboard

- View supply chain overview
- Monitor products, inventory, and suppliers
- Centralized dashboard interface

### 📦 Product Management

- View available products
- Manage product information
- Store product details in the database

### 📋 Inventory Management

- Track current stock levels
- Monitor reorder levels
- Identify low-stock products
- Manage inventory efficiently

### 📈 AI Demand Prediction

- Predict product demand
- Analyze current stock
- Generate reorder recommendations

Example output:

```json
{
  "product_id": 1,
  "product_name": "Rice",
  "current_stock": 100,
  "reorder_level": 20,
  "predicted_demand": 83.85,
  "recommendation": "PLAN TO REORDER SOON"
}
```

### 🚚 Supplier Management

- View available suppliers
- Add new suppliers
- Track supplier reliability
- Track delivery time
- Prevent duplicate suppliers

### 🤖 AI Supplier Recommendation

The system recommends the best supplier based on:

- Reliability score
- Delivery time
- AI supplier score

Example output:

```json
{
  "supplier_id": 2,
  "supplier_name": "Fast Logistics Pvt Ltd",
  "location": "Bangalore",
  "reliability_score": 8.5,
  "delivery_days": 1,
  "ai_supplier_score": 86.5,
  "recommendation": "BEST SUPPLIER"
}
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Recharts
- Lucide React
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database

- SQLite

---

## 📁 Project Structure

```text
AI-supplyChain/
│
├── backend/
│   ├── ml/
│   ├── models/
│   │   ├── product.py
│   │   └── supplier.py
│   │
│   ├── routers/
│   │   ├── ai.py
│   │   ├── dashboard.py
│   │   ├── demand.py
│   │   ├── inventory.py
│   │   ├── products.py
│   │   ├── supplier_recommendation.py
│   │   └── suppliers.py
│   │
│   ├── schemas/
│   │   ├── product.py
│   │   └── supplier.py
│   │
│   ├── services/
│   │   └── demand_service.py
│   │
│   ├── database.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── DemandPrediction.jsx
│   │   │   ├── Suppliers.jsx
│   │   │   └── SupplierRecommendation.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🎨 Start Frontend

Open a terminal from the project root and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

# ⚙️ Start Backend

Open a **new terminal** from the project root and run:

```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

## 📚 API Documentation

FastAPI provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

---

## 🔗 API Endpoints

| Feature | Endpoint |
|---|---|
| API Home | `/` |
| Dashboard | `/dashboard/` |
| Products | `/products/` |
| Inventory | `/inventory/` |
| Demand Prediction | `/demand/analyze/{product_id}` |
| Suppliers | `/suppliers/` |
| Supplier Recommendation | `/supplier-recommendation/best` |

---

## 🧠 How the AI Features Work

### Demand Prediction

The system analyzes product and inventory information to estimate future demand.

Based on the analysis, it can provide recommendations such as:

- `STOCK SUFFICIENT`
- `PLAN TO REORDER SOON`
- `REORDER IMMEDIATELY`

### Supplier Recommendation

The system evaluates suppliers using:

- Supplier reliability score
- Delivery time

An AI supplier score is calculated, and the best supplier is recommended.

---

## 🔮 Future Improvements

- Advanced machine learning demand forecasting
- Historical sales data integration
- Real-time inventory alerts
- Automated purchase order generation
- Multi-agent AI system
- Supplier performance analytics
- Advanced interactive dashboards
- User authentication
- PostgreSQL database integration
- Docker deployment
- Cloud deployment

---

## 👨‍💻 Author

**Akilesh**

GitHub: https://github.com/Akilesh1406

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!