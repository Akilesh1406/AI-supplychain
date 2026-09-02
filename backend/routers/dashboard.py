from fastapi import APIRouter
from database import SessionLocal
from models.product import Product
from models.supplier import Supplier

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard():

    db = SessionLocal()

    try:
        products = db.query(Product).all()
        suppliers = db.query(Supplier).all()

        total_products = len(products)

        low_stock_products = [
            product
            for product in products
            if product.current_stock <= product.reorder_level
        ]

        total_stock = sum(
            product.current_stock
            for product in products
        )

        best_supplier = None

        if suppliers:
            best_supplier = max(
                suppliers,
                key=lambda supplier: supplier.reliability_score
            )

        return {
            "total_products": total_products,
            "low_stock_count": len(low_stock_products),
            "total_stock": total_stock,
            "low_stock_products": [
                {
                    "id": product.id,
                    "name": product.name,
                    "current_stock": product.current_stock,
                    "reorder_level": product.reorder_level
                }
                for product in low_stock_products
            ],
            "total_suppliers": len(suppliers),
            "best_supplier": (
                {
                    "id": best_supplier.id,
                    "name": best_supplier.name,
                    "reliability_score": best_supplier.reliability_score,
                    "delivery_days": best_supplier.delivery_days
                }
                if best_supplier
                else None
            )
        }

    finally:
        db.close()