from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

from models.product import Product
from models.supplier import Supplier
from routers import products
from routers import inventory
from routers import ai
from routers import demand
from routers import suppliers
from routers import supplier_recommendation
from routers import dashboard


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI Supply Chain API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Supply Chain API is running"
    }


app.include_router(products.router)
app.include_router(inventory.router)
app.include_router(ai.router)
app.include_router(demand.router)
app.include_router(suppliers.router)
app.include_router(supplier_recommendation.router)
app.include_router(dashboard.router)