from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.product import Product

from services.inventory_service import (
    get_inventory_status,
    get_inventory_recommendation
)


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory AI"]
)


# Analyze inventory manually
@router.get("/analyze")
def analyze_inventory(
    current_stock: int,
    reorder_level: int
):

    status = get_inventory_status(
        current_stock,
        reorder_level
    )

    recommendation = get_inventory_recommendation(
        current_stock,
        reorder_level
    )

    return {
        "current_stock": current_stock,
        "reorder_level": reorder_level,
        "status": status,
        "recommendation": recommendation
    }


# Get inventory status for all products
@router.get("/")
def get_all_inventory(
    db: Session = Depends(get_db)
):

    products = db.query(Product).all()

    inventory_data = []

    for product in products:

        status = get_inventory_status(
            product.current_stock,
            product.reorder_level
        )

        recommendation = get_inventory_recommendation(
            product.current_stock,
            product.reorder_level
        )

        inventory_data.append({
            "product_id": product.id,
            "product_name": product.name,
            "current_stock": product.current_stock,
            "reorder_level": product.reorder_level,
            "status": status,
            "recommendation": recommendation
        })

    return inventory_data


# Get inventory details for one product
@router.get("/{product_id}")
def get_product_inventory(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    status = get_inventory_status(
        product.current_stock,
        product.reorder_level
    )

    recommendation = get_inventory_recommendation(
        product.current_stock,
        product.reorder_level
    )

    return {
        "product_id": product.id,
        "product_name": product.name,
        "current_stock": product.current_stock,
        "reorder_level": product.reorder_level,
        "status": status,
        "recommendation": recommendation
    }