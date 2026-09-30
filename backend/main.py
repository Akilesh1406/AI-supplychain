from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

# Import models before creating database tables
from models.product import Product
from models.supplier import Supplier

# Import routers
from routers import products
from routers import inventory
from routers import ai
from routers import demand
from routers import suppliers
from routers import supplier_recommendation
from routers import dashboard


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="AI Supply Chain API",
    version="1.0.0"
)


# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home route
@app.get("/")
def home():
    return {
        "message": "AI Supply Chain API is running"
    }


# Include application routers
app.include_router(products.router)
app.include_router(inventory.router)
app.include_router(ai.router)
app.include_router(demand.router)
app.include_router(suppliers.router)
app.include_router(supplier_recommendation.router)
app.include_router(dashboard.router)