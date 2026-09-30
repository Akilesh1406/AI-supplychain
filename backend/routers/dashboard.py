from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.product import Product
from models.supplier import Supplier

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard_data(db: Session = Depends(get_db)):

    # Get all products and suppliers
    products = db.query(Product).all()
    suppliers = db.query(Supplier).all()

    # =========================
    # BASIC DASHBOARD DATA
    # =========================

    total_products = len(products)

    total_stock = sum(
        product.current_stock
        for product in products
    )

    total_suppliers = len(suppliers)

    # =========================
    # LOW STOCK ANALYSIS
    # =========================

    low_stock_products = [
        product
        for product in products
        if product.current_stock <= product.reorder_level
    ]

    low_stock_items = len(low_stock_products)

    # =========================
    # INVENTORY STATUS
    # =========================

    if total_products == 0:
        inventory_status = "No Data"
        inventory_message = "Add products to analyze inventory."

    elif low_stock_items == 0:
        inventory_status = "Healthy"
        inventory_message = (
            "All products are currently above their reorder levels."
        )

    elif low_stock_items < total_products:
        inventory_status = "Needs Attention"
        inventory_message = (
            f"{low_stock_items} product(s) are below or at the reorder level."
        )

    else:
        inventory_status = "Critical"
        inventory_message = (
            "All products require inventory attention."
        )

    # =========================
    # SUPPLY CHAIN HEALTH SCORE
    # =========================

    if total_products == 0:
        supply_chain_score = 0

    else:
        inventory_health = (
            (total_products - low_stock_items)
            / total_products
        ) * 100

        # Supplier availability contributes to overall health
        supplier_health = 100 if total_suppliers > 0 else 0

        supply_chain_score = round(
            (inventory_health * 0.7)
            + (supplier_health * 0.3),
            2
        )

    # =========================
    # RETURN DASHBOARD DATA
    # =========================

    return {
        "total_products": total_products,
        "total_stock": total_stock,
        "total_suppliers": total_suppliers,
        "low_stock_items": low_stock_items,

        "insights": {
            "inventory_status": inventory_status,
            "inventory_message": inventory_message,
            "recommended_supplier": (
                "Available suppliers"
                if total_suppliers > 0
                else "No supplier available"
            ),
            "supply_chain_score": supply_chain_score
        }
    }